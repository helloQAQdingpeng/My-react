import { Form, Input, Button, Checkbox } from 'antd';
import React, {Component} from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import axios from 'axios'
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};
const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
};
class DynamicRule extends React.Component {
    check = () => {
        this.props.form.validateFields((err,values) => {
            if (!err) {
                console.log(values);
                axios.post('http://cmovie.holyzq.com/api/admin/v1/advertisements',values).then(res=>{
                    this.props.history.push('/')
                })
            }
        });
    };
    handleChange = e => {
        this.setState(
            {
                checkNick: e.target.checked,
            },
            () => {
                this.props.form.validateFields(['nickname'], { force: true });
            },
        );
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form.Item {...formItemLayout} label="Name">
                    {getFieldDecorator('name')(<Input placeholder="Please input your name" />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="sort">
                    {getFieldDecorator('sort')(<Input placeholder="Please input your nickname" />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="url">
                    {getFieldDecorator('url')(<Input placeholder="Please input your nickname" />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="advertisement_node_id">
                    {getFieldDecorator('advertisement_node_id')(<Input placeholder="Please input your nickname" />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="photo_id">
                    {getFieldDecorator('photo_id')(<Input placeholder="Please input your nickname" />)}
                </Form.Item>
                <Form.Item {...formTailLayout} >
                    <Button type="primary" onClick={this.check.bind(this.props.history)}>
                        Check
                    </Button>
                </Form.Item>
            </div>
        );
    }
}
const EditAd = Form.create()(DynamicRule);
export default EditAd;