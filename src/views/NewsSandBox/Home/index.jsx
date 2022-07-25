import React, { useState, useEffect, useRef } from 'react';
import { Card, Col, Row, List, Avatar, Button, Drawer } from 'antd';
import { EditOutlined, EllipsisOutlined, PieChartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getOrderNews, getPulishedNews } from '../../../api';
import * as echarts from 'echarts';
import _ from 'lodash';
const { Meta } = Card;

export default function Home() {
  const [viewData, setViewData] = useState([]);
  const [starData, setStarData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [pieData, setPieData] = useState(null);
  const [visible, setVisible] = useState(false);
  const barRef = useRef(null);
  const pieRef = useRef(null);
  const { username, region, role: { roleName } } = JSON.parse(localStorage.getItem('token'));
  const navigate = useNavigate();
  useEffect(() => {
    getOrderNews('view').then(res => setViewData(res));
    getOrderNews('star').then(res => setStarData(res));
  }, [])
  useEffect(() => {
    // 获取到发布新闻的列表数据
    getPulishedNews().then(res => {
      const list = _.groupBy(res, item => item.category.title);
      // 绘制图表
      renderBarView(list);

      setAllData(res);

      return () => {
        window.onresize = null;
      }
    })
  }, []);
  const renderBarView = (list) => {
    var myChart = echarts.init(barRef.current);
    myChart.setOption({
      title: {
        text: '新闻分类图示'
      },
      tooltip: {},
      xAxis: {
        data: Object.keys(list),
        axisLabel: {
          rotate: '45',
          interval: 0
        }
      },
      yAxis: {
        minInterval: 1
      },
      series: [
        {
          name: '',
          type: 'bar',
          data: Object.values(list).map(item => item.length)
        }
      ]
    });

    window.onresize = () => {
      myChart.resize();
    }
  }

  const renderPieView = () => {
    const data = _.groupBy(allData.filter(item => item.author === username), item => item.category.title);
    const list = [];
    for (const key in data) {
      list.push({
        name: key,
        value: data[key].length
      })
    }
    let myChart;
    if(!pieData){
      myChart = echarts.init(pieRef.current);
      setPieData(myChart);
    }else{
      myChart = pieData;
    }
    var option = {
      title: {
        text: '当前用户新闻分类图示',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: list,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    myChart.setOption(option);
  }
  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="用户最常浏览">
            <List
              size="small"
              dataSource={viewData}
              renderItem={item => (<List.Item>
                <Button type='link' onClick={() => navigate(`/news-manage/preview/${item.id}`)}>{item.title}</Button>
              </List.Item>)}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="用户点赞最多">
            <List
              size="small"
              dataSource={starData}
              renderItem={item => (<List.Item>
                <Button type='link' onClick={() => navigate(`/news-manage/preview/${item.id}`)}>{item.title}</Button>
              </List.Item>)}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            hoverable
            actions={[
              <PieChartOutlined key="setting" onClick={() => {
                setVisible(true);
                setTimeout(() => {
                  renderPieView();
                }, 0)
              }
              } />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
            cover={<img alt="example" src="https://cdn.pixabay.com/photo/2016/08/05/15/24/team-1572483_1280.jpg" />}
          >
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={username}
              description={(
                <>
                  <b style={{ marginRight: 10 }}>{region === '' ? '全国' : region}</b>
                  {roleName}
                </>
              )}
            />
          </Card>
        </Col>
      </Row>
      <Drawer
        title="个人新闻分类"
        width={500}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        <div ref={pieRef} style={{ width: '100%', height: 400 }}></div>
      </Drawer>
      <div ref={barRef} style={{ width: '100%', height: 400 }}></div>
    </div>
  )
}
