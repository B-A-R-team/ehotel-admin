/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Tabs, Form, Input, Button, Checkbox, Image } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  CopyrightOutlined,
} from '@ant-design/icons';
import './login.less';
import { useHistory } from 'react-router-dom';
import img_login_url from './wxlogin.png';
import storageUtils from '../../utils/storageUtils'
import { reqLogin } from '../../api'

const { TabPane } = Tabs;
const { Item } = Form;

const Login = () => {
  const h = useHistory();
  const [isRemember, setRemember] = useState(false);

  useEffect(() => {
    const user_info = storageUtils.getUser()
    if (user_info.id) {
      h.push('/');
    }
  }, [])


  const onFinish = async (values: object) => {
    console.log(values);
    const user = await reqLogin(values)
    if (isRemember) {
      storageUtils.saveUser(user.data.user)
      storageUtils.saveToken(user.data.token)
    }
    h.replace('/')
  };
  return (
    <div className="login">
      <div className="title">BAR酒店后台管理</div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="邮箱密码登陆" key="1">
          <Form className="login-form" onFinish={onFinish} >
            <Item
              name="email"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input
                size="large"
                placeholder="请输入邮箱：123456@email.com"
                type="email"
                prefix={<UserOutlined />}

              />
            </Item>
            <Item
              name="pass"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input
                size="large"
                placeholder="请输入密码：123456"
                type="password"
                prefix={<LockOutlined />}
              />
            </Item>
            <Item>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Checkbox
                  checked={isRemember}
                  onChange={(e) => setRemember(e.target.checked)}
                >
                  记住邮箱
                </Checkbox>
                <a>忘记密码</a>
              </div>
            </Item>
            <Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
              >
                登陆
              </Button>
            </Item>
          </Form>
        </TabPane>
        <TabPane tab="微信登陆" key="2">
          <Form className="login-form">
            <Item style={{ textAlign: 'center' }}>
              <Image src={img_login_url} />
            </Item>
          </Form>
        </TabPane>
      </Tabs>
      <div className="message">
        Copyright <CopyrightOutlined /> 2020 BAR团队出品
      </div>
    </div>
  );
};

export default Login;
