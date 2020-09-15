import React from 'react';
import './analysis.less';
import { Row, Col, Card, Skeleton } from 'antd';
import FlowChart from './flow-chart/flow-chart';
import DealChart from './deal-chart/deal-chart';
import GrowthRate from './growth-rate/growth-rate';
import HotRoom from './hot-room/hot-room';
import CentralChart from './central-chart/central-chart';
import useRequest from '../../hooks/useRequest';
import VipChart from './vip-chart/vip-chart';

// 配置顶部卡片在不同屏幕大小下的比例
const headCardConfig = {
  span: 24,
  sm: {
    span: 12,
  },
  xl: {
    span: 6,
  },
};

// 配置中部卡片在不同屏幕大小下的比例
const centerCardConfig = {
  central: {
    span: 24,
    sm: {
      span: 12,
    },
    xl: {
      span: 18,
    },
  },
  side: {
    span: 24,
    sm: {
      span: 12,
    },
    xl: {
      span: 6,
    },
  },
};

const Analysis = () => {
  const [loading] = useRequest();

  return (
    <div className="analysis">
      <Row justify="space-between" gutter={[16, 16]}>
        <Col {...headCardConfig}>
          <Card className="als-card" bordered={false}>
            <p className="als-card-title">总销售额</p>
            <Skeleton loading={loading}>
              <p className="als-card-val">￥{'126,560'}</p>
              <GrowthRate height={80} />
              <p className="als-card-footer">日销售额 {'1,234'}</p>
            </Skeleton>
          </Card>
        </Col>
        <Col {...headCardConfig}>
          <Card className="als-card" bordered={false}>
            <p className="als-card-title">客流量</p>{' '}
            <Skeleton loading={loading}>
              <p className="als-card-val">{'8,845'}</p>
              <FlowChart size="small" />
              <p className="als-card-footer">日客流量 {'1,234'}</p>
            </Skeleton>
          </Card>
        </Col>
        <Col {...headCardConfig}>
          <Card className="als-card" bordered={false}>
            <p className="als-card-title">交易笔数</p>
            <Skeleton loading={loading}>
              <p className="als-card-val">{'1,024'}</p>
              <DealChart size="small" />
              <p className="als-card-footer">日交易 {'134'}</p>
            </Skeleton>
          </Card>
        </Col>
        <Col {...headCardConfig}>
          <Card className="als-card" bordered={false}>
            <p className="als-card-title">热门房间</p>
            <Skeleton loading={loading}>
              <HotRoom />
            </Skeleton>
          </Card>
        </Col>
      </Row>
      <Row gutter={[18, 18]}>
        <Col {...centerCardConfig['central']}>
          <CentralChart loading={loading} />
        </Col>
        <Col {...centerCardConfig['side']}>
          <VipChart loading={loading} />
        </Col>
      </Row>
    </div>
  );
};
export default Analysis;
