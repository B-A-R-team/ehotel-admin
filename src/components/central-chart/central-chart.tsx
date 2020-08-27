import React, { useState, FC } from 'react';
import { Card, Skeleton } from 'antd';
import FlowChart from '../flow-chart/flow-chart';
import SalesChart from '../sales-chart/sales-chart';
import './central-chart.less';

export interface ICentralChartProps {
  loading: boolean;
  children?: React.ReactNode;
}

const tabs = [
  { key: 'sales_volume', tab: '销售额' },
  { key: 'passenger_flow', tab: '客流量' },
];

const contents: { [index: string]: React.ReactNode } = {
  sales_volume: <SalesChart />,
  passenger_flow: <FlowChart />,
};

const CentralChart: FC<ICentralChartProps> = ({
  loading,
  children,
}: ICentralChartProps) => {
  const [currentTab, setCurrentTab] = useState('sales_volume');

  return (
    <Card
      className="sales"
      style={{ width: '100%' }}
      tabList={tabs}
      onTabChange={(key) => {
        setCurrentTab(key);
      }}
    >
      <Skeleton loading={loading} paragraph={{ rows: 8 }}>
        {contents[currentTab]}
      </Skeleton>
    </Card>
  );
};
export default CentralChart;
