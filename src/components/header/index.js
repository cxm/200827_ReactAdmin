import React, { Component } from 'react';
import './index.less'
import memoryUtils from '../../utils/memoryUtils.js'
import storageUtils from '../../utils/storageUtils.js'
import {formateDate} from '../../utils/dateUtils.js'
import {reqWeather} from '../../api/index.js'
import {Modal} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import {withRouter} from 'react-router-dom'
import menuList from '../../config/menuConfig.js'
class Header extends Component {
    state={
        currentTime:formateDate(Date.now()),
    }
    componentDidMount(){
        this.getWeather();
        this.intervalId=setInterval(() => {
            let currentTime=formateDate(Date.now())
            this.setState({currentTime})
        }, 1000);
    }
    componentWillUnmount(){
        clearInterval(this.intervalId)
    }
    logout=()=>{
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: '确认删除吗？',
            okText: '确认',
            cancelText: '取消',
            onOk:()=>{
                storageUtils.removeUser()
                memoryUtils.user={}
                this.props.history.replace('/login')
            },
          });
    }
    getWeather=async()=>{
        const {dayPictureUrl,weather}=await reqWeather('太原')
        this.setState({dayPictureUrl,weather})
    }
    getTitle=()=>{
        const path=this.props.location.pathname
        let title=''
        menuList.forEach((item)=>{
            if(!item.children&&item.key===path){
                title=item.title
            }else if(item.children){
                const cItems=item.children
                cItems.forEach((cItem)=>{
                    if(cItem.key===path){
                        title=cItem.title
                    }
                })
            }
        })
        return title
    }
    render() {
        const username=memoryUtils.user.username
        const {currentTime,dayPictureUrl,weather}=this.state
        const title=this.getTitle()
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{username}</span>
                    <a href="javascript:" onClick={this.logout}>退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        {title}
                    </div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt='weather'/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);
