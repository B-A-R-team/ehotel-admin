import React, { ReactNode, FC, useState, useEffect } from 'react';
import { Input, Form, Row, Button, Select, Col, Modal } from 'antd';
import './record-search.less';
import { IRecord } from '../record';

const { Item } = Form;
const { Option } = Select;

export interface ISearchData {
  id: string;
  phone: string;
  state: string;
}

export interface IRecordSearchProps {
  width?: string | number | (string & {}) | undefined;
  selectedKeys: String[];
  changeTable: Function;
  tableData: IRecord[];
  startLoading: () => void;
  searchData: ISearchData;
  children?: ReactNode;
}

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

const RecordSearch: FC<IRecordSearchProps> = ({
  width,
  selectedKeys,
  changeTable,
  tableData,
  startLoading,
  searchData = { id: '', phone: '', state: '' },
}: IRecordSearchProps) => {
  const [canDelete, setCanDelete] = useState(false);
  const [searchInfo, setSearchInfo] = useState(searchData);

  // 判断是否有选中行
  useEffect(() => {
    if (selectedKeys.length !== 0) {
      setCanDelete(true);
    } else {
      setCanDelete(false);
    }
  }, [selectedKeys]);

  // 如果传入了ID，则自动搜索一次
  useEffect(() => {
    if (searchData['id']) {
      doSearch();
    }
  }, []);

  /**
   * 删除
   */
  const doDelete = () => {
    Modal.confirm({
      title: '删除',
      content: '确定删除这些数据？',
      cancelText: '取消',
      okText: '确定',
      onOk: () => {
        const diff = tableData.filter(
          (item) => !selectedKeys.some((element) => element === item['key'])
        );
        changeTable(diff);
        setCanDelete(false);
      },
    });
  };

  /**
   * 更改搜索数据
   * @param value 修改后的值
   * @param label 要修改的属性
   */
  const changeSearchInfo = (value: string, label: string) => {
    setSearchInfo((searchInfo) => ({ ...searchInfo, [label]: value }));
  };

  /**
   * 发送搜索请求
   */
  const doSearch = () => {
    console.log(searchInfo);
    startLoading();
  };

  return (
    <div className="record-search" style={{ width }}>
      <Form>
        <Row className="search-bar">
          <Col>
            <Row className="search-wrapper">
              <Item label="订单号">
                <Input
                  placeholder="请输入订单号"
                  value={searchInfo['id']}
                  onChange={(e) => changeSearchInfo(e.target.value, 'id')}
                />
              </Item>
              <Item label="手机号">
                <Input
                  placeholder="请输入入住人手机号"
                  value={searchInfo['phone']}
                  onChange={(e) => changeSearchInfo(e.target.value, 'phone')}
                />
              </Item>
              <Item label="订单状态">
                <Select
                  defaultValue={options[0]['label']}
                  onChange={(value) => changeSearchInfo(value, 'state')}
                >
                  {options.map((item, index) => (
                    <Option value={item['label']} key={index}>
                      {item['label']}
                    </Option>
                  ))}
                </Select>
              </Item>
              <Button type="primary" onClick={doSearch}>
                搜索
              </Button>
            </Row>
          </Col>
          <Col>
            <Button danger onClick={doDelete} disabled={!canDelete}>
              删除
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default RecordSearch;
