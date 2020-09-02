import React, { ReactNode, FC, useState, useEffect } from 'react';
import { Input, Form, Row, Button, Select, Col, Modal } from 'antd';
import { IUser } from '../user';

const { Item } = Form;
const { Option } = Select;

export interface IUserSearchProps {
  width?: string | number | (string & {}) | undefined;
  selectedKeys: String[];
  changeTable: Function;
  tableData: IUser[];
  startLoading: () => void;
  children?: ReactNode;
}

const options = [
  {
    label: '未选择',
    value: 0,
  },
  {
    label: '普通用户',
    value: 1,
  },
  {
    label: '会员',
    value: 2,
  },
];

const UserSearch: FC<IUserSearchProps> = ({
  width,
  selectedKeys,
  changeTable,
  tableData,
  startLoading,
}: IUserSearchProps) => {
  const [canDelete, setCanDelete] = useState(false);
  const [searchInfo, setSearchInfo] = useState({
    id: '',
    phone: '',
    state: '',
  });

  // 判断是否有选中行
  useEffect(() => {
    if (selectedKeys.length !== 0) {
      setCanDelete(true);
    } else {
      setCanDelete(false);
    }
  }, [selectedKeys]);

  /**
   * 删除
   */
  const doDelete = () => {
    Modal.confirm({
      title: '删除',
      content: '确定删除这些数据？',
      cancelText: '取消',
      okText: '确认',
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
              <Item label="用户名">
                <Input
                  placeholder="请输入用户名"
                  value={searchInfo['id']}
                  onChange={(e) => changeSearchInfo(e.target.value, 'id')}
                />
              </Item>
              <Item label="用户身份">
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

export default UserSearch;
