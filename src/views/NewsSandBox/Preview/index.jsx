import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Descriptions, PageHeader, Tag } from 'antd';
import { getNewsItem } from '../../../api';
import moment from 'moment';
import { auditMap, publishMap, colorMap } from '../../../utils/datas'

export default function Preview() {
    const [newsDetail, setNewsDetail] = useState({});
    const params = useParams();
    useEffect(() => {
        getNewsItem(params.id).then(res => {
            setNewsDetail(res);
        })
    }, [params]);
    return (
        <div>
            <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={newsDetail.title}
            subTitle={newsDetail.category?.title}
        >
            <Descriptions size="small" column={3}>
                <Descriptions.Item label="创建者">{newsDetail.author}</Descriptions.Item>
                <Descriptions.Item label="创建时间">{moment(newsDetail.createTime).format('YYYY/MM/DD HH:mm:ss')}</Descriptions.Item>
                <Descriptions.Item label="发布时间">{newsDetail.publishState?moment(newsDetail.publishState).format('YYYY/MM/DD HH:mm:ss'):'-'}</Descriptions.Item>
                <Descriptions.Item label="区域">{newsDetail.region}</Descriptions.Item>
                <Descriptions.Item label="审核状态"><Tag color={colorMap[newsDetail.auditState]}>{auditMap[newsDetail.auditState]}</Tag></Descriptions.Item>
                <Descriptions.Item label="发布状态">{publishMap[newsDetail.publishState]}</Descriptions.Item>
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
