import {
    UserOutlined,
    HomeOutlined,
    CrownOutlined
} from '@ant-design/icons';
import style from './index.module.scss';
import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { getMenuSide } from '../../api'
const { Sider } = Layout;

/**
 * 菜单栏
 */
export default function SideMenu() {
    const [collapsed] = useState(false);
    // 菜单数据
    const [menus, setMenus] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      // icon映射表
      const iconMap = {
        '/home': <HomeOutlined />,
        '/user-manage': <UserOutlined />,
        '/user-manage/list': <UserOutlined />,
        '/right-manage': <CrownOutlined />,
        '/right-manage/role/list': <CrownOutlined />,
        '/right-manage/right/list': <CrownOutlined />
      }

      // 登陆用户
      const { role: {rights} } = JSON.parse(localStorage.getItem('token'));
      // 递归设置menu属性
      function deepMenu(menus){
        if(!Array.isArray(menus)){
          return null;
        }
        // 过滤掉不需要展示在页面上的数据
        return menus.filter(item => {
          return item.pagepermisson === 1 && rights.includes(item.key);
        }).map(item => {
          // 把数据映射成需要的格式
          let children;
          if(item.children && item.children.length < 1){
            children = null;
          }else{
            children = deepMenu(item.children);
          }
          return {
            id: item.id,
            key: item.key,
            pagepermisson: item.pagepermisson,
            label: item.title,
            icon: iconMap[item.key],
            children
          }
        })
      }
      // 获取menu数据
      getMenuSide().then(res => {
        const menu = deepMenu(res);
        setMenus(menu);
      });
    }, []);
    
    // 被选中时切换路由
    const jumpRouter = ({key}) => {
        navigate(key);
    }

    // 获取当前路由
    const pathname = [location.pathname];
    const firstPath = ['/' + location.pathname.split('/')[1]];
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div style={{display: 'flex', height: '100%', flexDirection: "column"}}>
            <div className={style.logo}>
                新闻管理平台
            </div>
            <div style={{overflow: 'auto'}}>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={pathname}
                defaultOpenKeys={firstPath}
                items={menus}
                onSelect={jumpRouter}
            />
            </div>
            </div>
        </Sider>
    )
}
