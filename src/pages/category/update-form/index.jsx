import React, { Component } from 'react'
import { Form, Input } from 'antd';
import PropTypes from 'prop-types'

export default class UpdateCategory extends Component {
    formRef = React.createRef();
    static propTypes = {
        setForm:PropTypes.func.isRequired,
        categoryName:PropTypes.string.isRequired
      }
    render() {
        this.props.setForm(this.formRef);
        return (
            <Form ref={this.formRef} name="control-ref">
                <Form.Item
                    name="categoryName"
                    label="分类名称"
                    rules={[
                        {
                        required: true,
                        },
                    ]}
                    initialValue={this.props.categoryName}
                    >
                    <Input />
                </Form.Item>
            </Form>
        )
    }
}
