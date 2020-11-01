import React from 'react';
import { Row, Col, Input, Button, Form, Modal, List } from 'antd';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export interface IVipSearchProps {
  info: string;
  setInfo: React.Dispatch<React.SetStateAction<string>>;
}

const VipSearch = ({ info, setInfo }: IVipSearchProps) => {
  return (
    <Row style={style}>
      <Col>
        <Row>
          <Col style={{ marginRight: '1em' }}>
            <Row>
              <Col style={{ height: '32px', lineHeight: '32px' }}>姓名：</Col>
              <Col>
                <Input
                  placeholder="请输入姓名"
                  value={info}
                  onChange={(e) => setInfo(e.target.value)}
                />
              </Col>
            </Row>
          </Col>
          <Col>
            <Button type="primary">搜索</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const style: React.CSSProperties = {
  backgroundColor: '#fff',
  marginBottom: '1rem',
  display: 'flex',
  paddingTop: '0.7em',
  paddingBottom: '0.7em',
  paddingLeft: '1em',
  paddingRight: '1em',
  justifyContent: 'space-between',
};

export default VipSearch;
