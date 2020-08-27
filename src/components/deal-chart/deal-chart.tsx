import React from 'react';
import { Column } from '@ant-design/charts';

const data = [
  {
    date: '2020-01-01',
    number: 38,
  },
  {
    date: '2020-01-02',
    number: 52,
  },
  {
    date: '2020-01-03',
    number: 61,
  },
  {
    date: '2020-01-04',
    number: 145,
  },
  {
    date: '2020-01-05',
    number: 48,
  },
  {
    date: '2020-01-06',
    number: 38,
  },
  {
    date: '2020-01-07',
    number: 100,
  },
];

const DealChart = () => {
  const config = {
    height: 80,
    title: {
      visible: false,
      text: '基础柱状图',
    },
    color: '#1da57a',
    forceFit: true,
    padding: 'auto',
    data,
    xField: 'date',
    yField: 'number',
    xAxis: {
      visible: false,
    },
    yAxis: {
      visible: false,
    },
  };

  return <Column {...config} />;
};
export default DealChart;
