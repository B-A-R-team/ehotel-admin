/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Card, Typography, Tag, Divider, Button, Skeleton } from 'antd';
import {
  LeftOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';

import './activeDetail.less';
import { reqAcitveById } from '../../../api/index';
import { IActive, activeStatus } from '../active';

const { Title, Paragraph } = Typography;

const data: IActive = {
  id: 1,
  title: '《Monster Hunter World: Iceborne》最后的"开发者日记"',
  image_url: 'public/upload/1602774785767.png',
  desc:
    '【不容错过】"开发者日记 The Final Stand"将于8月28日晚上8时直播！《Monster Hunter World: Iceborne》最后的"开发者日记"将于8月28日（五）20:00开始播放！届时将会公开"免费大型更新第5弹"中登场的"复活怪物"，你能够猜中是哪只怪物吗?',
  time: '2020-01-01',
  status: 'in_progress',
};

export default function ActiveDetail(props: any) {
  const acitveId = props.match.params.id;

  const [loading, setLoading] = useState(true);
  const [activeData, setActiveData] = useState(data);

  const loadActive = async () => {
    const res = await reqAcitveById(acitveId);

    const start = new Date(res['data']['start_time']).getTime();
    const end = new Date(res['data']['end_time']).getTime();
    const now = Date.now();

    let status: activeStatus;
    if (start <= now && end >= now) {
      status = 'in_progress';
    } else if (start >= now) {
      status = 'todo';
    } else {
      status = 'done';
    }

    const active: IActive = {
      id: res['data']['id'],
      title: res['data']['topic'],
      image_url: res['data']['img_url'],
      desc: res['data']['desc'],
      time: res['data']['start_time'] + ' - ' + res['data']['end_time'],
      detail: res['data']['detail'],
      status,
    };

    setActiveData(active);
    setLoading(false);
  };

  const title = (
    <span>
      <a onClick={(e) => e.preventDefault()}>
        <LeftOutlined
          onClick={() => {
            props.history.goBack();
          }}
        />
      </a>
      <span>&nbsp;活动详情</span>
    </span>
  );

  useEffect(() => {
    if (!props.match.params.id) {
      props.hisroty.replace('/avtive');
    }
    loadActive();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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

  return (
    <Card
      className="card"
      title={title}
      extra={
        <Button
          onClick={() => {
            props.history.push('/active/update/' + activeData.id);
          }}
          type="primary"
        >
          编辑
        </Button>
      }
    >
      <Typography>
        <Skeleton loading={loading}>
          <Title level={3}>{activeData.title}</Title>
          <div>
            {tagVariant[activeData.status]}
            <span>时间：{activeData.time}</span>
          </div>
        </Skeleton>

        <Divider className="my-divider" />

        <Paragraph>
          <Skeleton loading={loading}>
            <Title level={4} className="my-title">
              活动简介
            </Title>
            <blockquote>{activeData.desc}</blockquote>
          </Skeleton>
        </Paragraph>
        <Paragraph>
          <Skeleton loading={loading}>
            <Title level={4} className="my-title">
              活动详情
            </Title>
            <div
              dangerouslySetInnerHTML={{ __html: activeData.detail as string }}
            ></div>
          </Skeleton>
        </Paragraph>
      </Typography>
    </Card>
  );
}
