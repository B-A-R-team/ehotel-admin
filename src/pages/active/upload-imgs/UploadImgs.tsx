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
    },
  ]);
  const handleCancel = () => setPreviewVisible(false);
  const { activeData, setActiveData } = props;
  useEffect(() => {
    setFileList([]);
    //渲染多次导致样式 略有问题
    if (activeData.imgs && activeData.imgs[0].length !== 0) {
      const fileList = [
        {
          uid: '-1',
          name: '用户头像',
          status: 'done',
          url: BASE_URL + activeData.imgs,
        },
      ];
      setFileList(fileList);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handlePreview = async (file: any) => {
    console.log(file);
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
    if (file.response) {
      setActiveData({
        ...activeData,
        imgs: [file.response.data.path],
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
        {fileList.length >= 1 ? null : uploadButton}
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
