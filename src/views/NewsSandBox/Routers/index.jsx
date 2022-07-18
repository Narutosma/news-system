import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
// components
import Home from '../Home'
import Category from '../NewsManage/Category'
import Draft from '../NewsManage/Draft'
import RightList from '../RightManage/RightList'
import RoleList from '../RightManage/RoleList'
import ManageList from '../UserManage/ManageList'
import MissPage from '../MissPage'
import Unpublished from '../PublishManage/Unpublished';
import Published from '../PublishManage/Published';
import Sunset from '../PublishManage/Sunset';

import { getRights, getChildren } from '../../../api';

export default function Routers() {
    const [allRouter, setAllRouter] = useState([]);
    const routerMap = {
        '/home': <Home/>,
        '/user-manage/list': <ManageList/>,
        '/right-manage/role/list': <RoleList/>,
        '/right-manage/right/list': <RightList/>,
        '/news-manage/draft': <Draft/>,
        '/news-manage/category': <Category/>,
        '/publish-manage/unpublished': <Unpublished/>,
        '/publish-manage/published': <Published/>,
        '/publish-manage/sunset': <Sunset/>
    }
    const { role: {rights} } = JSON.parse(localStorage.getItem('token'));
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
        return routerMap[item.key] && item.pagepermisson;
    }
    // 权限
    const checkUserPermsson = (item) => {
        return rights.includes(item.key);
    }
    return (
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
    )
}
