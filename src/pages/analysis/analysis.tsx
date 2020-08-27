import React, { useRef, useEffect, useState, useCallback } from 'react';
import './analysis.less';
import { Row, Col, Card } from 'antd';
import FlowChart from '../../components/flow-chart/flow-chart';
import DealChart from '../../components/deal-chart/deal-chart';
import GrowthRate from '../../components/growth-rate/growth-rate';
import HotRoom from '../../components/hot-room/hot-room';

const headCardConfig = {
  span: 24,
  sm: {
    span: 12,
  },
  xl: {
    span: 6,
  },
};

const Analysis = () => {
  return (
    <div className="analysis">
      <Row justify="space-between" gutter={[16, 16]}>
        <Col {...headCardConfig}>
          <Card className="als-card" bordered={false}>
            <p className="als-card-title">总销售额</p>
            <p className="als-card-val">￥126,560</p>
            <GrowthRate height={80} />
            <p className="als-card-footer">日销售额 1,234</p>
          </Card>
        </Col>
        <Col {...headCardConfig}>
          <Card className="als-card" bordered={false}>
            <p className="als-card-title">客流量</p>
            <p className="als-card-val">8,845</p>
            <FlowChart />
            <p className="als-card-footer">日客流量 1,234</p>
          </Card>
        </Col>
        <Col {...headCardConfig}>
          <Card className="als-card" bordered={false}>
            <p className="als-card-title">交易笔数</p>
            <p className="als-card-val">1,024</p>
            <DealChart />
            <p className="als-card-footer">日交易 134</p>
          </Card>
        </Col>
        <Col {...headCardConfig}>
          <Card className="als-card" bordered={false}>
            <p className="als-card-title">热门房间</p>
            <HotRoom />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Analysis;
