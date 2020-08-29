import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import Admin from './pages/admin/Admin';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Admin />
  </ConfigProvider>,

  document.getElementById('root')
);
