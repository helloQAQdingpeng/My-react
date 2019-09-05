import React, {Component} from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import {Route, Switch} from "react-router-dom";
import './style/App.css';
import { Layout, Menu, Breadcrumb, Icon,} from 'antd';
import RouterView from "./routers/RouterView";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


class App extends Component {
    render() {
        return (
            <Router>
                <Layout>
                    <Header className="header">
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu>
                    </Header>
                    <Layout>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                <SubMenu
                                    key="sub1"
                                    title={
                                        <span>
                <Icon type="user" />
                my首页
              </span>
                                    }
                                >
                                    <Menu.Item key="1">
                                        <Link to='/'>首页</Link>
                                    </Menu.Item>
                                    <Menu.Item key="2">
                                        <Link to='/advertisement_nodes'>222222</Link>
                                    </Menu.Item>
                                    <Menu.Item key="3">
                                        <Link to='/increase'>333333</Link>
                                    </Menu.Item>
                                    <Menu.Item key="4">
                                        <Link to='/edit'>444444</Link>
                                    </Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="sub2"
                                    title={
                                        <span>
                <Icon type="laptop" />
                subnav 2
              </span>
                                    }
                                >
                                    <Menu.Item key="5">
                                        <Link to='/test'>555555</Link>
                                    </Menu.Item>
                                    <Menu.Item key="6">option6</Menu.Item>
                                    <Menu.Item key="7">option7</Menu.Item>
                                    <Menu.Item key="8">option8</Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="sub3"
                                    title={
                                        <span>
                <Icon type="notification" />
                subnav 3
              </span>
                                    }
                                >
                                    <Menu.Item key="9">option9</Menu.Item>
                                    <Menu.Item key="10">option10</Menu.Item>
                                    <Menu.Item key="11">option11</Menu.Item>
                                    <Menu.Item key="12">option12</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                style={{
                                    background: '#fff',
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                <RouterView/>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>,
            </Router>
        );
    }
}

export default App;