import React from 'react';
import { Card, Modal } from 'antd';
import './image-card.less';
import { DeleteFilled } from '@ant-design/icons';

export interface IImageCardProps {
  src: string;
  index: string;
  onDelete?: () => void;
  children?: React.ReactNode;
}

const ImageCard = ({ src, index, onDelete, children }: IImageCardProps) => {
  const deleteModal = () => {
    Modal.confirm({
      title: '警告',
      content: '确定删除该图片？',
      onOk: onDelete,
    });
  };

  return (
    <Card
      className="img-card"
      cover={<img alt="example" src={src} />}
      actions={[
        <DeleteFilled
          className="delete-btn"
          key="delete"
          onClick={deleteModal}
        />,
      ]}
    ></Card>
  );
};

export default ImageCard;
