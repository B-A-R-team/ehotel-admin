import {
  Button,
  Col,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Table,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { reqIntegralLog, reqCreateIntegralLog } from '../../../api/index';

export interface IIntegral {
  key: number;
  sell_count: number;
  is_out: boolean;
  remarks: string;
}

export interface CreateLogDto {
  sell_count: number;
  is_out: boolean;
  remarks: string;
}

const data: IIntegral[] = [
  { key: 1, sell_count: 0, is_out: false, remarks: '无备注' },
];

const column = [
  {
    title: '积分数量',
    dataIndex: 'sell_count',
    key: 'sell_count',
  },
  {
    title: '是否为支出',
    dataIndex: 'is_out',
    key: 'is_out',
    render: (is_out: boolean) => (is_out ? '是' : '否'),
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    key: 'remarks',
  },
];

function useCreateLog(initialData: CreateLogDto) {
  const [sellCount, setSellCount] = useState(initialData['sell_count']);
  const [isOut, setIsOut] = useState(initialData['is_out']);
  const [remarks, setRemarks] = useState(initialData['remarks']);
  const log = {
    sell_count: sellCount,
    is_out: isOut,
    remarks: remarks,
  };
  return {
    log,
    setSellCount,
    setIsOut,
    setRemarks,
  };
}

export default function Integral({ visible, close, userId }: any) {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState(data);
  const { log, setSellCount, setIsOut, setRemarks } = useCreateLog({
    sell_count: 0,
    is_out: true,
    remarks: '',
  });

  const loadLogs = async () => {
    const { data } = await reqIntegralLog(userId);

    const logList: IIntegral[] = data.map((log: any) => {
      return {
        key: log['id'],
        sell_count: log['sell_count'],
        is_out: log['is_out'],
        remarks: log['remarks'],
      };
    });

    setLoading(false);
    setLogs(logList.reverse());
  };

  const sendLog = async () => {
    setLoading(true);
    await reqCreateIntegralLog(userId, log);
    loadLogs();
  };

  useEffect(() => {
    loadLogs();
    // eslint-disable-next-line
  }, []);

  return (
    <Modal
      width={1000}
      footer={null}
      visible={visible}
      onCancel={close}
      title="积分记录"
    >
      <Row style={{ marginBottom: '1rem' }}>
        <Col style={marginRightOne}>
          <Row>
            <Col style={textCenterY}>积分数额：</Col>
            <Col>
              <InputNumber
                placeholder="积分数额"
                value={log['sell_count']}
                onChange={(value) => setSellCount(Number(value))}
              />
            </Col>
          </Row>
        </Col>
        <Col style={marginRightOne}>
          <Row>
            <Col style={textCenterY}>记录类型：</Col>
            <Col>
              <Radio.Group
                defaultValue={log['is_out']}
                value={log['is_out']}
                buttonStyle="solid"
                onChange={(e) => setIsOut(e.target.value)}
              >
                <Radio.Button value={true}>支出积分</Radio.Button>
                <Radio.Button value={false}>增加积分</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
        </Col>
        <Col style={marginRightOne}>
          <Row>
            <Col style={textCenterY}>备注：</Col>
            <Col>
              <Input
                placeholder="请输入备注"
                value={log['remarks']}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </Col>
          </Row>
        </Col>
        <Col style={{ marginLeft: 'auto' }}>
          <Button type="primary" onClick={() => sendLog()}>
            添加记录
          </Button>
        </Col>
      </Row>
      <Table
        columns={column}
        dataSource={logs}
        scroll={{ y: 320 }}
        pagination={false}
        loading={loading}
      />
    </Modal>
  );
}

const textCenterY = {
  display: 'flex',
  alignItems: 'center',
};
const marginRightOne = {
  marginRight: '1rem',
};
