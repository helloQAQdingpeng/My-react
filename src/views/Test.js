import React, {Component} from 'react';
import {Table, Divider} from 'antd';
import {Button, Modal, Form, Input, Radio} from 'antd';
import axios from 'axios';
const { confirm } = Modal;
//新增模态框
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="Create a new collection"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="Name">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please input your name!' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Sort">
                            {getFieldDecorator('sort', {
                                rules: [{ required: true, message: 'Please input your Sort!' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Photo_id">
                            {getFieldDecorator('photo_id', {
                                rules: [{ required: true, message: 'Please input your photo_id!' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Advertisement_node_id">
                            {getFieldDecorator('advertisement_node_id', {
                                rules: [{ required: true, message: 'Please input your note!' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Url">
                            {getFieldDecorator('url', {
                                rules: [{ required: true, message: 'Please input your url!' }],
                            })(<Input />)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);

//编辑模态框
const CollectionCreateForms = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {

        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            let data=this.props.text;
            console.log(this.props)
            return (
                <Modal
                    visible={visible}
                    title="Create a new collection"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="Name">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please input your name!' }],
                                initialValue:data.name,
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Sort">
                            {getFieldDecorator('sort', {
                                rules: [{ required: true, message: 'Please input your Sort!' }],
                                initialValue:data.sort,
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Photo_id">
                            {getFieldDecorator('photo_id', {
                                rules: [{ required: true, message: 'Please input your photo_id!' }],
                                initialValue:data.photo_id,
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Advertisement_node_id">
                            {getFieldDecorator('advertisement_node_id', {
                                rules: [{ required: true, message: 'Please input your note!' }],
                                initialValue:data.advertisement_node_id,
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Url">
                            {getFieldDecorator('url', {
                                rules: [{ required: true, message: 'Please input your url!' }],
                                initialValue:data.url,
                            })(<Input />)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);

class Together extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{}],
            visible: false,
            visibles: false,
            datas:[{}]
        }
    }
    //新增用modal控制弹出表单
    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                axios.post(`http://cmovie.holyzq.com/api/admin/v1/advertisements`,values)
                    .then(res=>{
                        console.log(res)
                        form.resetFields();
                        this.setState({ visible: false });
                        this.init()
                    })
            }
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };


    //编辑用modal控制弹出表单
    compilerow = (text) =>{
        this.setState({visibles: true});
        let id=text.id;
        console.log(id)
        axios.get(`http://cmovie.holyzq.com/api/admin/v1/advertisements/${id}/edit`)
            .then(res=>{
                console.log(res)
                this.setState({
                    datas:res.data.data.advertisement
                })
            })
    };
    handleCancels = () => {
        this.setState({ visibles: false });
    };

    handleCreates = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (!err) {
                let id=this.state.datas.id;
                console.log(id)
                axios.put(`http://cmovie.holyzq.com/api/admin/v1/advertisements/${id}`,values)
                    .then(res=>{
                        this.setState({visibles: false});
                        this.init();
                        form.resetFields()
                    })
            }
        });
    };

    saveFormRefs = formRef => {
        this.formRef = formRef;
    };
    //广告列表
    componentDidMount() {
        this.init()
    }
    deleterow = (value) => {
        let id = value.id;
        confirm({
            title: 'Are you sure delete this task?',
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk:()=> {
                axios.delete(`http://cmovie.holyzq.com/api/admin/v1/advertisements/${id}`)
                    .then(res => {
                        this.init()
                    })
            },
            onCancel() {
            },
        });
    };
    init(){
        axios.get('http://cmovie.holyzq.com/api/admin/v1/advertisements')
            .then(res => {
                console.log(res);
                this.setState({
                    data: res.data.data
                })
            })
    };

    render() {
        let data = this.state.data;
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: text => <a>{text}</a>,
            },
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'Time',
                dataIndex: 'updated_at',
                key: 'updated_at',
            },
            {
                title: 'Sort',
                dataIndex: 'sort',
                key: 'sort',
            },
            {
                title: 'Url',
                dataIndex: 'id',
                key: 'url',
            },
            {
                title: 'Photo_id',
                dataIndex: 'photo_id',
                key: 'photo_id',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
        <a>{record.name}</a>
        <Divider type="vertical"/>
      </span>
                ),
            },
            {
                render:(text,record)=>(
                    <span>
                        <Button onClick={this.compilerow.bind(this, text)}>Compile</Button>
                    </span>
                )
            },
            {
                render:(text,record)=>(
                    <span>
                        <Button onClick={this.deleterow.bind(this, text)}>Delete</Button>
                    </span>
                )
            }
        ];
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    新增广告
                </Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
                <CollectionCreateForms
                    wrappedComponentRef={this.saveFormRefs}
                    visible={this.state.visibles}
                    onCancel={this.handleCancels}
                    onCreate={this.handleCreates}
                    text={this.state.datas}
                />
                <Table columns={columns} dataSource={data}/>
            </div>
        );
    }
}

export default Together;