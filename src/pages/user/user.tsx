/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Spin, Table, Avatar, Tag } from 'antd';
import useRequest from '../../hooks/useRequest';
import useSelectedRows from '../../hooks/useSelectedRows';
import UserSearch from './user-search/user-search';
import './user.less';

export interface IUser {
  avatar_url: string;
  nickname: string;
  integral: number | string;
  price: number | string;
  isVip: boolean;
  key: string;
}

const data = [
  {
    avatar_url:
      'https://i2.hdslb.com/bfs/face/fe80011baeb9a12706426bdbf39abd9b4b95518d.jpg@87w_88h_1c_100q.webp',
    nickname: '200OK',
    integral: 0,
    price: 0,
    isVip: false,
    key: '5f1bca73f36ef83b7c46b631',
  },
  {
    avatar_url:
      'https://i2.hdslb.com/bfs/face/bc5ca101313d4db223c395d64779e76eb3482d60.jpg@80w_80h.jpg',
    nickname: '老番茄',
    integral: 0,
    price: 0,
    isVip: true,
    key: '5f1bca73f36ef83b7c46b632',
  },
  {
    avatar_url:
      'https://i0.hdslb.com/bfs/face/ddf4a7f08169593255c940f62bce7c1f11d795e2.jpg@80w_80h.jpg',
    nickname: '十二礼',
    integral: 0,
    price: 0,
    isVip: false,
    key: '5f1bca73f36ef83b7c46b633',
  },
  {
    avatar_url:
      'https://i1.hdslb.com/bfs/face/834eb0de8d2f470bf03e4ea92831b14f3824c863.jpg@80w_80h.jpg',
    nickname: '小潮院长',
    integral: 0,
    price: 0,
    isVip: false,
    key: '5f1bca73f36ef83b7c46b634',
  },
  {
    avatar_url:
      'https://i2.hdslb.com/bfs/face/fe80011baeb9a12706426bdbf39abd9b4b95518d.jpg@87w_88h_1c_100q.webp',
    nickname: '200OK',
    integral: 0,
    price: 0,
    isVip: false,
    key: '5f1bca73f36ef83b7c46b635',
  },
  {
    avatar_url:
      'https://i2.hdslb.com/bfs/face/fe80011baeb9a12706426bdbf39abd9b4b95518d.jpg@87w_88h_1c_100q.webp',
    nickname: '200OK',
    integral: 0,
    price: 0,
    isVip: false,
    key: '5f1bca73f36ef83b7c46b636',
  },
  {
    avatar_url:
      'https://i2.hdslb.com/bfs/face/fe80011baeb9a12706426bdbf39abd9b4b95518d.jpg@87w_88h_1c_100q.webp',
    nickname: '200OK',
    integral: 0,
    price: 0,
    isVip: false,
    key: '5f1bca73f36ef83b7c46b637',
  },
  {
    avatar_url:
      'https://i2.hdslb.com/bfs/face/fe80011baeb9a12706426bdbf39abd9b4b95518d.jpg@87w_88h_1c_100q.webp',
    nickname: '200OK',
    integral: 0,
    price: 0,
    isVip: false,
    key: '5f1bca73f36ef83b7c46b638',
  },
];

export default function User() {
  const columns = [
    {
      title: '头像',
      dataIndex: 'avatar_url',
      render: (val: string) => <Avatar src={val}></Avatar>,
    },
    {
      title: '用户名',
      dataIndex: 'nickname',
    },
    {
      title: '积分',
      dataIndex: 'integral',
    },
    {
      title: '余额',
      dataIndex: 'price',
    },
    {
      width: '18vw',
      title: '身份',
      dataIndex: 'isVip',
      render: (isVip: boolean, user: IUser) => {
        return isVip ? (
          <Tag color="gold">会 员</Tag>
        ) : (
          <>
            <Tag>普通用户</Tag>
            <a
              className="to-vip"
              onClick={() => {
                startLoading();
                const updateData = data.map((item) => {
                  if (item['key'] === user['key']) {
                    item['isVip'] = true;
                  }
                  return item;
                });
                setTableData(updateData);
              }}
            >
              成为会员
            </a>
          </>
        );
      },
    },
    {
      title: '订单',
      dataIndex: 'key',
      render: (key: string) => <a href={`#/record/${key}`}>查看订单</a>,
    },
  ];

  const [tableData, setTableData] = useState(data);
  const [loading, startLoading] = useRequest();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedKeys, selectedRows, getSelectRows] = useSelectedRows([]);

  return (
    <div className="user">
      <UserSearch
        selectedKeys={selectedKeys}
        changeTable={setTableData}
        tableData={tableData}
        startLoading={startLoading}
      />
      <Spin spinning={loading}>
        <Table
          rowSelection={{
            type: 'checkbox',
            onChange: getSelectRows,
          }}
          columns={columns}
          dataSource={tableData}
          pagination={{ pageSize: 7 }}
        />
      </Spin>
    </div>
  );
}
