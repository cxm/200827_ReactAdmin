import React, { Component } from 'react';
import {Link,withRouter} from "react-router-dom"
import './index.less'
import Logo from '../../assets/images/logo.png'
import {Menu} from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu;

class LeftNav extends Component {
    state = {
        collapsed: false,
    };
    getMenuNodes=(menuList)=>{
        return menuList.map((item)=>{
            if(!item.children){
                return(
                    <Menu.Item key={item.key} icon={<MailOutlined />}>
                        <Link to={item.key}>
                            {item.title}
                        </Link>
                    </Menu.Item>
                )
            }else{
                return(
                    <SubMenu key={item.key} icon={<MailOutlined />} title={item.title}>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        });
    }
    render() {
        const path=this.props.location.pathname

        return (
            <div className="left-nav">
                <header className="left-nav-header">
                    <img src={Logo} alt=""/>
                    <h1>React Admin</h1>
                </header>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    selectedKeys={path}
                >
                    {/* <Menu.Item key="1" icon={<PieChartOutlined />}>
                        <Link to="/home">首页</Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
                        <Menu.Item key="5">
                            <Link to="/category">品类管理</Link>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Link to="/product">商品管理</Link>
                        </Menu.Item>
                    </SubMenu> */}
                    {this.getMenuNodes(menuList)}
                </Menu>
            </div>
        );
    }
}

export default withRouter(LeftNav);