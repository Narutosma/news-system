import React, { useState, useEffect } from 'react'
import { Table, Tag, Button } from 'antd'
import axios from 'axios'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export default function RightList() {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/rights?_embed=children')
      .then(res => {
        const list = res.data.map(item => {
          if(item.children.length < 1){
            item.children = null;
          }
          return item;
        })
        setDataSource(list)
      })
  },[])

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
      dataIndex: 'id',
      render: (tag) => (
         <>
            <Button shape="circle" 
                    danger 
                    icon={<DeleteOutlined />}
                    style={{marginRight: 10}} />
            <Button shape="circle" type="primary" icon={<EditOutlined />} />
          </>
      )
    }
  ];
  return (
    <Table columns={columns}
           dataSource={dataSource} 
           pagination={{
            position: ['none', 'bottomRight'],
            pageSize: 5
           }}/>
  )
}
