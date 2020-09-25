import React, { Component } from 'react'
import {Card,List} from 'antd'
import { ArrowLeftOutlined} from '@ant-design/icons';
import './product.less'
import memoryUtils from '../../utils/memoryUtils';
import {reqCategory} from '../../api'
import {BASE_IMG_URL} from '../../utils/constants'
const Item=List.Item
class ProductDetail extends Component {
  state = {
    cName1: '', // 一级分类名称
    cName2: '', // 二级分类名称
  }
  async componentDidMount () {

    // 得到当前商品的分类ID
    const {pCategoryId, categoryId} = memoryUtils.product
    if(pCategoryId==='0') { // 一级分类下的商品
      const result = await reqCategory(categoryId)
      const cName1 = result.data.name
      this.setState({cName1})
    } else { // 二级分类下的商品
      /*
      //通过多个await方式发多个请求: 后面一个请求是在前一个请求成功返回之后才发送
      const result1 = await reqCategory(pCategoryId) // 获取一级分类列表
      const result2 = await reqCategory(categoryId) // 获取二级分类
      const cName1 = result1.data.name
      const cName2 = result2.data.name
      */

      // 一次性发送多个请求, 只有都成功了, 才正常处理
      const results = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)])
      const cName1 = results[0].data.name
      const cName2 = results[1].data.name
      this.setState({
        cName1,
        cName2
      })
    }

  }

  /*
 在卸载之前清除保存的数据
 */
  componentWillUnmount () {
    memoryUtils.product = {}
  }
 render(){
  const {name,desc,price,imgs,detail}=memoryUtils.product
  const {cName1, cName2} = this.state
   const title=(
     <span>
       <ArrowLeftOutlined style={{color:"green",fontSize:"14px",marginRight:'5px'}}
        onClick={()=>{this.props.history.goBack()}}
       />
       商品详情
     </span>
   )
   return (
     <div className="product-detail">
       <Card title={title}>
         <List>
           <Item>
             <span className="item-left">商品名称：</span>{name}
            </Item>
            <Item>
             <span className="item-left">商品描述：</span>{desc}
            </Item>
            <Item>
             <span className="item-left">商品价格：</span>{'¥'+price}
            </Item>
            <Item>
             <span className="item-left">所属分类：</span>{cName1} {cName2 ? ' --> '+cName2 : ''}
            </Item>
            <Item>
             <span className="item-left">商品图片：</span>
             <span>
              {
                imgs.map(img => (
                  <img
                    key={img}
                    src={BASE_IMG_URL + img}
                    className="product-img"
                    alt="img"
                  />
                ))
              }
            </span>
            </Item>
            <Item>
             <span className="item-left">商品详情：</span><span dangerouslySetInnerHTML={{__html: detail}}>
            </span>
            </Item>
         </List>
       </Card>
     </div>
   )
 }
}

export default ProductDetail