import React, { Component } from 'react'
import { Card,Table, Button,Space,message,Modal } from 'antd';
import { PlusOutlined,ArrowRightOutlined} from '@ant-design/icons';
import {reqGetCategorys,reqAddCategory,reqUpdateCategory} from '../../api/index.js'
import ButtonLink from '../../components/button-link'
import AddCategory from './add-form'
import UpdateCategory from './update-form'
export class Category extends Component {
  state={
    categorys:[],
    subCategorys:[],
    dataSource:[],
    parentId:'0',
    categoryName:'',
    showModal:0//0,1,2
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
        dataIndex: '_id',
        key: '_id',
        width:'200px',
        render:(text,record)=>(
          <Space size="middle">
            <ButtonLink onClick={()=>{this.showUpateModal(record)}}>修改分类</ButtonLink>
            {this.state.parentId==='0'?<ButtonLink onClick={()=>{this.getSubCategorys(record)}}>查看子分类</ButtonLink>:null}
        </Space>
        )
      },
    ];
    return columns
  }

  componentWillMount(){
    this.columns=this.getColumns()
  }
  componentDidMount(){
    this.getCategorys()
  }
  getCategorys=async(parentId)=>{
    parentId=parentId||this.state.parentId
    const response=await reqGetCategorys(parentId)
    const result=response.data
    if(response.status===0){
      const categorys=result;
      if(parentId==='0'){
        this.setState({
          categorys:categorys
        })
      }else{
        this.setState({
          subCategorys:categorys
        })
      }
      
    }else{
      console.log('fail')
      message.error(response.msg)
    }
  }

  getSubCategorys=(category)=>{
    this.setState({
      parentId:category._id,
      categoryName:category.name
    },function(){
      this.getCategorys();
    })
  }
  showMainCategory=()=>{
    this.setState({
      parentId:'0',
      subCategorys:[],
      categoryName:''
    })
  }
  handleCancel=()=>{
    this.setState(
      {
        showModal:0
      }
    )
  }
  handAddCategory=async()=>{
    const {parentId,categoryName}=this.form.current.getFieldsValue()
    console.log(parentId,categoryName);
    const response = await reqAddCategory(categoryName, parentId)
    if(response.status===0){
      message.success("添加分类成功")
      // 添加的分类就是当前分类列表下的分类
      if(parentId===this.state.parentId) {
        // 重新获取当前分类列表显示
        this.getCategorys()
      } else if (parentId==='0'){ // 在二级分类列表下添加一级分类, 重新获取一级分类列表, 但不需要显示一级列表
        this.getCategorys('0')
      }
    }else{
      message.error(response.msg)
    }
    this.setState({
      showModal:0
    })
  }
  showUpateModal=(category)=>{
    this.category=category
    this.setState({
      showModal:2
    })
  }
  handleUpdateCategory=async()=>{
    const {categoryName}=this.form.current.getFieldsValue()
    const categoryId=this.category._id;
    const response = await reqUpdateCategory({categoryId,categoryName})
    if(response.status===0){
      message.success("修改分类成功")
      this.form.current.resetFields()
      this.getCategorys()
    }else{
      message.error(response.msg)
    }
    this.setState({
      showModal:0
    })
  }
    render() {
        const extra=(
          <Button type="primary" icon={<PlusOutlined />} onClick={()=>this.setState({showModal:1})}>
            添加
          </Button>
        )
        const {categorys,subCategorys,parentId,showModal,categoryName}=this.state
        const title=(
          <span>
            <ButtonLink onClick={this.showMainCategory}>一级列表</ButtonLink>
            {parentId!=='0'?(<span><ArrowRightOutlined/>{categoryName}</span>):null}
          </span>
        )
        const category = this.category || {} // 如果还没有指定一个空对象
        return (
            <div>
                <Card title={title} extra={extra}>
                    <Table 
                        dataSource={parentId==='0'?categorys:subCategorys} 
                        columns={this.columns} 
                        bordered
                        pagination={{pageSize:5}}
                    />
                </Card>
                <Modal
                  title="添加分类"
                  visible={showModal===1}
                  onOk={this.handAddCategory}
                  onCancel={this.handleCancel}
                >
                  <AddCategory categorys={categorys} setForm={(form)=>{this.form=form}}></AddCategory>
                </Modal>
                <Modal
                  title="修改分类"
                  visible={showModal===2}
                  onOk={this.handleUpdateCategory}
                  onCancel={this.handleCancel}
                >
                  <UpdateCategory setForm={(form)=>{this.form=form}} categoryName={category.name}></UpdateCategory>
                </Modal>
            </div>
        )
    }
}

export default Category

