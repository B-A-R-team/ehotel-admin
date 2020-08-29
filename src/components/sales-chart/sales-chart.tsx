import React, { FC } from 'react';
import { Column } from '@ant-design/charts';

const data = [
  {
    mouth: '1月',
    number: 400,
  },
  {
    mouth: '2月',
    number: 387,
  },
  {
    mouth: '3月',
    number: 645,
  },
  {
    mouth: '4月',
    number: 355,
  },
  {
    mouth: '5月',
    number: 550,
  },
  {
    mouth: '6月',
    number: 300,
  },
  {
    mouth: '7月',
    number: 340,
  },
  {
    mouth: '8月',
    number: 450,
  },
  {
    mouth: '9月',
    number: 432,
  },
  {
    mouth: '10月',
    number: 399,
  },
];

export interface ISalesChartProps {
  size?: 'normal' | 'small';
  children?: React.ReactNode;
}

const SalesChart: FC<ISalesChartProps> = ({
  size = 'normal',
  children,
}: ISalesChartProps) => {
  const configVariant: { [index: string]: object } = {
    normal: {
      height: 300,
      title: {
        visible: true,
        text: '销售额统计',
      },
      color: '#58afff',
      forceFit: true,
      padding: 'auto',
      data,
      xField: 'mouth',
      yField: 'number',
      xAxis: {
        title: {
          visible: false,
        },
      },
      yAxis: {
        title: {
          visible: false,
        },
      },
    },
    small: {
      height: 80,
      title: {
        visible: false,
        text: '基础柱状图',
      },
      color: '#58afff',
      forceFit: true,
      padding: 'auto',
      data,
      xField: 'mouth',
      yField: 'number',
      xAxis: {
        visible: false,
      },
      yAxis: {
        visible: false,
      },
    },
  };

  return (
    <Column
      {...configVariant[size]}
      tooltip={{
        formatter: (mouth, number) => ({ name: '月销售额', value: number }),
      }}
    />
  );
};
export default SalesChart;
