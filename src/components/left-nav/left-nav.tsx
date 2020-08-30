import React, { useEffect, useRef, useState } from 'react';
import { Menu } from 'antd';
import {
  UserOutlined,
  PieChartOutlined,
  BarsOutlined,
  HomeOutlined,
  BulbOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons';
import { HashRouter, NavLink, useHistory } from 'react-router-dom';
import './left-nav.less';

const menuConfig = [
  { icon: <PieChartOutlined />, url: '/', label: '数据分析' },
  {
    key: 2,
    icon: <HomeOutlined />,
    url: '/eHotelInfo',
    label: '商家基本信息管理',
  },
  { icon: <UserOutlined />, url: '/user', label: '用户' },
  { icon: <BulbOutlined />, url: '/room', label: '房间' },
  { icon: <BarsOutlined />, url: '/record', label: '订单' },
  { icon: <CustomerServiceOutlined />, url: '/active', label: '活动' },
];

export default function LeftNav() {
  const h = useHistory();
  const pathname = h.location.pathname;
  const [path, setPath] = useState(pathname);

  const menu = useRef<Menu>();

  return (
    <div className="left-nav">
      <div className="logo">LOGO</div>
      <HashRouter>
        <Menu
          ref={menu as any}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/']}
          selectedKeys={[path]}
          onClick={(e) => setPath(e['key'].toString())}
        >
          {menuConfig.map((item) => (
            <Menu.Item key={item['url']} icon={item['icon']}>
              <NavLink to={item['url']}>{item['label']}</NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </HashRouter>
    </div>
  );
}
