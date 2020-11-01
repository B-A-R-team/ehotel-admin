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
  message,
} from 'antd';
import './vip-card.less';
import { CheckOutlined } from '@ant-design/icons';
import { reqUpdateVipName, reqUpdateVipPhone } from '../../../api/index';
import Integral from './integral';

const { Meta } = Card;

export interface IVipInfo {
  id: number | string;
  nickname: string;
  name: string;
  avatar_url: string;
  phone: string;
  integral: number | string;
  paid_balance: number | string;
}

// 生成VIP简介
const generatorDesc = (intergal: number | string): React.ReactNode => {
  return (
    <div className="vip-desc">
      <div className="intergal">
        <span>积分：</span>
        <span>{intergal}</span>
      </div>
    </div>
  );
};

const VipCard = ({
  info,
  reload,
}: {
  info: IVipInfo;
  reload: () => Promise<void>;
}) => {
  const [showDetail, setShowDetail] = useState(false);
  const [showIntegral, setShowIntegral] = useState(false);

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
            className="btn"
            onClick={() => {
              setShowIntegral(true);
            }}
          >
            积分记录
          </div>,
        ]}
      >
        <Skeleton loading={false} avatar active>
          <Meta
            avatar={<Avatar src={info['avatar_url']} />}
            title={info['nickname']}
            description={generatorDesc(info['integral'])}
          />
        </Skeleton>
      </Card>
      <VipDetail
        isShow={showDetail}
        VipData={info}
        close={() => setShowDetail(false)}
      />
      {showIntegral && (
        <Integral
          userId={info['id']}
          visible={showIntegral}
          close={() => {
            reload();
            setShowIntegral(false);
          }}
        />
      )}
    </>
  );
};

export const VipDetail = ({
  isShow,
  close,
  VipData,
}: {
  isShow: boolean;
  close: () => void;
  VipData: IVipInfo;
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [name, setName] = useState(VipData['name']);
  const [phone, setPhone] = useState(VipData['phone']);

  const updateName = async () => {
    if (!name) {
      return Modal.error({ title: '姓名不能为空' });
    }

    const res: any = await reqUpdateVipName(Number(VipData['id']), name);
    if (Number(res['code']) === 0) {
      message.success('修改成功');
    } else {
      message.error('修改失败');
    }
  };

  const updatePhone = async () => {
    if (!phone) {
      return Modal.error({ title: '电话号不能为空' });
    }

    const res: any = await reqUpdateVipPhone(Number(VipData['id']), phone);
    if (Number(res['code']) === 0) {
      message.success('修改成功');
    } else {
      message.error('修改失败');
    }
  };

  return (
    <Modal
      title="用户详情"
      visible={isShow}
      onCancel={close}
      footer={
        <>
          <Button
            type="primary"
            onClick={() => setShowEdit((showEdit) => !showEdit)}
          >
            {!showEdit ? '编辑' : '返回'}
          </Button>
        </>
      }
    >
      <Descriptions bordered size="small">
        <Descriptions.Item label="头像">
          <Avatar src={VipData['avatar_url']} />
        </Descriptions.Item>
        <Descriptions.Item label="余额">
          {VipData['paid_balance']}
        </Descriptions.Item>
        <Descriptions.Item label="积分">
          {VipData['integral']}
        </Descriptions.Item>
      </Descriptions>
      <Form style={{ marginTop: '2rem' }}>
        <Form.Item label="姓名" className="desc-form-item">
          <div style={{ display: 'flex' }}>
            <Input
              disabled={!showEdit}
              value={name || VipData['name']}
              placeholder="未填写"
              style={{ marginRight: '1rem' }}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              disabled={!showEdit}
              type="primary"
              icon={<CheckOutlined />}
              onClick={updateName}
            />
          </div>
        </Form.Item>
        <Form.Item label="电话" className="desc-form-item">
          <div style={{ display: 'flex' }}>
            <Input
              disabled={!showEdit}
              value={phone || VipData['phone']}
              placeholder="未填写"
              style={{ marginRight: '1rem' }}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Button
              disabled={!showEdit}
              type="primary"
              icon={<CheckOutlined />}
              onClick={updatePhone}
            />
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default VipCard;
