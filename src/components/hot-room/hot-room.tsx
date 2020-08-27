import React from 'react';
import { WordCloud } from '@ant-design/charts';

const data = [
  {
    word: '大床房',
    weight: 10,
    id: 1,
  },
  {
    word: '标准房',
    weight: 11,
    id: 2,
  },
  {
    word: '观景房',
    weight: 5,
    id: 3,
  },
  {
    word: '家庭房',
    weight: 3,
    id: 4,
  },
  {
    word: '五人房',
    weight: 4,
    id: 5,
  },
  {
    word: '总统房',
    weight: 1,
    id: 6,
  },
  {
    word: '畅想房',
    weight: 2,
    id: 7,
  },
  {
    word: '超级电竞房',
    weight: 14,
    id: 8,
  },
  {
    word: '超级无敌电竞房',
    weight: 1,
    id: 9,
  },
];

const HotRoom = () => {
  const config = {
    height: 130,
    data,
    forceFit: true,
    wordStyle: {
      fontSize: [30, 100] as [number, number],
      gridSize: 8,
    },
  };

  return (
    <div style={{ padding: 10 }}>
      <WordCloud {...config} shape="square" />
    </div>
  );
};
export default HotRoom;
