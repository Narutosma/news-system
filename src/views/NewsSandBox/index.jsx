// css
import './index.scss';

import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
// components
import Home from './Home'
import Category from './newsManage/Category'
import Draft from './newsManage/Draft'
import RightList from './rightManage/RightList'
import RoleList from './rightManage/RoleList'
import ManageList from './userManage/ManageList'
import MissPage from './MissPage'
import SideMenu from '../../components/SideMenu';
import TopHeader from '../../components/TopHeader'
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
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/user-manage/list" element={<ManageList/>}/>
            <Route path="/right-manage/role/list" element={<RoleList/>}/>
            <Route path="/right-manage/right/list" element={<RightList/>}/>
            <Route path="/news-manage/draft" element={<Draft/>}/>
            <Route path="/news-manage/category" element={<Category/>}/>
            <Route path="/" element={<Navigate  to="/home" replace/>}/>
            <Route path="*" element={<MissPage />}/>
        </Routes>
        </Content>
        </Layout>
    </Layout>
  )
}