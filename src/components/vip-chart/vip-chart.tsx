import React, { FC } from 'react';
import { Pie } from '@ant-design/charts';
import { Card, Skeleton } from 'antd';
import './vip-chart.less';

export interface IVipChartProps {
  loading: boolean;
  children?: React.ReactNode;
}

const data = [
  {
    type: '15-20岁',
    value: 20,
  },
  {
    type: '20-25岁',
    value: 25,
  },
  {
    type: '25-35岁',
    value: 10,
  },
  {
    type: '35-50岁',
    value: 6,
  },
  {
    type: '50岁以上',
    value: 2,
  },
];

const VipChart: FC<IVipChartProps> = ({
  loading,
  children,
}: IVipChartProps) => {
  const config = {
    height: 300,
    forceFit: true,
    title: {
      visible: false,
      text: '会员年龄分布',
    },
    data,
    angleField: 'value',
    colorField: 'type',
    label: {
      visible: true,
      type: 'inner',
    },
    legend: {
      position: 'bottom-center' as
        | 'bottom-center'
        | 'left-top'
        | 'left-center'
        | 'left-bottom'
        | 'right-top'
        | 'right-center'
        | 'right-bottom'
        | 'top-left'
        | 'top-center'
        | 'top-right'
        | 'bottom-left'
        | 'bottom-right'
        | undefined,
    },
  };

  return (
    <Card title="会员年龄分布" className="vip" style={{ height: '100%' }}>
      <Skeleton loading={loading} paragraph={{ rows: 8 }}>
        <Pie {...config} />
      </Skeleton>
    </Card>
  );
};
export default VipChart;
