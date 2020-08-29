import React, { useState } from 'react';
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom'

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
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
        <MenuItem key="1" icon={<UserOutlined />}>
          <Link to="/eHotelInfo" >商家基本信息管理</Link>
        </MenuItem>
        <MenuItem key="2" icon={<UserOutlined />}>
          <Link to="/user" >用户</Link>
        </MenuItem>
        <MenuItem key="3" icon={<VideoCameraOutlined />}>
          <Link to="/room">房间</Link>
        </MenuItem>
        <MenuItem key="4" icon={<UploadOutlined />}>
          <Link to="/record">订单</Link>
        </MenuItem>
        <SubMenu
          key="sub1"
          title="优惠卷管理"
          icon={<UploadOutlined />}

        >
          <Menu.Item key="sub1" >
            <Link to="/coupon">我的优惠卷</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/add-coupon">添加优惠卷</Link>
          </Menu.Item>

        </SubMenu>
      </Menu>
    </>
  );
}
