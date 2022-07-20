import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader, Steps, Button, Form, Input, Select, message, notification } from 'antd';
import style from './index.module.scss';
import SandDraft from './SandDraft';
import { getCategories, addNews, getNewsItem, updateNews } from '../../api';
import { useNavigate } from 'react-router-dom';
const { Step } = Steps;
const { Option } = Select;


export default function EditorDraft({editor}) {
    const [currentStep, setCurrentStep] = useState(0);
    const [categorieOption, setCategoriesOption] = useState([]);
    const [formInfo, setFormInfo] = useState({});
    const [content, setContent] = useState('');
    const formRef = useRef(null);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('token'));
    useEffect(() => {
        getCategories().then(res => {
            setCategoriesOption(res);
        })
    }, []);
    // 编辑
    const params = useParams();
    useEffect(() => {
        if(!editor){
            return;
        }
        getNewsItem(params.id).then(({title, categoryId, content}) => {
            // 数据回传到表单内
            formRef.current.setFieldsValue({
                title: title,
                categories: categoryId
            });
            // 内容传到富文本框
            setContent(content);
        })
    }, [editor, params]);
    const handleNext = (direction) => {
        if (direction === 'next') {
            // 下一步
            // 表单验证通过后才能进入下一步
            if(currentStep === 0){
                formRef.current.validateFields().then(res => {
                    setFormInfo(res);
                    setCurrentStep(currentStep + 1);
                }).catch(error => {
                    console.log(error);
                })
            }else{
                if(content.trim() === "" || content.trim() === "<p></p>"){
                    message.error('内容不能为空');
                }else{
                    setCurrentStep(currentStep + 1);
                }
            }
        }

        if (direction === 'prev') {
            // 上一步
            setCurrentStep(currentStep - 1);
        }
    }

    // 新增
    const addNewsItem = state => {
        addNews({
            title: formInfo.title,
            categoryId: formInfo.categories,
            content,
            region: user.region === "" ? '全国' : user.region,
            author: user.username,
            roleId: user.roleId,
            auditState: state,
            publishState: 0,
            createTime: new Date().getTime(),
            star: 0,
            view: 0,
            publishTime: 0
        });
    }
    // 修改
    const updateNewsItem = (state) => {
        updateNews({
            id: params.id,
            title: formInfo.title,
            categoryId: formInfo.categories,
            content,
            auditState: state,
        });
    }

    const submitHandle = state => {
        // state 状态： 0 为草稿箱， 1 为审核
        if(editor){
            // 编辑
            updateNewsItem(state);
        }else{
            // 新增
            addNewsItem(state);
        }
        if(state === 0){
            navigate('/news-manage/draft');
        }else{
            navigate('/audit-manage/list');
        }
        notification.info({
            message: `通知`,
            description: `你可以到${state === 0?'草稿箱':'审核列表'}中查看你的新闻`,
            placement: 'bottomRight'
        });
    }
    return (
        <div>
            <PageHeader
                onBack={editor ? () => window.history.back() : null}
                className="site-page-header"
                title={editor?"修改新闻":"撰写新闻"}
                subTitle="撒,来细数你的罪恶吧"
            />
            <Steps current={currentStep}>
                <Step title="基本信息" description="标题、分类." />
                <Step title="新闻内容" description="主题内容." />
                <Step title="新闻提交" description="保存为草稿或直接提交审核." />
            </Steps>
            <div className={currentStep === 0 ? '' : style.active}>
                <Form
                    name="basic"
                    ref={formRef}
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                >
                    <Form.Item
                        label="新闻标题"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your title!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="新闻分类"
                        name="categories"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your categories!',
                            },
                        ]}
                    >
                        <Select>
                            {
                                categorieOption.map(item => <Option value={item.id} key={item.value}>{item.title}</Option>)
                            }
                        </Select>
                    </Form.Item>
                </Form>
            </div>
            <div className={currentStep === 1 ? "" : style.active}>
                <SandDraft onHandle={value => setContent(value)} content={content}/>
            </div>
            <div>
                {
                    currentStep < 2 && <Button onClick={() => handleNext('next')}>下一步</Button>
                }
                {
                    currentStep > 0 && <Button onClick={() => handleNext('prev')}>上一步</Button>
                }
                {
                    currentStep === 2 && <Button onClick={() => submitHandle(1)}>提交审核</Button>
                }
                {
                    currentStep === 2 && <Button onClick={() => submitHandle(0)}>移至草稿箱</Button>
                }
            </div>
        </div>
    )
}
