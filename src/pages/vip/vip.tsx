import React, { useEffect, useState } from 'react';
import VipCard from './vip-card/vip-card';
import './vip.less';
import { IVipInfo } from './vip-card/vip-card';
import VipSearch from './vip-search/vip-search';
import { Spin } from 'antd';
import { reqVipList } from '../../api/index';

const data: IVipInfo[] = [
  {
    avatar_url: '/logo192.png',
    id: 1,
    nickname: '200ok',
    name: '',
    phone: '',
    integral: 0,
    paid_balance: 0,
  },
];

const Vip = () => {
  const [loading, setLoading] = useState(true);
  const [searchInfo, setSearchInfo] = useState('');
  const [listData, setListData] = useState(data);

  const loadVipList = async () => {
    setLoading(true);
    let { data } = await reqVipList();

    data.forEach((user: IVipInfo) => {
      if (!user['avatar_url']) {
        user['avatar_url'] = '/logo192.png';
      }
    });

    setListData(data);
    setLoading(false);
  };

  useEffect(() => {
    loadVipList();
  }, []);

  return (
    <div className="vip-container">
      <VipSearch info={searchInfo} setInfo={setSearchInfo} />
      <Spin spinning={loading}>
        <div className="vip-list">
          {listData.map((item, index) => (
            <VipCard info={item} key={index} reload={loadVipList} />
          ))}
        </div>
      </Spin>
    </div>
  );
};

export default Vip;
