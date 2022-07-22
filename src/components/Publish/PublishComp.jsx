import React from 'react';
import { Table } from 'antd';


export default function PublishComp(props) {
  const columns = [
    {
      title: '新闻标题',
      dataIndex: 'title',
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '新闻分类',
      dataIndex: 'category',
      render(category){
        return category.title;
      }
    },
    {
      title: '操作',
      render(item){
        return props.button(item.id)
      }
    },]
  return (
    <Table columns={columns}
      dataSource={props.dataSource}
      rowKey={(item) => item.id}
      pagination={{
        position: ['none', 'bottomRight'],
        pageSize: 5
      }} />
  )
}
