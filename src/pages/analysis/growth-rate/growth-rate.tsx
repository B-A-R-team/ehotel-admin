import React, { FC } from 'react';
import { Row, Col } from 'antd';
import './growth-rate.less';
import { CaretUpFilled, CaretDownFilled } from '@ant-design/icons';

export interface IGrowthRateProps {
  height: number | string;
  children?: React.ReactNode;
}

const Up = () => <CaretUpFilled style={{ color: '#f5222d' }} />;
const Down = () => <CaretDownFilled style={{ color: '#52c41a' }} />;

const GrowthRate: FC<IGrowthRateProps> = ({
  height,
  children,
}: IGrowthRateProps) => {
  return (
    <Row className="growth" style={{ height }}>
      <Col className="growth-item">
        <p>
          <span>周增长：12%</span>
          <Up />
        </p>
      </Col>
      <Col className="growth-item">
        <p>
          <span>日增长：5%</span>
          <Down />
        </p>
      </Col>
    </Row>
  );
};
export default GrowthRate;
