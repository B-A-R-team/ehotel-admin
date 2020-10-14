import React, { ReactNode, FC, useState } from 'react';
import { Input, Form, Row, Button, Select, Col } from 'antd';
import { IUser } from '../user';
import { reqUsers } from '../../../api/index';

const { Item } = Form;
const { Option } = Select;

export interface IUserSearchProps {
  width?: string | number | (string & {}) | undefined;
  changeTable: Function;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
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
  changeTable,
  setLoading,
}: IUserSearchProps) => {
  const [searchInfo, setSearchInfo] = useState({
    nickname: '',
    status: 0,
  });

  /**
   * 更改搜索数据
   * @param value 修改后的值
   * @param label 要修改的属性
   */
  const changeSearchInfo = (value: string | number, label: string) => {
    setSearchInfo((searchInfo) => ({ ...searchInfo, [label]: value }));
  };

  /**
   * 模糊查询
   */
  const fuzzyQuery = (data: IUser) => {
    return (query: string) => {
      return new RegExp(query).test(data['nickname']);
    };
  };

  /**
   * 发送搜索请求
   */
  const doSearch = async () => {
    // 获取查询条件
    setLoading(true);
    const { nickname, status } = searchInfo;

    // 重新请求数据
    const res = await reqUsers();

    res['data'].forEach((user: IUser) => {
      if (!user['avatar_url']) {
        user['avatar_url'] = '/logo192.png';
      }
      user['key'] = user['id'];
    });

    const totalTableData: IUser[] = res['data'];

    // 获取过滤后的数据
    let searchRes: IUser[];

    if (status === 1) {
      searchRes = totalTableData.filter((item) => !item['isVip']);
    } else if (status === 2) {
      searchRes = totalTableData.filter((item) => item['isVip']);
    } else {
      searchRes = totalTableData;
    }

    if (nickname) {
      searchRes = searchRes.filter((item) => fuzzyQuery(item)(nickname));
    }

    // 载入
    setLoading(false);
    changeTable(searchRes!);
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
                  value={searchInfo['nickname']}
                  onChange={(e) => changeSearchInfo(e.target.value, 'nickname')}
                />
              </Item>
              <Item label="用户身份">
                <Select
                  defaultValue={options[0]['value']}
                  onChange={(value) => changeSearchInfo(value, 'status')}
                >
                  {options.map((item, index) => (
                    <Option value={item['value']} key={index}>
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

export default UserSearch;
