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

import { reqRoomByTypeId, reqRoomType } from '../../../api'
import { PAGE_SIZE } from '../../../utils/constant'
import './myRoom.less'

export default function Room(props: any) {
 //解决使用usestate不能马上更新的问题
  let rooms:any =[]
  const [loading, setLoadibg] = useState(true)
  const [data, setData] = useState([{
    key: '',
    total: 0,
    rest: 0,
    introduction: '',
    tags: '',
    roomArea: '50',
    floor: '11'
  }])
  useEffect(() => {
    setData([])
    reqRoomType().then((roomType: any) => {
      const collatedRoomType = roomType.data.map((item: any) => {
        // console.log(item);
        item.tags = item.type_name
        item.key = item.id
        item.total = 10
        item.rest = 5
        item.roomArea = item.area
        item.floor = item.floor[0]
        delete item.type_name
        delete item.area
        return item
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
      rooms = collatedRoomType
      setData(collatedRoomType)
      rooms.forEach((item:any,index:number) => {
        reqRoomByTypeId(item.key).then((res:any) => {
          console.log(rooms);
          rooms[index].total = res.data.rooms.length
          rooms[index].rest = res.data.rooms.filter((item:any) => item.is_used === false).length
          setData(rooms)
        })
      })

    })
    setLoadibg(false)

  }, [])
  const columns = [
    {
      title: '序号',

      render: (text: any, item: any, index: any) => {
        return (<a>{index + 1}</a>)
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
      dataIndex: 'floor',
      key: 'floor',
      width: 120,
      render: (floor: string) => {
        return (
          <span>{floor} 层</span>
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
            defaultPageSize: PAGE_SIZE,
            total: data.length,
            showQuickJumper: true,
            onChange: (e) => { console.log(e); },
            position: ['bottomCenter']
          }}
        />

      </Card>
    </Card>

  );
}


