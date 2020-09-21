import React, { Component } from 'react'
import { Form, Input,Select } from 'antd';
import PropTypes from 'prop-types'

const { Option } = Select;
export default class AddCategory extends Component {
    static propTypes = {
        categorys: PropTypes.array.isRequired,
        setForm:PropTypes.func.isRequired
      }
    formRef = React.createRef();
    render() {
        const {categorys}=this.props
        this.props.setForm(this.formRef);
        return (
            <Form ref={this.formRef} name="control-ref">
                <Form.Item
                    name="parentId"
                    label="所属分类"
                    rules={[
                        {
                        required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                    >
                        <Option value="0" key="0">一级分类</Option>
                        {categorys.map(c=>(<Option value={c._id} key={c._id}>{c.name}</Option>))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="categoryName"
                    label="分类名称"
                    rules={[
                        {
                        required: true,
                        },
                    ]}
                    >
                    <Input />
                </Form.Item>
            </Form>
        )
    }
}
