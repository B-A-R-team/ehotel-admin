import React, { useState } from 'react';
import VipCard from './vip-card/vip-card';
import './vip.less';
import { IVipInfo } from './vip-card/vip-card';
import VipSearch from './vip-search/vip-search';
import { Spin } from 'antd';
import useRequest from '../../hooks/useRequest';

const data: IVipInfo[] = [
  {
    name: 'xmy',
    avatar_url:
      'https://i2.hdslb.com/bfs/face/fe80011baeb9a12706426bdbf39abd9b4b95518d.jpg@87w_88h_1c_100q.webp',
    birthday: new Date().toLocaleDateString(),
    intergal: 20,
  },
  {
    name: 'xmy',
    avatar_url:
      'https://i2.hdslb.com/bfs/face/fe80011baeb9a12706426bdbf39abd9b4b95518d.jpg@87w_88h_1c_100q.webp',
    birthday: new Date().toLocaleDateString(),
    intergal: 20,
  },
  {
    name: 'xmy',
    avatar_url:
      'https://i2.hdslb.com/bfs/face/fe80011baeb9a12706426bdbf39abd9b4b95518d.jpg@87w_88h_1c_100q.webp',
    birthday: new Date().toLocaleDateString(),
    intergal: 20,
  },
  {
    name: 'xmy',
    avatar_url:
      'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    birthday: new Date().toLocaleDateString(),
    intergal: 20,
  },
  {
    name: 'xmy',
    avatar_url:
      'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    birthday: new Date().toLocaleDateString(),
    intergal: 20,
  },
  {
    name: 'xmy',
    avatar_url:
      'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    birthday: new Date().toLocaleDateString(),
    intergal: 20,
  },
  {
    name: 'xmy',
    avatar_url:
      'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    birthday: new Date().toLocaleDateString(),
    intergal: 20,
  },
  {
    name: 'xmy',
    avatar_url:
      'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    birthday: new Date().toLocaleDateString(),
    intergal: 20,
  },
  {
    name: 'xmy',
    avatar_url:
      'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    birthday: new Date().toLocaleDateString(),
    intergal: 20,
  },
];

const Vip = () => {
  const [loading] = useRequest();
  const [searchInfo, setSearchInfo] = useState('');

  return (
    <div className="vip-container">
      <VipSearch info={searchInfo} setInfo={setSearchInfo} />
      <Spin spinning={loading}>
        <div className="vip-list">
          {data.map((item, index) => (
            <VipCard info={item} key={index} />
          ))}
        </div>
      </Spin>
    </div>
  );
};

export default Vip;
