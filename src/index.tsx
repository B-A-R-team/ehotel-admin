import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import Admin from './pages/admin';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <HashRouter>
      <Admin />
    </HashRouter>
  </ConfigProvider>,

  document.getElementById('root')
);
