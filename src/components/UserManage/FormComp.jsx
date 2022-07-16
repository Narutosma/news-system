import React, { forwardRef, useState, useEffect } from 'react'
import { Input, Form, Select } from 'antd';
const { Option } = Select;
const FormComp = forwardRef((props, ref) => {
    const [isDisable, setIsDisable] = useState(false);

    useEffect(() => {
        setIsDisable(props.updateIsDisable);
    }, [props.updateIsDisable])
    // 角色切换时触发的事件
    const rolesChange = (value) => {
        // 当角色为超级管理员时，区域自动变为全球且不可切换
        if (value === 1) {
            setIsDisable(true);
            ref.current.setFieldsValue({
                region: ''
            })
        } else {
            setIsDisable(false);
        }
    }
    return (
        <Form
            layout="vertical"
            ref={ref}
        >
            <Form.Item
                name="username"
                label="用户名"
                rules={[
                    {
                        required: true,
                        message: '请输入用户名!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="密码"
                rules={[
                    {
                        required: true,
                        message: '请输入密码!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="region"
                label="区域"
                rules={
                    isDisable ? [] : [
                        {
                            required: [],
                            message: '请选择区域!',
                        },
                    ]}
            >
                <Select disabled={isDisable}>
                    {props.regionList.map(item => <Option value={item.value} key={item.id}>{item.title}</Option>)}
                </Select>
            </Form.Item>
            <Form.Item
                name="roleId"
                label="角色"
                rules={[
                    {
                        required: true,
                        message: '请输入角色!',
                    },
                ]}
            >
                <Select onChange={(value) => rolesChange(value)}>
                    {props.roleList.map(item => <Option value={item.roleType} key={item.id}>{item.roleName}</Option>)}
                </Select>
            </Form.Item>
        </Form>
    )
})

export default FormComp;