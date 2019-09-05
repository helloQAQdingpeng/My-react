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
class WrappedApp extends React.Component {
    constructor(props){
        console.log(props)
        super(props);
        this.state={
            data:[{}]
        }
    }
    componentDidMount(){
        let id = this.props.match.params.id
        axios.get(`http://cmovie.holyzq.com/api/admin/v1/advertisements/${id}/edit`).then(res=>{
            //this.props.form.setFieldsValue(res.data.data.advertisement)
            this.setState({
                data:res.data.data.advertisement
            })
        })
    }
    check = (e) => {
        console.log(e)
        let id = this.props.match.params.id
        this.props.form.validateFields((err,values) => {
            if (!err) {
                console.log(values);

                axios.put(`http://cmovie.holyzq.com/api/admin/v1/advertisements/${id}`,values).then(res=>{
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
        let {data}=this.state
        return (
            <div>
                <Form.Item {...formItemLayout} label="Name">
                    {getFieldDecorator('name',{
                        initialValue: `${data.name}`,
                    })(<Input/>)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="sort">
                    {getFieldDecorator('sort',{
                        initialValue: `${data.sort}`,
                    })(<Input/>)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="url">
                    {getFieldDecorator('url',{
                        initialValue: `${data.url}`,
                    })(<Input/>)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="advertisement_node_id">
                    {getFieldDecorator('advertisement_node_id',{
                        initialValue: `${data.advertisement_node_id}`,
                    })(<Input/>)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="photo_id">
                    {getFieldDecorator('photo_id',{
                        initialValue: `${data.photo_id}`,
                    })(<Input/>)}
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
const EditAd = Form.create()(WrappedApp);
export default EditAd;