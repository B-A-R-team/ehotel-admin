import React, { useState } from 'react';
import { Row, Col, Input, Button } from 'antd';
import { IVipInfo } from '../vip-card/vip-card';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const VipSearch = ({
  dataList,
  changeDataList,
  reload,
}: {
  dataList: IVipInfo[];
  changeDataList: React.Dispatch<React.SetStateAction<IVipInfo[]>>;
  reload: () => Promise<void>;
}) => {
  const [searchInfo, setSearchInfo] = useState('');
  /**
   * 模糊查询
   * @param data 数据
   */
  const fuzzyQuery = (data: IVipInfo) => {
    return (query: string) => {
      return new RegExp(query).test(data['nickname']);
    };
  };

  const doSearch = async () => {
    if (!searchInfo) {
      reload();
    } else {
      const newList = dataList.filter((data) => fuzzyQuery(data)(searchInfo));
      changeDataList(newList);
    }
  };

  return (
    <Row style={style}>
      <Col>
        <Row>
          <Col style={{ marginRight: '1em' }}>
            <Row>
              <Col style={{ height: '32px', lineHeight: '32px' }}>昵称：</Col>
              <Col>
                <Input
                  placeholder="请输入昵称"
                  value={searchInfo}
                  onChange={(e) => setSearchInfo(e.target.value)}
                />
              </Col>
            </Row>
          </Col>
          <Col>
            <Button type="primary" onClick={doSearch}>
              搜索
            </Button>
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
