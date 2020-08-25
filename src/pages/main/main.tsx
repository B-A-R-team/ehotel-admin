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
import './main.less';
import { HashRouter, Switch, Route } from 'react-router-dom';
import User from '../user/user';
import Room from '../room/room';
import Record from '../record/record';

const { Header, Sider, Content } = Layout;

export default function Main() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="main">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">LOGO</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <MenuItem key="1" icon={<UserOutlined />}>
            <a href="#/">用户</a>
          </MenuItem>
          <MenuItem key="2" icon={<VideoCameraOutlined />}>
            <a href="#/room">房间</a>
          </MenuItem>
          <MenuItem key="3" icon={<UploadOutlined />}>
            <a href="#/record">订单</a>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <Header className="header" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => {
                setCollapsed(!collapsed);
              },
            }
          )}
        </Header>
        <Content className="content">
          <HashRouter>
            <Switch>
              <Route path="/record" component={Record} />
              <Route path="/room" component={Room} />
              <Route component={User} />
            </Switch>
          </HashRouter>
        </Content>
      </Layout>
    </Layout>
  );
}
