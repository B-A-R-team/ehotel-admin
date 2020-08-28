import React from 'react';
import { Menu } from 'antd';
import {
  UserOutlined,
  PieChartOutlined,
  BarsOutlined,
  HomeOutlined,
  BulbOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons';
import MenuItem from 'antd/lib/menu/MenuItem';

export default function Main() {
  return (
    <>
      <div className="logo">LOGO</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
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
          <a href="#/room">房间</a>
        </MenuItem>
        <MenuItem key="5" icon={<BarsOutlined />}>
          <a href="#/record">订单</a>
        </MenuItem>{' '}
        <MenuItem key="6" icon={<CustomerServiceOutlined />}>
          <a href="#/active">活动</a>
        </MenuItem>
      </Menu>
    </>
  );
}
