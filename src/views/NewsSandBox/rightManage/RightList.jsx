import React, { useState, useEffect } from 'react'
import { Table, Tag, Button, Modal, Switch } from 'antd'
import { getMenuSide, deleteMenuItem, patchMenuItem } from '@/api';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

export default function RightList() {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    getMenuSide().then(res => {
        const list = res.map(item => {
          if (item.children.length < 1) {
            item.children = null;
          }
          return item;
        })
        setDataSource(list)
      })
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '权限名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      key: 'key',
      render: (tag) => (
        <>
          <Tag color="blue" key={tag}>
            {tag}
          </Tag>
        </>
      )
    },
    {
      title: '操作',
      render: (data) => (
        <>
          <Switch checkedChildren="开启"
            unCheckedChildren="关闭"
            style={{ marginRight: 10 }}
            disabled={data.pagepermisson === undefined}
            checked={data.pagepermisson}
            onChange={() => { switchChange(data) }} />
          <Button shape="circle"
            danger
            icon={<DeleteOutlined />}
            onClick={() => { confirmMethods(data) }} />
        </>
      )
    }
  ];
  // 删除权限项
  const deleteMethod = (data) => {
    if (data.grade === 1) {
      setDataSource(dataSource.filter(item => item.id !== data.id));
    } else {
      const list = dataSource.filter(item => item.id === data.rightId);
      list[0].children = list[0].children.filter(item => item.id !== data.id);
      setDataSource([...dataSource]);
    }
    deleteMenuItem(data);
  }
  // 弹框
  const confirmMethods = (data) => {
    confirm({
      title: '是否要删除该项?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteMethod(data);
      },
    });
  }

  // 权限切换
  const switchChange = (data) => {
    data.pagepermisson = data.pagepermisson === 0 ? 1 : 0;
    setDataSource([...dataSource])
    patchMenuItem(data);
  }
  return (
    <Table columns={columns}
      dataSource={dataSource}
      pagination={{
        position: ['none', 'bottomRight'],
        pageSize: 5
      }} />
  )
}
