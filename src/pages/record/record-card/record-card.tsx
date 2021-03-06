import React, { FC, ReactNode, useState } from 'react';
import { Drawer, Form, Input, Button, Select } from 'antd';
import { IRecord, RecordStatus } from '../record';
import './record-card.less';
import { reqChangeStatus } from '../../../api/index';

const { Item } = Form;
const { Option } = Select;

export interface IRecordCardProps<T> {
  visible: boolean;
  tableData: IRecord[];
  changeTable: React.Dispatch<React.SetStateAction<IRecord[]>>;
  info: T | null;
  onClose: () => void;
  modifyItem: (arg0: any, arg1: string) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  children?: ReactNode;
}

/**
 * 将传入数据的key转为中文
 */
const keyForLabel: { [index: string]: string } = {
  id: '订单编号',
  create_at: '下单时间',
  room: '房间名称',
  room_num: '房间号',
  name: '入住人名称',
  phone: '入住人电话',
  coupon: '优惠',
  price: '支付价格',
  status: '订单状态',
};

// 选择器选项
const options = [
  {
    label: '未选择',
    value: 0,
  },
  {
    label: '待入住',
    value: 1,
  },
  {
    label: '已完成',
    value: 2,
  },
  {
    label: '待付款',
    value: 3,
  },
];

/**
 * 根据传入数据生成表单
 * @param info 数据
 */
function generateCardForm<T>(
  info: T,
  able: boolean,
  modifyItem: (arg0: any, arg1: string) => void
): ReactNode {
  let infoToArr = [];
  for (const label in info) {
    if (label !== 'key') {
      infoToArr.push({
        index: label,
        label: keyForLabel[label],
        val: info[label],
      });
    }
  }

  /**
   * 判断是否允许修改
   * @param able 全局是否允许修改
   * @param index 需要判断的item
   */
  const isDisabled = (
    able: boolean,
    index: string,
    disableList: string[] = ['id', 'create_at']
  ): boolean => {
    if (disableList.some((item) => item === index) && able) {
      return true;
    }
    return !able;
  };

  return (
    <Form className="info-form" labelAlign="right" labelCol={{ span: 5 }}>
      {infoToArr.map((item, index) => (
        <Item label={item['label']} key={index}>
          <div className="info-item">
            {item['index'] !== 'status' ? (
              <Input
                type={typeof item['val'] === 'string' ? 'text' : 'number'}
                className="info-item-val"
                value={String(item['val'])}
                disabled={isDisabled(able, item['index'], [
                  'id',
                  'create_at',
                  'room',
                  'room_num',
                  'name',
                  'phone',
                  'coupon',
                  'price',
                ])}
                onChange={(e) => modifyItem(e.target.value, item['index'])}
              />
            ) : (
              <Select
                className="info-item-val"
                defaultValue={String(item['val'])}
                disabled={!able}
                onChange={(value) => modifyItem(value, item['index'])}
              >
                {options.map((item, index) => (
                  <Option value={item['label']} key={index}>
                    {item['label']}
                  </Option>
                ))}
              </Select>
            )}
          </div>
        </Item>
      ))}
    </Form>
  );
}

const RecordCard: FC<IRecordCardProps<IRecord>> = ({
  visible,
  tableData,
  changeTable,
  info,
  onClose,
  modifyItem,
  setLoading,
}: IRecordCardProps<IRecord>) => {
  const [able, setAble] = useState(false);
  const save = async (info: IRecord) => {
    setLoading(true);
    const recordId = info['id'] as number;
    const status = info['status'] as '待入住' | '已完成' | '待付款';

    await reqChangeStatus(recordId, RecordStatus[status]);

    const newTableData = tableData.map((item) => {
      if (item['id'] === recordId) {
        item['status'] = status;
      }
      return item;
    });

    changeTable(newTableData);

    setAble(false);
    onClose();
    setLoading(false);
  };

  return (
    <Drawer
      className="record-card"
      width={440}
      title="订单详情"
      placement="right"
      visible={visible}
      onClose={onClose}
      footer={
        <div>
          {!able ? (
            <Button
              className="warning"
              onClick={() => setAble((able) => !able)}
            >
              编辑
            </Button>
          ) : (
            <Button
              type="primary"
              className="cancel"
              onClick={() => setAble((able) => !able)}
            >
              取消
            </Button>
          )}
          <Button
            type="primary"
            disabled={!able}
            onClick={() => {
              save(info!);
            }}
          >
            提交
          </Button>
          <span className="submit-tips">如果不提交，则不会保存任何修改</span>
        </div>
      }
    >
      {visible && generateCardForm(info, able, modifyItem)}
    </Drawer>
  );
};

export default RecordCard;
