/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Spin, Table, Avatar, Tag } from 'antd';
import useSelectedRows from '../../hooks/useSelectedRows';
import UserSearch from './user-search/user-search';
import './user.less';
import { reqUsers } from '../../api/index';

export interface IUser {
  avatar_url: string;
  nickname: string;
  integral: number | string;
  paid_balance: number | string;
  isVip: boolean;
  id: string | number;
  key: string | number;
}

const data = [
  {
    avatar_url: '/logo192.png',
    nickname: '200OK',
    integral: 0,
    paid_balance: 0,
    isVip: false,
    id: 1,
    key: 1,
  },
];

export default function User() {
  const columns = [
    {
      title: '头像',
      dataIndex: 'avatar_url',
      key: 'avatar_url',
      render: (val: string) => <Avatar src={val}></Avatar>,
    },
    {
      title: '用户名',
      key: 'nickname',
      dataIndex: 'nickname',
    },
    {
      title: '积分',
      dataIndex: 'integral',
      key: 'integral',
    },
    {
      title: '余额',
      dataIndex: 'paid_balance',
      key: 'paid_balance',
    },
    {
      width: '18vw',
      title: '身份',
      dataIndex: 'isVip',
      key: 'isVip',
      render: (isVip: boolean, user: IUser) => {
        return isVip ? <Tag color="gold">会 员</Tag> : <Tag>普通用户</Tag>;
      },
    },
    {
      title: '订单',
      dataIndex: 'id',
      render: (id: string) => <a href={`#/record/${id}`}>查看订单</a>,
    },
  ];

  const [tableData, setTableData] = useState(data);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    const res = await reqUsers();

    setLoading(false);

    res['data'].forEach((user: IUser) => {
      if (!user['avatar_url']) {
        user['avatar_url'] = '/logo192.png';
      }
      user['key'] = user['id'];
    });
    setTableData(res['data']);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="user">
      <UserSearch changeTable={setTableData} setLoading={setLoading} />
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={{ pageSize: 7 }}
        />
      </Spin>
    </div>
  );
}
