import React from 'react';
import './index.scss';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '@/api';
export default function Login() {
  const navigate = useNavigate();
  const onFinish = (values) => {
    loginUser(values).then(res => {
      const user = res[0];
      if(user){
        localStorage.setItem('token', JSON.stringify(user));
        navigate('/');
      }else{
        message.error('账号或者密码错误!!!');
      }
    })
  };
  return (
    <div className='login-container'>
      <div className='login-form'>
        <div className='login-title'>全球新闻后台管理系统</div>
        <Form
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入你的账号!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入你的密码!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登陆
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
