import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  UserOutlined,
  PieChartOutlined,
  BarsOutlined,
  HomeOutlined,
  BulbOutlined,
  CustomerServiceOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { HashRouter, NavLink, useHistory } from 'react-router-dom';
import './left-nav.less';
const { SubMenu } = Menu;

/**
 * 菜单配置
 */
const menuConfig: ILinkProps[] = [
  { icon: <PieChartOutlined />, url: '/', label: '数据分析' },
  { icon: <HomeOutlined />, url: '/eHotelInfo', label: '商家基本信息管理' },
  { icon: <UserOutlined />, url: '/user', label: '用户管理' },
  { icon: <BulbOutlined />, url: '/room', label: '房间管理' },
  { icon: <BarsOutlined />, url: '/record', label: '订单管理' },
  { icon: <CustomerServiceOutlined />, url: '/active', label: '活动管理' },
  {
    icon: <UploadOutlined />,
    url: '/coupon',
    label: '优惠券管理',
    subLink: [
      { url: '/coupon/mycoupon', label: '我的优惠券', baseUrl: '/coupon' },
      { url: '/coupon/addcoupon', label: '添加优惠券', baseUrl: '/coupon' },
    ],
  },
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
      <div className="logo">LOGO</div>
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

{
  /* <Menu theme="dark"
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
  <a href="#/room">房间</a>
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
  <Menu.Item key="sub1" >
    <Link to="/coupon">我的优惠卷</Link>
  </Menu.Item>
  <Menu.Item key="5">
    <Link to="/add-coupon">添加优惠卷</Link>
  </Menu.Item>

</SubMenu>
</Menu>
</> */
}
