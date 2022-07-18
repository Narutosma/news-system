import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined
} from '@ant-design/icons';
import React, { useState } from 'react'
import { Layout, Dropdown, Menu, Space, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import style from './index.module.scss';
const { Header } = Layout;
export default function TopHeader() {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const collapsedHadnle = () => {
        setCollapsed(!collapsed);
    }
    // 获取登陆数据
    const {username, role: {roleName}} = JSON.parse(localStorage.getItem('token'));
    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: roleName,
                },
                {
                    key: '2',
                    danger: true,
                    label: '退出登录',
                    onClick: () => {
                        // 退出登陆: 清除token
                        localStorage.removeItem('token');
                        // 返回到登陆页
                        navigate('/login', {replace: true});
                    }
                },
            ]}
        />
    );
    return (
        <Header className="site-layout-background"
            style={
                {
                    padding: '0 24px',
                }
            }>
            {
                collapsed ?
                    <MenuUnfoldOutlined 
                        className={style.iconStyle} 
                        onClick={collapsedHadnle}/> :
                    <MenuFoldOutlined 
                        className={style.iconStyle}
                        onClick={collapsedHadnle}/>
            }
            <Dropdown 
                overlay={menu}>
                <Space  className={style.spaceStyle}>
                    欢迎{username}回来
                    <Avatar size="default" icon={<UserOutlined />} />
                </Space>
            </Dropdown>
        </Header>
    )
}
