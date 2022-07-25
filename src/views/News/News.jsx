import React, { useState, useEffect } from 'react';
import { PageHeader, Card, Col, Row, List, Typography } from 'antd';
import _ from 'lodash';
import { getPulishedNews } from '../../api';
import { useNavigate } from 'react-router-dom';
const { Link } = Typography;

export default function News() {
    const [newsData, setNewsData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getPulishedNews().then(res => {
            const list = _.groupBy(res, item => item.category.title);
            setNewsData(Object.entries(list));
        })
    }, []);
    return (
        <>
            <PageHeader
                title="全球新闻"
                subTitle="查看新闻"
            />
            <div className="site-card-wrapper" style={{ width: '97%', margin: '0 auto' }}>
                <Row gutter={[16, 16]}>
                    {
                        newsData.map(item => (
                            <Col span={8} key={item[0]}>
                                <Card title={item[0]}>
                                    <List
                                        dataSource={item[1]}
                                        pagination={{
                                            pageSize: 3
                                        }}
                                        renderItem={item => (
                                            <List.Item>
                                                <Link onClick={() => navigate(`/news/detail/${item.id}`)}>
                                                    {item.title}
                                                </Link>
                                            </List.Item>
                                        )}
                                    />
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </div>
        </>
    )
}
