import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Tree } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { getRoleList, deleteRole, getMenuSide, updateRole } from '../../../api';
const { confirm } = Modal;

export default function RoleList() {
  const [dataSource, setDataSource] = useState([]);
  // 弹框显示变量
  const [modalVisible, setModalVisible] = useState(false);
  // 树形数据
  const [treeData, setTreeData] = useState([]);
  // 树状结构选择数据
  const [rigthsList, setRightList] = useState([]);
  // 当前id
  const [currentId, setCurrentId] = useState(0);
  useEffect(() => {
    // 获取角色列表数据
    getRoleList().then(res => setDataSource(res));

    // 获取权限数据
    getMenuSide().then(res => setTreeData(res));
  }, []);
  // 弹框
  const confirmMethod = (data) => {
    confirm({
      title: '是否要删除该用户?',
      icon: <ExclamationCircleOutlined />,
      okText: "确定",
      cancelText: "取消",
      onOk() {
        // 删除用户
        deleteRoleMethod(data);
      },
    });
  }
  // 删除用户方法
  const deleteRoleMethod = (data) => {
    const list = dataSource.filter(item => item.id !== data.id);
    setDataSource(list);
    deleteRole(data);
  }

  // 点击弹框确定按钮
  const handleOk = () => {
    const list = dataSource.map(item => {
      if (item.id === currentId) {
        return {
          ...item,
          rigths: rigthsList
        }
      }
      return item;
    })
    setDataSource(list);
    setModalVisible(false);
    updateRole(currentId, rigthsList);
  }

  // 点击弹框取消按钮
  const handleCancel = () => {
    setModalVisible(false);
  }

  // 树行数据的复选框选择
  const checkHandle = (data) => {
    setRightList(data);
  }

  // 
  const editHandle = (data) => {
    setModalVisible(true);
    setRightList(data.rights);
    setCurrentId(data.id)
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '操作',
      render: (data) => (
        <>
          <Button shape="circle"
            style={{ marginRight: 10 }}
            onClick={() => { editHandle(data) }}
            icon={<EditOutlined />} />
          <Button shape="circle"
            danger
            icon={<DeleteOutlined />}
            onClick={() => { confirmMethod(data) }} />
          <Modal title="权限分配"
            visible={modalVisible}
            onOk={() => { handleOk(data) }}
            onCancel={handleCancel}>
            <Tree
              checkable
              checkedKeys={rigthsList}
              onCheck={(data) => checkHandle(data)}
              treeData={treeData}
            // checkStrictly={true}
            />
          </Modal>
        </>
      )
    }
  ];
  return (
    <Table columns={columns}
      dataSource={dataSource}
      rowKey={(item) => item.id}
      pagination={{
        position: ['none', 'bottomRight'],
        pageSize: 5
      }} />
  )
}
