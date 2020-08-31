import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import './login.less'
import Logo from './images/logo.png'
import { Form, Input, Button,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils.js'
import storageUtils from '../../utils/storageUtils.js'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    onFinish =async values => {
        //提交登录ajax请求 
        const {username,password}=values
        const response=await reqLogin(username,password);
        //console.log("成功:",response)
        const result=response.data;
        if(result.status===0){
            message.success('登录成功')
            //存储user到内存中
            memoryUtils.user=result.data
            storageUtils.saveUser(result.data)
            //跳转
            this.props.history.replace('/')
        }else{
            message.error(result.msg)
        }
    };
    
    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    render() {
        const user=memoryUtils.user
        if(user&&user._id){
            return <Redirect to='/'/>
        }
        return (
            <div className="login">
                <header className="login-header">
                    <img src={Logo} alt="" />
                    <h1>React Admin</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                { required: true,whitespace:true, message: 'Please input your Username!' },
                                { min: 4, message: '用户名至少4位!' },
                                { max: 12, message: '用户最多12位!' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文数字和下划线组成!' }
                            ]}
                        >
                            <Input 
                                prefix={<UserOutlined className="site-form-item-icon" />} 
                                placeholder="Username" 
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录</Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        );
    }
}
export default Login;