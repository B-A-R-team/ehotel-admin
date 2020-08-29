import React, { useState, createContext } from 'react'
import { HashRouter, Switch, Route, Link, BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd'

import Room from '../room/room';
import User from '../user/user';
import Main from '../../components/left-nav/LeftNav';
import EHotelRoute from '../eHotelInfo/eHotelRoute'
import Head from '../../components/header/Header';
import Coupon from '../coupon'
import { AddCoupon } from '../coupon/add-coupon/AddCoupon';
import EHotelInfo from '../eHotelInfo/EHotelInfo';


import './Admin.less';
import Record from '../record/record';
import './Admin.less';
const { Sider, Content } = Layout;
export let MyContext: any = createContext(false);

export default () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className="main" >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <HashRouter>
          <Main />
        </HashRouter>
      </Sider>
      <Layout className="site-layout">
        <MyContext.Provider value={{ collapsed, setCollapsed }}>
          <Head />
        </MyContext.Provider>
        <Content className="content"  >
          <HashRouter>
            <Switch>
              <Route path="/eHotelInfo" component={EHotelRoute} />
              <Route path="/room" component={Room} />
              <Route path="/user" component={User} />
              <Route path="/coupon" component={Coupon} />
              <Route path="/add-coupon" component={AddCoupon} />
              <Route path="/record" component={Record} />
            </Switch>
          </HashRouter>
        </Content>
      </ Layout>
    </Layout>
  )
}

