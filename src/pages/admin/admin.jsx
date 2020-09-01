import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils.js'
import {Redirect,Switch,Route} from 'react-router-dom'
import { Layout } from 'antd';
import Header from '../../components/header'
import LeftNav from '../../components/left-nav'
import Home from '../../pages/home/home'
import Category from '../../pages/category/category'
import Product from '../../pages/product/product'
import Role from '../../pages/role/role'
import User from '../../pages/user/user'
import Bar from '../../pages/charts/bar'
import Line from '../../pages/charts/line'
import Pie from '../../pages/charts/pie'

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const user=memoryUtils.user
        //console.log('user:',user)
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
                    <Content style={{margin:'20px',backgroundColor:'#fff'}}>
                        <Switch>
                            <Route path="/category" component={Category}></Route>
                            <Route path="/product" component={Product}></Route>
                            <Route path="/home" component={Home}></Route>
                            <Route path="/role" component={Role}></Route>
                            <Route path="/user" component={User}></Route>
                            <Route path="/charts/bar" component={Bar}></Route>
                            <Route path="/charts/line" component={Line}></Route>
                            <Route path="/charts/pie" component={Pie}></Route>
                            <Redirect to="/home"></Redirect>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center'}}>推荐使用谷歌浏览器，可以获得更佳体验</Footer>
                </Layout>
            </Layout>
        );
    }
}
export default Admin;