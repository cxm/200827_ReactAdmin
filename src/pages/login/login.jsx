import React, { Component } from 'react'
import './login.less'
import Logo from './images/logo.png'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    onFinish = values => {
        console.log('Success:', values);
      };
    
    onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
    };
    render() {
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