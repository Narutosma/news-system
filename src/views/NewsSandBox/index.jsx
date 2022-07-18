// css
import './index.scss';

import React from 'react'
import SideMenu from '../../components/SideMenu';
import TopHeader from '../../components/TopHeader'
import Routers from './Routers'
// antd
import { Layout } from 'antd'
const { Content } = Layout;

export default function NewsSandBox() {
  return (
    <Layout>
        {/* 侧边栏 */}
        <SideMenu />
        <Layout className="site-layout">
          {/* 导航栏 */}
        <TopHeader />
        {/* 路由子页面 */}
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            overflow: 'auto'
          }}
        >
            {<Routers />}
        </Content>
        </Layout>
    </Layout>
  )
}