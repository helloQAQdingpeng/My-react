import React, {Component} from 'react';
import { Table, Divider, Tag } from 'antd';
import axios from 'axios';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import { Button } from 'antd';
import { Modal} from 'antd';
const { confirm } = Modal;
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users:[]
        };
    }
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
    }

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
        this.props.history.push(`/edit/${e.id}`)
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

        return (
            <div>
                <Link to='/advertisement_nodes'>
                    <Button type="primary">新增</Button>
                </Link>
                <Table columns={columns} rowKey='id' dataSource={this.state.users}/>
            </div>

        );
    }
}
export default Home;