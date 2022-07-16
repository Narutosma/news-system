import React, { useState, useEffect, useRef } from 'react'
import { Table, Switch, Button, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { getUser, getRegion, getRoleList, addUser, deleteUser } from '@/api';
import FormComp from '@/components/UserManage/FormComp';

const { confirm } = Modal;

export default function ManageList() {
  const [dataSource, setDataSource] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [regionList, setRegionList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const addForm = useRef(null);
  useEffect(() => {
    // 获取用户列表
    getUser().then(res => setDataSource(res));
    // 获取区域列表
    getRegion().then(res => setRegionList(res));
    // 获取角色列表
    getRoleList().then(res => setRoleList(res));
  }, []);

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

  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
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
            checked={roleState} />
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
            icon={<EditOutlined />} />
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
    </>
  )
}
