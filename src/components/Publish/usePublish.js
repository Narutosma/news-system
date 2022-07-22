import { useState, useEffect } from 'react';
import { notification, Modal } from 'antd';
import { getPulishNews, updateNews, deleteDraftNews } from '../../api';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

export default function usePublish(state) {
    const [dataSource, setDataSource] = useState([]);
    const { username } = JSON.parse(localStorage.getItem('token'));

    // 下线
    const publishedHandle = (id) => {
        updateNews({
            id,
            publishState: 3,
        }).then(() => {
            setDataSource(dataSource.filter(item => item.id !== id));
            notification.info({
                message: `通知`,
                description: `新闻下线成功`,
                placement: 'bottomRight'
            });
        })
    }

    const sunsetHandle = (id) => {
        confirm({
            title: '是否要删除该项?',
            icon: <ExclamationCircleOutlined />,
            okText: "确定",
            cancelText: "取消",
            onOk() {
                deleteDraftNews({
                    id
                }).then(() => {
                    setDataSource(dataSource.filter(item => item.id !== id));
                    notification.info({
                        message: `通知`,
                        description: `新闻删除成功`,
                        placement: 'bottomRight'
                    });
                });
            },
          });
        
    }

    // 发布
    const unpublishedHandle = (id) => {
        updateNews({
            id,
            publishState: 2,
            publishTime: Date.now()
        }).then(() => {
            setDataSource(dataSource.filter(item => item.id !== id));
            notification.info({
                message: `通知`,
                description: `发布新闻成功`,
                placement: 'bottomRight'
            });
        })
    }
    useEffect(() => {
        getPulishNews({
            author: username,
            publishState: state
        }).then(res => setDataSource(res))
    }, [username, state]);
    return {
        dataSource,
        publishedHandle,
        sunsetHandle,
        unpublishedHandle
    }
}
