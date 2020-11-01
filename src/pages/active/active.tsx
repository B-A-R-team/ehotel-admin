/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import './active.less';
import { Card, Image, Tag, Spin } from 'antd';
import {
  SyncOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { reqActiveList } from '../../api/index';

const { Meta } = Card;

export type activeStatus = 'todo' | 'in_progress' | 'done';
export interface IActive {
  id: number | string;
  title: string;
  image_url: string;
  desc: string;
  time: string;
  status: activeStatus;
  detail?: string;
}

const data: IActive[] = [
  {
    id: 1,
    title: '《Monster Hunter World: Iceborne》最后的"开发者日记"',
    image_url: 'public/upload/1602774785767.png',
    desc:
      '【不容错过】"开发者日记 The Final Stand"将于8月28日晚上8时直播！《Monster Hunter World: Iceborne》最后的"开发者日记"将于8月28日（五）20:00开始播放！届时将会公开"免费大型更新第5弹"中登场的"复活怪物"，你能够猜中是哪只怪物吗?',
    time: '2020-01-01',
    status: 'in_progress',
  },
];

// 根据status生成标签
const tagVariant: { [index: string]: React.ReactNode } = {
  todo: (
    <Tag icon={<ClockCircleOutlined />} color="cyan">
      未开始
    </Tag>
  ),
  in_progress: (
    <Tag icon={<SyncOutlined spin />} color="processing">
      进行中
    </Tag>
  ),
  done: (
    <Tag icon={<MinusCircleOutlined />} color="default">
      已结束
    </Tag>
  ),
};

const Active = () => {
  const [loading, setLoading] = useState(true);
  const [listData, setListData] = useState(data);
  const history = useHistory();

  const loadActive = async () => {
    const res = await reqActiveList();
    const actives: IActive[] = res['data'].map((active: any) => {
      const start = new Date(active['start_time']).getTime();
      const end = new Date(active['end_time']).getTime();
      const now = Date.now();
      let status: activeStatus;
      if (start <= now && end >= now) {
        status = 'in_progress';
      } else if (start >= now) {
        status = 'todo';
      } else {
        status = 'done';
      }

      return {
        id: active['id'],
        title: active['topic'],
        image_url: active['img_url'],
        desc: active['desc'],
        time: active['start_time'] + ' - ' + active['end_time'],
        status,
      };
    });
    setListData(actives);
    setLoading(false);
  };

  useEffect(() => {
    loadActive();
  }, []);

  return (
    <div className="active-page">
      <Spin spinning={loading}>
        <div className="active-card-row">
          <Card
            className="active-card-item add-active"
            onClick={() => {
              history.push('/active/add');
            }}
          >
            <PlusOutlined />
            <span>添加活动</span>
          </Card>
          {!loading &&
            listData.map((item, index) => (
              <Card
                className="active-card-item"
                key={index}
                cover={
                  <Image
                    // height={100}
                    style={{ paddingTop: '1rem', paddingBottom: 0,overflow:"hidden" }}
                    src={`https://www.barteam.cn:1239/${item['image_url']}`}
                  />
                }
              >
                <Meta
                  title={
                    <a
                      onClick={() => {
                        history.push(`/active/detail/${item['id']}`);
                      }}
                    >
                      {item['title']}
                    </a>
                  }
                  description={
                    <>
                      <a
                        onClick={() => {
                          history.push(`/active/detail/${item['id']}`);
                        }}
                      >
                        {item['desc']}
                      </a>
                      <div className="footer">
                        <span>{item['time']}</span>
                        <span>{tagVariant[item['status']]}</span>
                      </div>
                    </>
                  }
                />
              </Card>
            ))}
        </div>
      </Spin>
    </div>
  );
};
export default Active;
