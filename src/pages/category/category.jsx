import React, { Component } from 'react'
import { Card,Table, Button,Space,message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {reqGetCategorys,reqAddCategory,reqUpdateCategory} from '../../api/index.js'

export class Category extends Component {
  state={
    categorys:[],
    subCategorys:[],
    dataSource:[],
    columns:[],
    parentId:'0'
  }
  getColumns=()=>{
    const columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        dataIndex: '',
        key: '',
        width:'200px',
        render:(text,record)=>(
          <Space size="middle">
            <a>修改分类</a>
            <a href='javascript:' onClick={()=>{this.getSubCategorys(record._id)}}>查看子分类</a>
        </Space>
        )
      },
    ];
    return columns
  }
  componentWillMount(){
    let columns=this.getColumns()
    this.setState({
      columns
    })
  }
  componentDidMount(){
    this.getCategorys()
    console.log('didmount');
  }
  getCategorys=async()=>{
    const response=await reqGetCategorys(this.state.parentId)
    const result=response.data
    if(result.status===0){
      const categorys=result.data;
      this.setState({
        dataSource:categorys
      })
    }else{
      message.error(result.msg)
    }
  }
  getSubCategorys=(parentId)=>{
    
  }
    render() {
        const title="一级列表"
        const extra=(
          <Button type="primary" icon={<PlusOutlined />}>
            添加
          </Button>
        )
        const {dataSource,columns}=this.state
        return (
            <div>
                <Card title={title} extra={extra}>
                    <Table 
                        dataSource={dataSource} 
                        columns={columns} 
                        bordered
                    />
                </Card>
            </div>
        )
    }
}

export default Category

