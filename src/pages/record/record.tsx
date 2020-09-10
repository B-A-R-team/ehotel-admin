import React, { FC, useState } from 'react';
import { Table, Button, Input, Spin } from 'antd';

import './record.less';
import RecordSearch from './record-search/record-search';
import RecordCard from './record-card/record-card';
import useSelectedRows from '../../hooks/useSelectedRows';
import useInfoWrapper from '../../hooks/useInfoWrapper';
import useRequest from '../../hooks/useRequest';
import getQuery from '../../utils/getQuery';

export interface IRecord {
  key: string;
  time: string | Date;
  room: string;
  name: string;
  phone: string;
  coupon: string | number;
  price: string | number;
  status: string;
}

const data = [
  {
    key: '2638ac4b9a894f514fd1',
    id: '2638ac4b9a894f514fd1',
    time: '2020/08/23 20:39:38',
    room: '大床房',
    name: '小王',
    phone: '15915915915',
    coupon: 0,
    price: 100,
    status: '待入住',
  },
  {
    key: '5f42638ac4b9a4894f5fd2',
    id: '5f42638ac4b9a4894f5fd2',
    time: '2020/08/23 20:39:38',
    room: '标准房',
    name: '忽必烈',
    phone: '15915915915',
    coupon: 0,
    price: 100,
    status: '待入住',
  },
  {
    key: '5f42638ac4b9a48f514fd3',
    id: '5f42638ac4b9a48f514fd3',
    time: '2020/08/23 20:39:38',
    room: '大床房',
    name: '孙悟空',
    phone: '15915915915',
    coupon: 0,
    price: 100,
    status: '待入住',
  },
  {
    key: '5f42638ac4a4894f514fd4',
    id: '5f42638ac4a4894f514fd4',
    time: '2020/08/23 20:39:38',
    room: '三人房',
    name: '雷神',
    phone: '15915915915',
    coupon: 0,
    price: 100,
    status: '待入住',
  },
  {
    key: '5f42638ac4aa894f514fd5',
    id: '5f42638ac4aa894f514fd5',
    time: '2020/08/23 20:39:38',
    room: '总统房',
    name: '李世明',
    phone: '15915915915',
    coupon: 0,
    price: 100,
    status: '待入住',
  },
  {
    key: '42638ac4b9aa4894f51fd6',
    id: '42638ac4b9aa4894f51fd6',
    time: '2020/08/23 20:39:38',
    room: '观景房',
    name: '陆游',
    phone: '15915915915',
    coupon: 0,
    price: 100,
    status: '待入住',
  },
  {
    key: '5f42638acb9aa4894f5f7d',
    id: '5f42638acb9aa4894f5f7d',
    time: '2020/08/23 20:39:38',
    room: '标准房',
    name: '刘邦',
    phone: '15915915915',
    coupon: 0,
    price: 100,
    status: '待入住',
  },
  {
    key: '5f4638ac4b94894f514f8d',
    id: '5f4638ac4b94894f514f8d',
    time: '2020/08/23 20:39:38',
    room: '古楼主题房',
    name: '李煜',
    phone: '15915915915',
    coupon: 0,
    price: 100,
    status: '待入住',
  },
  {
    key: '5f2638c4b9aa489f514f9d',
    id: '5f2638c4b9aa489f514f9d',
    time: '2020/08/23 20:39:38',
    room: '古典套房',
    name: '汉高祖',
    phone: '15915915915',
    coupon: 0,
    price: 100,
    status: '待入住',
  },
  {
    key: '5f42638ac4b9aa494f540fd',
    id: '5f42638ac4b9aa494f540fd',
    time: '2020/08/23 20:39:38',
    room: '家庭房',
    name: '乔布斯',
    phone: '15915915915',
    coupon: 0,
    price: 100,
    status: '待入住',
  },
  {
    key: '5f2638ac4b9aa894f5141f',
    id: '5f2638ac4b9aa894f5141f',
    time: '2020/08/23 20:39:38',
    room: '未来主题房',
    name: '机器人',
    phone: '15915915915',
    coupon: 0,
    price: 100,
    status: '待入住',
  },
  {
    key: '5f2638a4b9aa1494f514fd',
    id: '5f2638a4b9aa1494f514fd',
    time: '2020/08/23 20:39:38',
    room: '大床房',
    name: '李小狼',
    phone: '15915915915',
    coupon: 0,
    price: 100,
    status: '待入住',
  },
];

const Record: FC = () => {
  const [tableData, setTableData] = useState(data);
  const [selectedKeys, selectedRows, getSelectRows] = useSelectedRows([]);
  const { show, open, close, wrapperInfo, modifyInfoItem } = useInfoWrapper<
    IRecord
  >({
    visible: false,
    info: null,
  });
  const [loading, startLoading] = useRequest();

  const query = getQuery('s', /^[0-9a-z]{20}$/);

  const columns = [
    {
      title: '订单编号',
      dataIndex: 'key',
      ellipsis: true,
    },
    {
      title: '房间',
      dataIndex: 'room',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: '入住人',
      dataIndex: 'name',
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
    },
    {
      title: '支付价格',
      dataIndex: 'price',
    },
    {
      title: '下单时间',
      dataIndex: 'time',
      ellipsis: true,
    },
    {
      title: '订单状态',
      dataIndex: 'status',
    },
    {
      title: '操作',
      render: (_: any, record: IRecord) => (
        <Button type="primary" ghost onClick={() => open(record)}>
          详情
        </Button>
      ),
    },
  ];

  return (
    <div className="record">
      <RecordSearch
        selectedKeys={selectedKeys}
        changeTable={setTableData}
        tableData={tableData}
        startLoading={startLoading}
        searchData={{ id: query, phone: '', state: '' }}
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
      <RecordCard
        visible={show}
        info={wrapperInfo}
        modifyItem={modifyInfoItem}
        startLoading={startLoading}
        onClose={() => close()}
      />
    </div>
  );
};

export default Record;
