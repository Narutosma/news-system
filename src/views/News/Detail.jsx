import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Descriptions, PageHeader } from 'antd';
import { getNewsItem, updateNews } from '../../api';
import { HeartTwoTone } from '@ant-design/icons';
import moment from 'moment';
export default function Detail() {
    const [newsDetail, setNewsDetail] = useState({});
    const params = useParams();
    // 简单设置了一下， 在第一次阅读的时候在本地保存数据，如果在点进来如果本地存有这块数据则不做处理
    const seen = JSON.parse(localStorage.getItem(params.id));
    useEffect(() => {
        getNewsItem(params.id).then(res => {
            setNewsDetail(res);
            // 访客数尽量搞的简单一点， 每次进来就加一
            if(!seen){
                localStorage.setItem(params.id, JSON.stringify({
                    view: true,
                    star: false
                }))

                setNewsDetail({
                    ...res,
                    view: res.view + 1
                });
                updateNews({
                    id: params.id,
                    view: res.view + 1
                })
            }
        })
    }, []);

    const starHandle = () => {
        if(seen && !seen.star){
            localStorage.setItem(params.id, JSON.stringify({
                view: true,
                star: true
            }))
            setNewsDetail({
                ...newsDetail,
                star: newsDetail.star + 1
            })
            updateNews({
                id: params.id,
                star: newsDetail.star + 1
            })
        }
    }

    return (
        <div>
            <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={newsDetail.title}
            subTitle={(
                <>
                {newsDetail.category?.title}
                <HeartTwoTone 
                    style={{marginLeft: 10, cursor: 'pointer'}} 
                    twoToneColor="#eb2f96"
                    onClick={() => starHandle()} />
                </>
            )}
        >
            <Descriptions size="small" column={3}>
                <Descriptions.Item label="创建者">{newsDetail.author}</Descriptions.Item>
                <Descriptions.Item label="创建时间">{moment(newsDetail.createTime).format('YYYY/MM/DD HH:mm:ss')}</Descriptions.Item>
                <Descriptions.Item label="发布时间">{newsDetail.publishState?moment(newsDetail.publishState).format('YYYY/MM/DD HH:mm:ss'):'-'}</Descriptions.Item>
                <Descriptions.Item label="访问数量">{newsDetail.view}</Descriptions.Item>
                <Descriptions.Item label="点赞数量">{newsDetail.star}</Descriptions.Item>
                <Descriptions.Item label="评论数量">0</Descriptions.Item>
            </Descriptions>
        </PageHeader>
        <div style={{
            border: '1px solid #ccc',
            padding: '8px',
            borderRadius: '4px'
        }}
             dangerouslySetInnerHTML={{
            __html: newsDetail.content
        }}></div>
        </div>
    )
}
