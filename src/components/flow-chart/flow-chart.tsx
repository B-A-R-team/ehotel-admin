import React, { FC, useState, useEffect } from 'react';
import { Area } from '@ant-design/charts';

const data = [
  {
    date: '2020-01-01',
    flow: 2,
  },
  {
    date: '2020-01-02',
    flow: 12,
  },
  {
    date: '2020-01-03',
    flow: 4,
  },
  {
    date: '2020-01-04',
    flow: 10,
  },
  {
    date: '2020-01-05',
    flow: 15,
  },
  {
    date: '2020-01-06',
    flow: 5,
  },
  {
    date: '2020-01-07',
    flow: 16,
  },
];

const FlowChart: FC = () => {
  const config = {
    height: 80,
    title: {
      visible: false,
      text: '客流量统计',
    },
    data,
    xField: 'date',
    yField: 'flow',
    smooth: true,
    padding: 'auto',
    forceFit: true,
    color: '#9862e2',
    xAxis: {
      grid: {
        visible: false,
      },
      tickLine: {
        visible: false,
      },
      label: {
        visible: false,
      },
    },
    yAxis: {
      grid: {
        visible: false,
      },
      tickLine: {
        visible: false,
      },
      label: {
        visible: false,
      },
    },
  };

  return (
    <Area
      {...config}
      tooltip={{ formatter: (date, flow) => ({ name: '客流量', value: flow }) }}
    />
  );
};

export default FlowChart;
