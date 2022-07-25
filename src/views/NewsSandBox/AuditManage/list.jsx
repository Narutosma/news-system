import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Tag, Button, notification } from 'antd';
import { getAuditNews, updateNews } from '../../../api';
import { auditMap, colorMap } from '../../../utils/datas';

export default function List() {
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const { username } = JSON.parse(localStorage.getItem('token'));
    getAuditNews(username).then(res => {
      setDataSource(res);
    })
  }, []);

  const handleClick = (value, item) => {
    if (value === '修改') {
      navigate(`/news-manage/update/${item.id}`);
      return ;
    }
    let text = '';
    if (value === '撤回') {
      text = '草稿箱';
      updateNews({
        id: item.id,
        auditState: 0
      });
      setDataSource([...dataSource.filter(data => data.id !== item.id)]);
    }

    if (value === '发布') {
      text = '发布列表';
      updateNews({
        id: item.id,
        publishState: 2
      });
      navigate('/publish-manage/published');
    }
    notification.info({
      message: `通知`,
      description: `你可以到${text}中查看你的新闻`,
      placement: 'bottomRight'
    });
    
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
      title: '审核状态',
      dataIndex: 'auditState',
      render(state) {
        return <Tag color={colorMap[state]}>{auditMap[state]}</Tag>
      }
    },
    {
      title: '操作',
      dataIndex: 'auditState',
      render(state, item) {
        const publicMap = ['', '撤回', '发布', '修改'];
        const typeMap = ['', '', 'primary', 'danger'];
        return <Button type={typeMap[state]} onClick={() => handleClick(publicMap[state], item)}>{publicMap[state]}</Button>
      }
    }]
  return (
    <Table columns={columns}
      dataSource={dataSource}
      rowKey={item => item.id}
      pagination={{
        position: ['none', 'bottomRight'],
        pageSize: 5
      }} />
  )
}
