import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils.js'
import {Redirect} from 'react-router-dom'
import { Layout } from 'antd';
import Header from '../../components/header'
import LeftNav from '../../components/left-nav'

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
        const { Footer, Sider, Content } = Layout;
        return (
            <Layout style={{height:'100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header/>
                    <Content style={{backgroundColor:'#fff'}}>Content</Content>
                    <Footer style={{textAlign:'center'}}>Footer</Footer>
                </Layout>
            </Layout>
        );
    }
}
export default Admin;