import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Modal, message } from 'antd';
import { DeleteOutlined, EditOutlined, VerticalAlignTopOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { getDraftNews, deleteDraftNews, updateNews } from '../../../api';
const { confirm } = Modal;

export default function Draft() {
  const [dataSource, setDataSource] = useState([]);
  const navigator = useNavigate();
  useEffect(() => {
    const { username } = JSON.parse(localStorage.getItem('token'));
    getDraftNews(username).then(res => {
      setDataSource(res);
    })
  });

  // 删除草稿箱中的新闻数据
  const deleteDraftHandle = id => {
    confirm({
      title: '是否要删除该项?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteDraftNews(id).then(() => message.success('删除成功'));
        setDataSource([...dataSource.filter(item => item.id !== id)]);
      },
    });
  }

  // 修改操作
  const updateNewsInfo = (id) => {
    navigator(`/news-manage/update/${id}`);
  }

  // 提交至审核列表
  const toAydutList = (id) => {
    confirm({
      title: '是否要提交至审核列表?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        updateNews({ id, auditState: 1 }).then(() => message.success('提交成功'));
        navigator('/audit-manage/list');
      },
    });
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '新闻标题',
      dataIndex: 'title',
      render(title, item) {
        return <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            navigator(`/news-manage/preview/${item.id}`);
          }}>{title}</span>
      }
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '新闻分类',
      dataIndex: 'category',
      render(data) {
        return data.title;
      }
    },
    {
      title: '操作',
      render: (data) => (
        <>
          <Button shape="circle"
            style={{ marginRight: 10 }}
            icon={<EditOutlined />}
            onClick={() => updateNewsInfo(data.id)} />
          <Button shape="circle"
            style={{ marginRight: 10 }}
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteDraftHandle(data.id)} />
          <Button shape="circle"
            type="primary"
            icon={<VerticalAlignTopOutlined />}
            onClick={() => toAydutList(data.id)} />
        </>
      )
    }
  ];
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
