import React, { useState, createContext } from 'react'
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import { Layout } from 'antd';

import Room from '../room/room';
import User from '../user/user';
import EHotelInfo from '../eHotelInfo/EHotelInfo'
import Main from '../../components/left-nav/main';
import Head from '../../components/header/Header';

import './Admin.less'
import './Admin.less'
const { Sider, Content } = Layout;
export let MyContext: any = createContext(false);

export default () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout className="main" >
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Main />
            </Sider>
            <Layout className="site-layout">
                <MyContext.Provider value={{ collapsed, setCollapsed }}>
                    <Head />
                </MyContext.Provider>
                <Content className="content"  >
                    <HashRouter>
                        <Switch>
                            <Route path="/eHotelInfo" component={EHotelInfo} />
                            <Route path="/room" component={Room} />
                            <Route path="/user" component={User} />
                        </Switch>
                    </HashRouter>
                </Content>
            </ Layout>
        </Layout>
    )
}
