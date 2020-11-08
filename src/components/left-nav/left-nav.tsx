/* eslint-disable no-lone-blocks */
import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  UserOutlined,
  BarsOutlined,
  HomeOutlined,
  BulbOutlined,
  CustomerServiceOutlined,
  UploadOutlined,
  BoxPlotOutlined,
  CrownOutlined,
} from '@ant-design/icons';
import { HashRouter, NavLink, useHistory } from 'react-router-dom';
import './left-nav.less';
const { SubMenu } = Menu;

/**
 * 菜单配置
 */
const menuConfig: ILinkProps[] = [
  // { icon: <PieChartOutlined />, url: '/', label: '数据分析' },
  { icon: <HomeOutlined />, url: '/', label: '商家基本信息管理' },
  { icon: <UserOutlined />, url: '/user', label: '用户管理' },
  { icon: <BulbOutlined />, url: '/room', label: '房间管理' },
  { icon: <BarsOutlined />, url: '/record', label: '订单管理' },
  { icon: <CustomerServiceOutlined />, url: '/active', label: '活动管理' },
  {
    icon: <UploadOutlined />,
    url: '/coupon',
    label: '优惠券管理',
    subLink: [
      { url: '/mycoupon', label: '我的优惠券', baseUrl: '/coupon' },
      { url: '/addcoupon', label: '添加优惠券', baseUrl: '/coupon' },
    ],
  },
  { icon: <BoxPlotOutlined />, url: '/carousels', label: '轮播图管理' },
  { icon: <CrownOutlined />, url: '/vip', label: '会员管理' },
];

/**
 * 子菜单接口
 */
export interface ISubLinkProps {
  url: string;
  label: string;
  baseUrl: string;
}

/**
 * 主菜单接口
 */
export interface ILinkProps {
  icon: React.ReactNode;
  url: string;
  label: string;
  subLink?: ISubLinkProps[];
}

/**
 * 生成子菜单
 * @param link 生成子菜单的数据
 */
const generateSubLink = (link: ILinkProps) => {
  return (
    <SubMenu title={link['label']} key={link['url']} icon={link['icon']}>
      {link['subLink']?.map((item) => (
        <Menu.Item key={item['url']}>
          <NavLink to={item['url']}>{item['label']}</NavLink>
        </Menu.Item>
      ))}
    </SubMenu>
  );
};

export default function LeftNav() {
  const h = useHistory();
  const pathname = h.location.pathname;
  const [path, setPath] = useState(pathname);

  return (
    <div className="left-nav">
      <div className="logo">BAR</div>
      <HashRouter>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/']}
          selectedKeys={[path]}
          onClick={(e) =>
            e['key'] ? setPath(e['key'].toString()) : console.log(e)
          }
        >
          {menuConfig.map((item) =>
            !item['subLink'] ? (
              <Menu.Item key={item['url']} icon={item['icon']}>
                <NavLink to={item['url']}>{item['label']}</NavLink>
              </Menu.Item>
            ) : (
              generateSubLink(item)
            )
          )}
        </Menu>
      </HashRouter>
    </div>
  );
}
