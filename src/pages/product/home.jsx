import React, { Component } from 'react'
import { Card,Table, Button,Select,Input } from 'antd';
import { PlusOutlined} from '@ant-design/icons';
import {reqProducts, reqSearchProducts, reqUpdateStatus} from '../../api/index.js'
import ButtonLink from '../../components/button-link'
import {PAGE_SIZE} from '../../utils/constants'
import memoryUtils from '../../utils/memoryUtils';

const Option=Select.Option
class ProductHome extends Component {
  state={
    total: 0, // 商品的总数量
    products: [], // 商品的数组
    loading: false, // 是否正在加载中
    searchName: '', // 搜索的关键字
    searchType: 'productName', // 根据哪个字段搜索
  }

  getColumns=()=>{
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name'
      },
      {
        title: '商品描述',
        dataIndex: 'desc'
      },
      {
        title: '价格',
        dataIndex: 'price',
        render:(price)=>'¥'+price
      },
      {
        width: 100,
        title: '状态',
        // dataIndex: 'status',
        render: (product) => {
          const {status, _id} = product
          const newStatus = status===1 ? 2 : 1
          return (
            <span>
              <Button
                type='primary'
              >
                {status===1 ? '下架' : '上架'}
              </Button>
              <span>{status===1 ? '在售' : '已下架'}</span>
            </span>
          )
        }
      },
      {
        width: 100,
        title: '操作',
        render: (product) => {
          return (
            <span>
              {/*将product对象使用state传递给目标路由组件*/}
              <ButtonLink onClick={()=>this.showProductDetail(product)}>详情</ButtonLink>
              <ButtonLink onClick={()=>this.showProductAddUpdate(product)}>修改</ButtonLink>
            </span>
          )
        }
      },
    ];
    return columns
  }
  showProductDetail(product){
    memoryUtils.product=product
    this.props.history.push('/product/detail')
  }
  showProductAddUpdate(product){
    memoryUtils.product=product
    this.props.history.push('/product/addupdate')
  }
  componentWillMount(){
    this.columns=this.getColumns()
  }
  componentDidMount(){
    this.getProducts(1)
  }
  /*
  获取指定页码的列表数据显示
   */
  getProducts = async (pageNum) => {
    this.pageNum = pageNum // 保存pageNum, 让其它方法可以看到
    this.setState({loading: true}) // 显示loading

    const {searchName, searchType} = this.state
    // 如果搜索关键字有值, 说明我们要做搜索分页
    let result
    if (searchName) {
      result = await reqSearchProducts({pageNum, pageSize: PAGE_SIZE, searchName, searchType})
    } else { // 一般分页请求
      result = await reqProducts(pageNum, PAGE_SIZE)
    }

    this.setState({loading: false}) // 隐藏loading
    if (result.status === 0) {
      // 取出分页数据, 更新状态, 显示分页列表
      const {total, list} = result.data
      this.setState({
        total,
        products: list
      })
    }
  }
    render() {
        const extra=(
          <Button type="primary" icon={<PlusOutlined />} onClick={()=>this.setState({showModal:1})}>
            添加商品
          </Button>
        )
        const {searchType,searchName,products,total}=this.state
        const title=(
          <span>
            <Select
              value={searchType}
              style={{ width: 150 }}
              onChange={value => this.setState({ searchType: value })}
            >
              <Option value='productName'>按名称搜索</Option>
              <Option value='productDesc'>按描述搜索</Option>
            </Select>
            <Input
              placeholder='关键字'
              style={{ width: 150, margin: '0 15px' }}
              value={searchName}
              onChange={event => this.setState({ searchName: event.target.value })}
            />
            <Button type='primary' onClick={() => this.getProducts(1)}>搜索</Button>
          </span>
        )

        return (
            <div>
                <Card title={title} extra={extra}>
                    <Table 
                        dataSource={products} 
                        columns={this.columns} 
                        bordered
                        pagination={{
                          current: this.pageNum,
                          total,
                          defaultPageSize: PAGE_SIZE,
                          showQuickJumper: true,
                          onChange: this.getProducts
                        }}
                    />
                </Card>
            </div>
        )
    }
}

export default ProductHome