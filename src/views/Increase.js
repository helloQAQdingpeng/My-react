import React, {Component} from 'react';
import { Table, Divider, Tag ,Modal ,Button ,Form ,Checkbox ,Input} from 'antd';
import axios from 'axios';
import {BrowserRouter as Router, Link} from 'react-router-dom';




const { confirm } = Modal;
class DynamicRule extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            users:[],
            visible: false,
            visibleTwo: false,
            confirmLoading: false,
            data:[{
                name:'',
                sort:'',
                url:'',
                advertisement_node_id:'',
                photo_id:'',
            }],
            id:''
        };
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    // hideModal = () => {
    //     this.setState({
    //         visibleTwo: true,
    //     });
    // };
    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                visibleTwo: false,
                confirmLoading: false,
            });
        }, 2000);
    };
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
            visibleTwo: false,
        });
    };

    destroyAll = () =>{
        Modal.destroyAll();
    }

    showConfirm = (e) =>{
        let that = this
        console.log(e)
        confirm({
            content: <Button onClick={this.destroyAll}>Click to destroy all</Button>,
            onOk() {
                axios.delete(`http://cmovie.holyzq.com/api/admin/v1/advertisements/${e.id}`).then(res=>{
                    that.init()
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
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
    checkTwo = (e) => {
        // console.log(e)
        let id = this.state.id
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
    componentDidMount(){
        this.init()
    }
    init(){
        const _this=this;
        axios.get('http://cmovie.holyzq.com/api/admin/v1/advertisements').then(res=>{
            console.log(res)
            _this.setState({
                users:res.data.data,
            });
        })
    };
    btnClick = (e) => {
        console.log(e)
        this.setState({
            visibleTwo: true,
            id:e.id,
        });
        let id = e.id
        axios.get(`http://cmovie.holyzq.com/api/admin/v1/advertisements/${id}/edit`).then(res=>{
            //this.props.form.setFieldsValue(res.data.data.advertisement)
            this.setState({
                data:res.data.data.advertisement
            })
        })
    }
    render() {
        const columns = [
            {
                title: 'key',
                dataIndex: 'id',
            },
            {
                title: 'Name',
                dataIndex: 'name',
            },

            {
                title: 'id',
                dataIndex: 'photo_id',
            },
            {
                title: 'sort',
                dataIndex: 'sort',
            },
            {
                title: 'time',
                dataIndex: 'updated_at',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a onClick={()=>this.btnClick(record)}>编辑</a>
                        <Divider type="vertical" />
                        <a onClick={()=>this.showConfirm(record)}>删除</a>
                     </span>
                ),
            },
        ];
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8 },
        };
        const formTailLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8, offset: 4 },
        };
        const { getFieldDecorator } = this.props.form;
        let {data}=this.state
        const form =             <div>
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
        const formTwo =    <div>
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
                <Button type="primary" onClick={this.checkTwo.bind(this.props.history)}>
                    Check
                </Button>
            </Form.Item>
        </div>
        const { visible, confirmLoading ,visibleTwo} = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    新增
                </Button>
                <Modal
                    title="Title"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <div>{form}</div>
                </Modal>
                <Modal
                    title="Title"
                    visible={visibleTwo}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <div>{formTwo}</div>
                </Modal>
                <Table columns={columns} rowKey='id' dataSource={this.state.users}/>
            </div>

        );
    }
}
const EditAd = Form.create()(DynamicRule);
export default EditAd;