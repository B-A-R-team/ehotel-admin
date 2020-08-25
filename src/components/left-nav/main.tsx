import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import MenuItem from 'antd/lib/menu/MenuItem';

export default function Main() {

  return (
      <>
        <div className="logo">LOGO</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
         <MenuItem key="1" icon={<UserOutlined />}>
            <a href="#/eHotelInfo">商家基本信息管理</a>
          </MenuItem>
          <MenuItem key="2" icon={<UserOutlined />}>
            <a href="#/user">用户</a>
          </MenuItem>
          <MenuItem key="3" icon={<VideoCameraOutlined />}>
            <a href="#/room">房间</a>
          </MenuItem>
          <MenuItem key="4" icon={<UploadOutlined />}>
            订单
          </MenuItem>
        </Menu>
        </>
  );
}
