/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from 'react';
import { Table, Button, Spin } from 'antd';

import './record.less';
import RecordSearch from './record-search/record-search';
import RecordCard from './record-card/record-card';
import useSelectedRows from '../../hooks/useSelectedRows';
import useInfoWrapper from '../../hooks/useInfoWrapper';
import useRequest from '../../hooks/useRequest';
import getQuery from '../../utils/getQuery';
import { reqAllRecords } from '../../api/index';

export interface IRecord {
  id: string | number;
  create_at: string | Date;
  room: string;
  name: string;
  phone: string;
  coupon: string | number;
  price: string | number;
  status: string;
}

export enum RecordStatus {
  waiting = '待入住',
  finish = '已完成',
  unpaid = '待付款',
}

const data: IRecord[] = [];

const Record: FC = () => {
  const [tableData, setTableData] = useState(data);
  const { show, open, close, wrapperInfo, modifyInfoItem } = useInfoWrapper<
    IRecord
  >({
    visible: false,
    info: null,
  });
  const [loading, setLoading] = useState(true);

  const query = getQuery('s', /^[0-9a-z]{20}$/);

  const columns = [
    {
      title: '订单编号',
      dataIndex: 'id',
    },
    {
      title: '房间',
      dataIndex: 'room',
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
      dataIndex: 'create_at',
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

  const loadRecords = async () => {
    const records = await reqAllRecords();
    setLoading(false);
    setTableData(records);
  };

  useEffect(() => {
    loadRecords();
  }, []);

  return (
    <div className="record">
      <RecordSearch
        changeTable={setTableData}
        tableData={tableData}
        setLoading={setLoading}
        searchData={{ id: query, phone: '', state: '' }}
      />
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={{ pageSize: 7 }}
        />
      </Spin>
      <RecordCard
        visible={show}
        info={wrapperInfo}
        modifyItem={modifyInfoItem}
        setLoading={setLoading}
        onClose={() => close()}
      />
    </div>
  );
};

export default Record;
