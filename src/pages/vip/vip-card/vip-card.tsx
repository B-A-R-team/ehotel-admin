import React, { useState } from 'react';
import {
  Card,
  Skeleton,
  Avatar,
  Modal,
  Descriptions,
  Button,
  Form,
  Input,
} from 'antd';
import './vip-card.less';

const { Meta } = Card;

export interface IVipInfo {
  name: string;
  avatar_url: string;
  birthday: string;
  intergal: number | string;
}

// 生成VIP简介
const generatorDesc = (
  birthday: string,
  intergal: number | string
): React.ReactNode => {
  return (
    <div className="vip-desc">
      <div className="birthday">
        <span>生日：</span>
        <span>{birthday}</span>
      </div>
      <div className="intergal">
        <span>积分：</span>
        <span>{intergal}</span>
      </div>
    </div>
  );
};

const VipCard = ({ info }: { info: IVipInfo }) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <Card
        className="vip-card"
        style={{ display: 'inline-block' }}
        actions={[
          <div
            className="btn"
            onClick={() => {
              setShowDetail(true);
            }}
          >
            详情
          </div>,
          <div
            className="delete-btn btn"
            onClick={() => {
              Modal.confirm({
                title: '警告',
                content: '确认删除该记录？',
              });
            }}
          >
            删除
          </div>,
        ]}
      >
        <Skeleton loading={false} avatar active>
          <Meta
            avatar={<Avatar src={info['avatar_url']} />}
            title={info['name']}
            description={generatorDesc(info['birthday'], info['intergal'])}
          />
        </Skeleton>
      </Card>
      <VipDetail isShow={showDetail} close={() => setShowDetail(false)} />
    </>
  );
};

export const VipDetail = ({
  isShow,
  close,
}: {
  isShow: boolean;
  close: () => void;
}) => {
  const data = {
    name: 'xmy',
    phone: '13213213213',
    avatar_url:
      'https://i2.hdslb.com/bfs/face/fe80011baeb9a12706426bdbf39abd9b4b95518d.jpg@87w_88h_1c_100q.webp',
    idCard: '410041293847593728946',
    intergal: 20,
    price: 0,
    birthday: new Date().toLocaleDateString(),
  };

  const [showEdit, setShowEdit] = useState(false);

  return (
    <Modal
      title="用户详情"
      visible={isShow}
      onCancel={close}
      footer={
        <>
          <Button disabled={!showEdit}>提交</Button>
          <Button
            type="primary"
            onClick={() => setShowEdit((showEdit) => !showEdit)}
          >
            编辑
          </Button>
        </>
      }
    >
      <Descriptions bordered size="small">
        <Descriptions.Item label="头像">
          <Avatar src={data['avatar_url']} />
        </Descriptions.Item>
        <Descriptions.Item label="姓名">{data['name']}</Descriptions.Item>
        <Descriptions.Item label="电话">{data['phone']}</Descriptions.Item>
        <Descriptions.Item label="积分">{data['intergal']}</Descriptions.Item>
        <Descriptions.Item label="余额">{data['price']}</Descriptions.Item>
        <Descriptions.Item label="生日">{data['birthday']}</Descriptions.Item>
        <Descriptions.Item label="身份证">{data['idCard']}</Descriptions.Item>
      </Descriptions>
      {showEdit ? (
        <Form style={{ marginTop: '2rem' }}>
          <Form.Item label="电话" className="desc-form-item">
            <Input value={data['phone']} />
          </Form.Item>
          <Form.Item label="积分" className="desc-form-item">
            <Input value={data['intergal']} type="number" />
          </Form.Item>
          <Form.Item label="生日" className="desc-form-item">
            <Input value={'2020-01-01'} type="date" />
          </Form.Item>
          <Form.Item label="身份证" className="desc-form-item">
            <Input value={data['idCard']} />
          </Form.Item>
        </Form>
      ) : (
        ''
      )}
    </Modal>
  );
};

export default VipCard;
