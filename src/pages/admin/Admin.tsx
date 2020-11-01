import React, { useState, createContext, useEffect } from 'react';
import {
  HashRouter,
  Switch,
  Route,
  useHistory
} from 'react-router-dom';
import { Layout } from 'antd';
import EHotelRoute from '../eHotelInfo/eHotelRoute';
import Room from '../room/room';
import User from '../user/user';
import LeftNav from '../../components/left-nav/left-nav';
import Head from '../../components/header/Header';
import Coupon from '../coupon';
import { AddCoupon } from '../coupon/add-coupon/AddCoupon';
import Record from '../record/record';
import './Admin.less';
import MyActive from '../active';
import Carousels from '../carousels/carousels';
import Vip from '../vip/vip';
import storageUtils from '../../utils/storageUtils'

const { Sider, Content } = Layout;
export let MyContext: any = createContext(false);

export default () => {
  const [collapsed, setCollapsed] = useState(false);
  const h = useHistory();
  // 判断是否登录
  useEffect(() => {
    const user_info = storageUtils.getUser()
    if (!user_info.id) {
      h.push('/login');
    }
  });

  return (
    <Layout className="main">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <LeftNav />
      </Sider>
      <Layout className="site-layout">
        <MyContext.Provider value={{ collapsed, setCollapsed }}>
          <Head />
        </MyContext.Provider>
        <Content className="content">
          <HashRouter>
            <Switch>
              <Route path="/carousels" component={Carousels} />
              <Route path="/room" component={Room} />
              <Route path="/user" component={User} />
              <Route path="/coupon/mycoupon" component={Coupon} />
              <Route path="/coupon/addcoupon" component={AddCoupon} />
              <Route path="/record" component={Record} />
              <Route path="/active" component={MyActive} />
              <Route path="/vip" component={Vip} />
              <Route component={EHotelRoute} />
              {/* <Route component={Analysis} /> */}
            </Switch>
          </HashRouter>
        </Content>
      </Layout>
    </Layout>
  );
};
