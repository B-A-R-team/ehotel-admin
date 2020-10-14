import React, { ReactNode, FC, useState, useEffect } from 'react';
import { Input, Form, Row, Button, Select, Col, Modal } from 'antd';
import './record-search.less';
import { IRecord } from '../record';
import { reqAllRecords } from '../../../api/index';

const { Item } = Form;
const { Option } = Select;

export interface ISearchData {
  id: string;
  phone: string;
  state: string;
}

export interface IRecordSearchProps {
  width?: string | number | (string & {}) | undefined;
  changeTable: Function;
  tableData: IRecord[];
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
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
  changeTable,
  tableData,
  setLoading,
  searchData = { id: '', phone: '', state: '' },
}: IRecordSearchProps) => {
  const [searchInfo, setSearchInfo] = useState(searchData);

  // 如果传入了ID，则自动搜索一次
  useEffect(() => {
    if (searchData['id']) {
      doSearch();
    }
  }, []);

  /**
   * 模糊查询
   */
  const fuzzyQuery = (data: IRecord) => {
    return (query: string) => {
      return new RegExp(query).test(data['phone']);
    };
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
  const doSearch = async () => {
    setLoading(true);
    const totalTableData = await reqAllRecords();
    const { id, phone, state } = searchInfo;

    let newRecords: IRecord[] = totalTableData;

    if (id) {
      newRecords = totalTableData.filter((item: IRecord) => item['id'] == id);
    }
    if (phone) {
      newRecords = totalTableData.filter((item: IRecord) =>
        fuzzyQuery(item)(phone)
      );
    }
    if (state !== '未选择' && state !== '') {
      newRecords = totalTableData.filter(
        (item: IRecord) => item['status'] === state
      );
    }

    changeTable(newRecords);
    setLoading(false);
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
        </Row>
      </Form>
    </div>
  );
};

export default RecordSearch;
