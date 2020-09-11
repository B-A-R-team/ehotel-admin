import React from 'react';
import { Row, Col, Input, Select, Button, Form, Modal, List } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';

const { Item } = Form;

export interface IVipSearchProps {
  info: string;
  setInfo: React.Dispatch<React.SetStateAction<string>>;
}

const VipSearch = ({ info, setInfo }: IVipSearchProps) => {
  const birthdayToday = () => {
    const data = [
      {
        name: 'xmy',
        phone: '13213213213',
        avatar_url:
          'https://i2.hdslb.com/bfs/face/fe80011baeb9a12706426bdbf39abd9b4b95518d.jpg@87w_88h_1c_100q.webp',
      },
      {
        name: 'xmy',
        phone: '13213213213',
        avatar_url:
          'https://i2.hdslb.com/bfs/face/fe80011baeb9a12706426bdbf39abd9b4b95518d.jpg@87w_88h_1c_100q.webp',
      },
      {
        name: 'xmy',
        phone: '13213213213',
        avatar_url:
          'https://i2.hdslb.com/bfs/face/fe80011baeb9a12706426bdbf39abd9b4b95518d.jpg@87w_88h_1c_100q.webp',
      },
    ];
    Modal.info({
      title: '今日过生日的VIP',
      content: (
        <List>
          {data.map((item, index) => (
            <List.Item
              key={index}
              style={{ paddingRight: '1rem', boxSizing: 'border-box' }}
            >
              <div>
                <Avatar src={item['avatar_url']} />
              </div>
              <div>
                <span>姓名：</span>
                <span>{item['name']}</span>
              </div>
              <div>
                <span>电话：</span>
                <span>{item['phone']}</span>
              </div>
            </List.Item>
          ))}
        </List>
      ),
    });
  };

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
      <Col>
        <Button onClick={birthdayToday}>查看今日过生日的VIP</Button>
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
