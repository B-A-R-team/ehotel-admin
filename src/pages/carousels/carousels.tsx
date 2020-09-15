/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import './carousels.less';
import { Carousel, Image, Spin, Card, Upload, message } from 'antd';
import useRequest from '../../hooks/useRequest';
import ImageCard from './image-card/image-card';
import { InboxOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

const { Dragger } = Upload;

const props = {
  name: 'file',
  action:
    'https://www.barteam.cn:1239/hotels/upload/swiper?id=5f15898e9e625204e0c20b29',
  headers: {
    Authorization: localStorage.getItem('token') as string,
  },
  onChange(info: any) {
    const { status } = info.file;

    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
      window.location.reload();
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const Carousels = () => {
  // 获取轮播图
  const [{ data, loading, error }] = useRequest<{ code: number; data: [] }>({
    url:
      'https://www.barteam.cn:1239/hotels/swiper?id=5f15898e9e625204e0c20b29',
    method: 'get',
  });

  // 删除
  const [{ data: updateData, request }] = useRequest<{
    code: number;
    data: any;
  }>(
    {
      url: 'https://www.barteam.cn:1239/hotels/swiper/update',
      method: 'put',
      headers: {
        Authorization: localStorage.getItem('token') as string,
      },
      data: {
        id: '5f15898e9e625204e0c20b29',
        swiperUrlList: [],
      },
    },
    false
  );

  /**
   * 删除图片
   * @param imgUrl 要删除的图片url
   */
  const onDelete = (imgUrl: string) => {
    const list = data['data'];
    const res = list.filter((item) => item !== imgUrl);
    request({
      url: 'https://www.barteam.cn:1239/hotels/swiper/update',
      method: 'put',
      headers: {
        Authorization: localStorage.getItem('token') as string,
      },
      data: {
        id: '5f15898e9e625204e0c20b29',
        swiperUrlList: res,
      },
    });
    window.location.reload();
  };

  return (
    <Spin spinning={loading}>
      <div className="carousels-wrapper">
        <div className="carousel-cards">
          <Card className="show">
            <Carousel autoplay className="carousels">
              {data['data'] ? (
                data['data'].map((item) => (
                  <Image
                    className="carousel-image"
                    src={`https://www.barteam.cn:1239/${item}`}
                    key={item}
                  />
                ))
              ) : (
                <div>暂无数据</div>
              )}
            </Carousel>
          </Card>
          <Card className="add-new" title="上传图片">
            <ImgCrop rotate aspect={400 / 250}>
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  点击或将图片拖入此区域上传图片
                </p>
                <p className="ant-upload-hint">仅支持单张图片上传。</p>
              </Dragger>
            </ImgCrop>
          </Card>
        </div>
        <Card className="show-list" title="图片列表">
          <div className="image-wrapper">
            {data['data'] ? (
              data['data'].map((item) => (
                <ImageCard
                  src={`https://www.barteam.cn:1239/${item}`}
                  key={item}
                  index={item}
                  onDelete={() => onDelete(item)}
                />
              ))
            ) : (
              <div>暂无数据</div>
            )}
          </div>
        </Card>
      </div>
    </Spin>
  );
};

export default Carousels;
