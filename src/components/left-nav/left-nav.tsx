import React, {  } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom'

import {
  UserOutlined,
  PieChartOutlined,
  BarsOutlined,
  HomeOutlined,
  BulbOutlined,
  CustomerServiceOutlined,
  UploadOutlined
} from '@ant-design/icons';
import MenuItem from 'antd/lib/menu/MenuItem';

import './left-nav.less'

const { SubMenu } = Menu;

export default function Main(props: any) {

  return (
    <>
      <div className="logo">LOGO</div>
      <Menu theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
      >
         <MenuItem key="1" icon={<PieChartOutlined />}>
          <a href="#/">数据分析</a>
        </MenuItem>
        <MenuItem key="2" icon={<HomeOutlined />}>
          <a href="#/eHotelInfo">商家基本信息管理</a>
        </MenuItem>
        <MenuItem key="3" icon={<UserOutlined />}>
          <a href="#/user">用户</a>
        </MenuItem>
        <MenuItem key="4" icon={<BulbOutlined />}>
          <a href="#/room">房间管理</a>
        </MenuItem>
        <MenuItem key="5" icon={<BarsOutlined />}>
          <a href="#/record">订单</a>
        </MenuItem>{' '}
        <MenuItem key="6" icon={<CustomerServiceOutlined />}>
          <a href="#/active">活动</a>
        </MenuItem>
        <SubMenu
          key="sub1"
          title="优惠卷管理"
          icon={<UploadOutlined />}

        >
          <Menu.Item key="sub2" >
            <Link to="/coupon">我的优惠卷</Link>
          </Menu.Item>
          <Menu.Item key="sub3">
            <Link to="/add-coupon">添加优惠卷</Link>
          </Menu.Item>

        </SubMenu>
      </Menu>
    </>
  );
}
