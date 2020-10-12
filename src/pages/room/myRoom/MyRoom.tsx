/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import {
  Card,
  Select,
  Button,
  Table,
  Tag,
  Space,
} from 'antd'

import { reqRoomType } from '../../../api'
import './myRoom.less'

export default function Room(props: any) {
  const [loading, setLoadibg] = useState(true)
  const [data, setData] = useState([{
    key: '',
    total: 0,
    rest: 0,
    introduction: '',
    tags: '',
  }])
  useEffect(() => {
    setData([])
    async function request() {
      const roomType = await reqRoomType()
      // console.log(roomType.data);
      const collatedRoomType = roomType.data.map((item: any) => {
        item.tags = item.type_name
        item.key = item.id
        item.total = 10
        item.rest = 5
        return item
      })
      // console.log(collatedRoomType);
      setData(collatedRoomType)
      setLoadibg(false)
    }
    request()
    // setTimeout(() => {
    //   const data = [
    //     {
    //       key: '1',
    //       total: 10,
    //       rest: 5,
    //       introduction: '大床',
    //       tags: '大床房',
    //       roomArea: '100',
    //       checkInArea: '80',
    //       roomFloor: '11',
    //     },
    //   ];
    //   setData(data)
    // }, 1000)

  }, [])
  const columns = [
    {
      title: '序号',

      render: (text: any, item: any, index: any) => {
        return (<a>{index}</a>)
      }
    },
    {
      title: '总数',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: '剩余',
      dataIndex: 'rest',
      key: 'rest',
    },
    {
      title: '房间面积',
      dataIndex: 'roomArea',
      key: 'roomArea',
      render: (text: any, item: any, index: any) => (<a>{text} ㎡</a>)

    },
    {
      title: '房间楼层',
      dataIndex: 'roomFloor',
      key: 'roomFloor',
      width: 120,
      render: (roomFloor: string) => {
        return (
          <span>{roomFloor} 层</span>
        )
      }
    },
    {
      title: '房间类型',
      key: 'tags',
      dataIndex: 'tags',
      render: (tag: any) => {
        let color
        if (tag.length <= 3) {
          color = 'geekblue'
        } else if (tag.length > 3 && tag.length <= 5) {
          color = 'green'
        } else {
          color = 'red'
        }
        return (
          <>
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          </>
        )
      },
    },

    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => {
        return (
          <Space size="middle">
            <a onClick={() => { props.history.push({ pathname: '/room/addOrUpdateRoom', query: { houseTypeId: record.key } }) }}>修改信息</a>
            <a onClick={() => { props.history.push('/room/detail/' + record.key) }}>查看详情</a>
          </Space>
        )
      },
    },
  ];
  const title = (
    <span>
      <Select
        defaultValue="bigBed"
      >
        <Select.Option value='bigBed'>大床房</Select.Option>
        <Select.Option value='clBed'>主题圆床房</Select.Option>
        <Select.Option value='lalala'>双人电影电竞圆床房</Select.Option>
      </Select>
      &nbsp;  &nbsp;  &nbsp;
      <Button type='primary' onClick={() => { }}>搜索</Button>
    </span>

  )
  const extra = (
    <>
      <Button type="primary" onClick={() => props.history.push('/room/addOrUpdateRoom')}>添加房型&房间</Button>
    </>
  )
  return (
    <Card className="card" title={(<span>房间管理</span>)}>
      <Card title={title} extra={extra}>
        <Table
          columns={columns as any}
          dataSource={data}
          loading={loading}
          bordered
          pagination={{
            defaultPageSize: 7,
            total: 4,
            showQuickJumper: true,
            onChange: (e) => { console.log(e); },
            position: ['bottomCenter']
          }}
        />

      </Card>
    </Card>

  );
}


