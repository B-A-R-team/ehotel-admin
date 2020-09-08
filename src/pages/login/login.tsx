import React, { useEffect, useState } from 'react';
import { Tabs, Form, Input, Button, Checkbox, Image } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  CopyrightOutlined,
} from '@ant-design/icons';
import './login.less';
import useRequest from '../../hooks/useRequest';
import { useHistory } from 'react-router-dom';
import img_login_url from './wxlogin.png';

const { TabPane } = Tabs;
const { Item } = Form;

/**
 * 登陆信息
 */
function useLoginInfo(): [
  { email: string; pass: string },
  React.Dispatch<React.SetStateAction<string>>,
  React.Dispatch<React.SetStateAction<string>>
] {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  return [{ email, pass }, setEmail, setPass];
}

const Login = () => {
  const h = useHistory();
  const [isRemember, setRemember] = useState(false);
  const [loginInfo, setEmail, setPass] = useLoginInfo();
  const [{ data: loginData, request }] = useRequest<{
    code: number;
    data: any;
  }>(
    {
      url: 'https://www.barteam.cn:1239/users/login',
      method: 'post',
      data: loginInfo,
    },
    false
  );

  /**
   * 登陆
   */
  const doLogin = () => {
    request();
  };

  // 保存token
  useEffect(() => {
    const token = loginData['data'] ? loginData['data']['token'] : '';
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('loginname', loginData['data']['user']['nickname']);
      h.push('/');
    }
  }, [loginData]);

  // 获取localStorage中的email
  useEffect(() => {
    const email = localStorage.getItem('remember_email');
    if (email) {
      setEmail(email as string);
      setRemember(true);
    }
  }, []);

  // 保存email到localStorage
  useEffect(() => {
    if (isRemember) {
      localStorage.setItem('remember_email', loginInfo['email']);
    } else {
      localStorage.removeItem('remember_email');
    }
  }, [isRemember]);

  return (
    <div className="login">
      <div className="title">BAR酒店后台管理</div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="邮箱密码登陆" key="1">
          <Form className="login-form">
            <Item>
              <Input
                size="large"
                placeholder="请输入邮箱：123456@email.com"
                type="email"
                prefix={<UserOutlined />}
                value={loginInfo['email']}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Item>
            <Item>
              <Input
                size="large"
                placeholder="请输入密码：123456"
                type="password"
                prefix={<LockOutlined />}
                value={loginInfo['pass']}
                onChange={(e) => setPass(e.target.value)}
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
                style={{ width: '100%' }}
                onClick={doLogin}
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
