import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { Spin } from 'antd';
// components
import Home from '../Home'
import Add from '../NewsManage/Add'
import Category from '../NewsManage/Category'
import Draft from '../NewsManage/Draft'
import RightList from '../RightManage/RightList'
import RoleList from '../RightManage/RoleList'
import ManageList from '../UserManage/ManageList'
import MissPage from '../MissPage'
import Unpublished from '../PublishManage/Unpublished';
import Published from '../PublishManage/Published';
import Sunset from '../PublishManage/Sunset';
import Audit from '../AuditManage/Audit';
import List from '../AuditManage/list';
import Preview from '../Preview';
import Update from '../Update';
import { useSelector } from 'react-redux';

import { getRights, getChildren } from '../../../api';

export default function Routers() {
    const [allRouter, setAllRouter] = useState([]);
    const routerMap = {
        '/home': <Home/>,
        '/user-manage/list': <ManageList/>,
        '/right-manage/role/list': <RoleList/>,
        '/right-manage/right/list': <RightList/>,
        '/news-manage/add': <Add/>,
        '/news-manage/draft': <Draft/>,
        '/news-manage/category': <Category/>,
        '/news-manage/preview/:id': <Preview/>,
        '/news-manage/update/:id': <Update/>,
        '/publish-manage/unpublished': <Unpublished/>,
        '/publish-manage/published': <Published/>,
        '/publish-manage/sunset': <Sunset/>,
        '/audit-manage/list': <List/>,
        '/audit-manage/audit': <Audit/>
    }
    const { role: {rights} } = JSON.parse(localStorage.getItem('token'));
    const loadding = useSelector(state => state.loadding.value);
    useEffect(() => {
        Promise.all([getRights(), getChildren()]).then(res => {
            setAllRouter([
                ...res[0],
                ...res[1]
            ]);
        })
    }, []);

    // 切换
    const checkRoute = (item) => {
        return routerMap[item.key] && (item.pagepermisson || item.routepermisson);
    }
    // 权限
    const checkUserPermsson = (item) => {
        return rights.includes(item.key);
    }
    return (
        <Spin size="large" spinning={loadding}>
        <Routes>
            {
                allRouter.map(item => {
                    if(checkRoute(item) && checkUserPermsson(item)){
                        return  <Route path={item.key} element={routerMap[item.key]} key={item.key} exact/>
                    }
                    return null;
                })
            }
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="*" element={<MissPage />} />
        </Routes>
        </Spin>
    )
}
