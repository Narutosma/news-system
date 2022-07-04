import {
    UserOutlined,
    HomeOutlined,
    CrownOutlined
} from '@ant-design/icons';
import style from './index.module.scss';
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;

export default function SideMenu() {
    const [collapsed] = useState(false);
    const navigate = useNavigate();
    // Menu栏
    const items = [
        {
            key: "/home",
            label: "首页",
            icon: <HomeOutlined />,
          },
          {
            key: "/user-manage",
            label: "用户管理",
            icon: <UserOutlined />,
            children: [
              {
                key: "/user-manage/list",
                label: "用户列表",
                icon: <UserOutlined />,
              },
            ],
          },
          {
            key: "/right-manage",
            label: "权限管理",
            icon: <CrownOutlined />,
            children: [
              {
                key: "/right-manage/role/list",
                label: "角色列表",
                icon: <CrownOutlined />,
              },
              {
                key: "/right-manage/right/list",
                label: "权限列表",
                icon: <CrownOutlined />,
              },
            ],
          }
        ];
    
    // 被选中时切换路由
    const jumpRouter = ({key}) => {
        navigate(key);
    }
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className={style.logo}>
                新闻管理平台
            </div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['/home']}
                items={items}
                onSelect={jumpRouter}
            />
        </Sider>
    )
}
