import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, notification } from 'antd';
import { getAuditNewsList, updateNews } from '../../../api';

export default function Audit() {
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();
  const { username, region, role: {roleType} } = JSON.parse(localStorage.getItem('token'));
  useEffect(() => {
    getAuditNewsList().then(res => {
      const roleMap = {
        '1': 'superAdmin',
        '2': 'admin',
        '3': 'editor'
    }
      if(roleMap[roleType] === 'superAdmin'){
        setDataSource(res)
      }else{
        // 如果不是就只展示当前区域的数据
        setDataSource([
          ...res.filter(item => item.author === username),
          ...res.filter(item => item.region === region && roleMap[item.roleId] === 'editor')
        ])
      }
    })
  }, [username, region, roleType]);

  // 操作
  const checkHandle = (item, auditState, publishState) => {
    setDataSource([...dataSource.filter(data => item.id !== data.id)]);
    updateNews({
      id: item.id,
      auditState,
      publishState
    }).then(res => {
      notification.info({
        message: `通知`,
        description: `审核完成`,
        placement: 'bottomRight'
      });
    })
  }
  const columns = [
    {
      title: '新闻标题',
      dataIndex: 'title',
      render(title, item) {
        return <Button type="link"
          onClick={() => {
            navigate(`/news-manage/preview/${item.id}`);
          }}>{title}</Button>
      }
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '新闻分类',
      dataIndex: 'category',
      render(category) {
        return category.title;
      }
    },
    {
      title: '操作',
      render(item) {
        return (
          <>
          <Button type='primary' onClick={() => checkHandle(item, 2, 1)}>通过</Button>
          <Button danger onClick={() => checkHandle(item, 3, 0)}>驳回</Button>
          </>
        )
      }
    }]
  return (
    <Table dataSource={dataSource}
      columns={columns}
      rowKey={item => item.id}
      pagination={{
        position: ['none', 'bottomRight'],
        pageSize: 5
      }} />
  )
}
