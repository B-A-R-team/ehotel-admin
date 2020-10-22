/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import './carousels.less';
import { Carousel, Image, Spin, Card, Upload, message } from 'antd';
import ImageCard from './image-card/image-card';
import { InboxOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { UploadChangeParam } from 'antd/lib/upload';
import { reqAddSwiper, reqSwiperList } from '../../api';
import { reqUpdateSwiper } from '../../api/index';

const { Dragger } = Upload;

const props = {
  name: 'file',
  action: 'https://www.barteam.cn:1239/upload',
  headers: {
    Authorization: localStorage.getItem('token') as string,
  },
  async onChange(info: UploadChangeParam) {
    const { status } = info.file;

    if (status === 'done') {
      // console.log(info.file.response.data.path);
      message.success(`${info.file.name} file uploaded successfully.`);
      await reqAddSwiper(info.file.response.data.path);
      window.location.reload();
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const Carousels = () => {
  const [swiperList, setSwiperList] = useState<any>();
  const [loading, setLoading] = useState(true);

  /**
   * 删除图片
   * @param imgUrl 要删除的图片url
   */
  const onDelete = async (imgUrl: string) => {
    setLoading(true);
    const newList = swiperList.filter((item: string) => item !== imgUrl);
    await reqUpdateSwiper(newList);

    setLoading(false);
    window.location.reload();
  };

  const getSwiper = async () => {
    const res = await reqSwiperList();

    setSwiperList(res['data']);
    setLoading(false);
  };

  useEffect(() => {
    getSwiper();
  }, []);

  return (
    <Spin spinning={loading}>
      <div className="carousels-wrapper">
        <div className="carousel-cards">
          <Card className="show">
            <Carousel autoplay className="carousels">
              {swiperList ? (
                swiperList.map((item: string) => (
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
            {swiperList ? (
              swiperList.map((item: string) => (
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
