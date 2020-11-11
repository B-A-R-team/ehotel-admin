import React, { useState, useEffect } from 'react';

import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { BASE_URL, UPLOAD_URL } from '../../../utils/constant';



function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
//收集 上传图片的路径
let myImgs: string[] = []

export default function UploadImgs(props: any) {

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<any>([
    {
      uid: '-1',
      name: '',
      status: '',
      url: '',
      pathname: ''
    },
  ]);
  const handleCancel = () => setPreviewVisible(false);
  const { room, inMode } = props;
  const { roomData, setRoomData } = room
  useEffect(() => {
    setFileList([]);
    //渲染多次导致样式 略有问题
    if (inMode && roomData.imgs[0] && roomData.imgs[0].length > 0) {
      const fileList = roomData.imgs.map((img: string, index: 1) => ({
        uid: -index,
        name: 'img.png',
        status: 'done',
        url: BASE_URL + img,
        pathname: img
      }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
      myImgs = roomData.imgs
      return setFileList(fileList);
    } 
    myImgs = roomData.imgs
    setFileList(fileList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };
  const handleChange = ({ file, fileList }: any) => {
    if (file.status === 'removed') {
      myImgs.splice(myImgs.indexOf(file.pathname), 1)
    }
    if (file.response && file.status === 'done') {
      myImgs.push(file.response.data.path)
      setRoomData({
        ...roomData,
        imgs: myImgs
      });
    }
    return setFileList(fileList);
  };

  return (
    <>
      <Upload
        action={UPLOAD_URL}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 5 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
}
