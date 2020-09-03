import React, { useState, useEffect } from 'react'

import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default function UploadImgs(props: any) {
  console.log(props);
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState<any>([
    {
      uid: '-1',
      name: '',
      status: '',
      url: '',
    }
  ])
  const handleCancel = () => setPreviewVisible(false);

  useEffect(() => {
    setFileList([])
    const { imgs, inMode } = props
    // console.log(methodIn);
    //渲染多次导致样式 略有问题
    if (inMode) {
      const fileList = imgs.map((img: string, index: 1) => ({
        uid: -index,
        name: 'img.png',
        status: 'done',
        url: img,
      }))
      setFileList(fileList)
    }
    console.log(fileList)
  }, [props])
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
    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  };
  const handleChange = ({ fileList }: any) => setFileList(fileList);

  return (
    <>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
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
  )
}