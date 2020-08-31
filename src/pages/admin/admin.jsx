import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils.js'
import {Redirect} from 'react-router-dom'
import { Layout } from 'antd';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const user=memoryUtils.user
        console.log('user:',user)
        if(!user._id){
            return <Redirect to='/login'/>
        }
        const { Header, Footer, Sider, Content } = Layout;
        return (
            <Layout>
                <Header>Header</Header>
                <Layout>
                    <Sider>Sider</Sider>
                    <Content>Content</Content>
                </Layout>
                <Footer>Footer</Footer>
            </Layout>
        );
    }
}
export default Admin;