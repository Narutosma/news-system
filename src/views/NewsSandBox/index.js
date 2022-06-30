import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './Home'
import Category from './newsManage/Category'
import Draft from './newsManage/Draft'
import RightList from './rightManage/RightList'
import RoleList from './rightManage/RoleList'
import ManageList from './userManage/ManageList'
import MissPage from './MissPage'

export default function NewsSandBox() {
  return (
    <div>
        {/* 侧边栏 */}
        <div>daohanglan</div>
        {/* 导航栏 */}
        {/* 路由子页面 */}
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/user-manage/list" element={<ManageList/>}/>
            <Route path="/right-manage/role/list" element={<RoleList/>}/>
            <Route path="/right-manage/right/list" element={<RightList/>}/>
            <Route path="/news-manage/draft" element={<Draft/>}/>
            <Route path="/news-manage/category" element={<Category/>}/>
            <Route path="/"  element={<Navigate  to="/home" replace/>}/>
            <Route path="*"  element={<MissPage />}/>
        </Routes>
    </div>
  )
}
