import React, { useState, useEffect, useRef } from 'react'
import { Table, Switch, Button, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { getUser, getRegion, getRoleList, addUser, deleteUser, updateUser } from '@/api';
import FormComp from '@/components/UserManage/FormComp';

const { confirm } = Modal;

export default function ManageList() {
  const [dataSource, setDataSource] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [updateIsDisable, setUpdateIsDisable] = useState(false);
  const [regionList, setRegionList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [updateId, setUpdateId] = useState(0);
  const addForm = useRef(null);
  const updateForm = useRef(null);

  const { username, region, role: {roleType} } = JSON.parse(localStorage.getItem('token'));
  
  useEffect(() => {
    const roleMap = {
      '1': 'superAdmin',
      '2': 'admin',
      '3': 'editor'
  }
    // 获取用户列表
    getUser().then(res => {
      // console.log(res);
      // 如果是超级管理员的话就展示全部
      if(roleMap[roleType] === 'superAdmin'){
        setDataSource(res)
      }else{
        // 如果不是就只展示当前区域的数据
        setDataSource([
          ...res.filter(item => item.username === username),
          ...res.filter(item => item.region === region && roleMap[item.roleId] === 'editor')
        ])
      }
    });
    // 获取区域列表
    getRegion().then(res => setRegionList(res));
    // 获取角色列表
    getRoleList().then(res => setRoleList(res));
  }, [username, region, roleType]);

  // 添加用户
  const addUserMethods = () => {
    addForm.current.validateFields()
      .then(async values => {
        // 关闭弹窗
        setAddModal(false);
        // 表单数据清空
        addForm.current.resetFields();
        // 新增角色数据请求
        const user = await addUser({
          ...values,
          default: false,
          roleState: true
        });
        setDataSource([...dataSource, {
          ...user,
          role: roleList.filter(item => item.id === user.roleId)[0]
        }]);
      }).catch(error => {
        console.log('error:' + error);
      })
  }

  // 删除用户
  const deleteUserMethod = (data) => {
    confirm({
      title: '是否要删除该项?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const list = dataSource.filter(item => item.id !== data.id);
        setDataSource([...list]);
        deleteUser(data);
      },
    });
  }

  // 打开更新框
  const updateHandle = (data) => {
    setUpdateModal(true);
    if (data.roleId === 1) {
      setUpdateIsDisable(true);
    } else {
      setUpdateIsDisable(false);
    }
    // 因为 react 中状态更新不是同步的，所以会导致弹框还没挂载就调用setFieldsValue会报错
    setTimeout(() => {
      updateForm.current.setFieldsValue(data);
      setUpdateId(data.id);
    }, 0);
  }

  // 更新用户数据
  const updateUserMethods = async () => {
    const user = await updateForm.current.validateFields();
    const list = dataSource.map(item => {
      if (item.id === updateId) {
        return {
          ...item,
          ...user,
          role: roleList.filter(item => item.id === user.roleId)[0]
        }
      }
      return item;
    })
    setDataSource(list);
    // 发送网络请求
    await updateUser({
      id: updateId,
      ...user
    });
    setUpdateModal(false);
  }

  // 状态切换
  const changeHandle = (data) => {
    data.roleState = !data.roleState;
    setDataSource([...dataSource]);
    updateUser({
      id: data.id,
      roleState: data.roleState
    });
  }

  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      filters: [
        {
          text: '全球',
          value: ''
        },
        ...regionList.map(item => {
          return {
            text: item.title,
            value: item.value
          }
        })
      ],
      onFilter: (value, record) =>  value === record.region,
      render: (region) => (
        <b>{region === '' ? '全国' : region}</b>
      )
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render: (role) => (
        <div>{role.roleName}</div>
      )
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render: (roleState, item) => (
        <>
          <Switch checkedChildren="开启"
            unCheckedChildren="关闭"
            disabled={item.default}
            checked={roleState}
            onChange={() => changeHandle(item)} />
        </>
      )
    },
    {
      title: '操作',
      render: (data) => (
        <>
          <Button shape="circle"
            style={{ marginRight: 10 }}
            disabled={data.default}
            icon={<EditOutlined />}
            onClick={() => updateHandle(data)} />
          <Button shape="circle"
            danger
            disabled={data.default}
            icon={<DeleteOutlined />}
            onClick={() => deleteUserMethod(data)} />
        </>
      )
    }
  ];
  return (
    <>
      <Button type='primary'
        style={{ marginBottom: 10 }}
        onClick={() => setAddModal(true)}
      >添加用户</Button>
      <Table columns={columns}
        dataSource={dataSource}
        rowKey={item => item.id}
        pagination={{
          position: ['none', 'bottomRight'],
          pageSize: 5
        }} />
      <Modal
        visible={addModal}
        title="添加用户"
        okText="添加"
        cancelText="取消"
        onCancel={() => setAddModal(false)}
        onOk={() => addUserMethods()}
      >
        <FormComp
          regionList={regionList}
          roleList={roleList}
          ref={addForm} />
      </Modal>
      <Modal
        visible={updateModal}
        title="更新用户"
        okText="更新"
        cancelText="取消"
        onCancel={() => {
          setUpdateModal(false);
        }}
        onOk={() => updateUserMethods()}
      >
        <FormComp
          regionList={regionList}
          roleList={roleList}
          updateIsDisable={updateIsDisable}
          isUpdate={true}
          ref={updateForm} />
      </Modal>
    </>
  )
}
