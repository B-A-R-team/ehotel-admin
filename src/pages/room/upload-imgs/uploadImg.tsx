import React, { useState } from 'react'

import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UploadOutlined } from '@ant-design/icons';

const Demo = () => {
  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }:any) => {
      console.log(newFileList);
    setFileList(newFileList);
  };

  const onPreview = async (file:any) => {
    let src = file.url;
    console.log(file,src);
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }

  };

  return (
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 5 && '+ Upload'}
      </Upload>
  );
};
export default Demo

// function getBase64(file: any) {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = error => reject(error);
//     });
// }

// export default function UploadImgs() {
//     const [previewVisible, setPreviewVisible] = useState(false)
//     const [previewImage, setPreviewImage] = useState('')
//     const [previewTitle, setPreviewTitle] = useState('')
//     const [fileList, setFileList] = useState([
//         {
//             uid: '-1',
//             name: 'image.png',
//             status: 'done',
//             url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//             size: 1,
//             type: ''
//         },
//         {
//             uid: '-2',
//             name: 'image.png',
//             status: 'done',
//             url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//             size: 1,
//             type: ''
//         },
//         {
//             uid: '-3',
//             name: 'image.png',
//             status: 'done',
//             url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//             size: 1,
//             type: ''
//         }
//     ])
//     const handleCancel = () => setPreviewVisible(false);
//     const uploadButton = (
//         <div>
//             <PlusOutlined />
//             <div style={{ marginTop: 8 }}>Upload</div>
//         </div>
//     );
//     const handlePreview = async (file: any) => {
//         if (!file.url && !file.preview) {
//             file.preview = await getBase64(file.originFileObj);
//         }
//         setPreviewImage(file.url || file.preview)
//         setPreviewVisible(true)
//         setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
//     };
//     const handleChange = ({ fileList }: any) => setFileList(fileList);

//     return (
//         <>
//             <Upload
//                 action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//                 listType="picture-card"
//                 fileList={fileList}
//                 onPreview={handlePreview}
//                 onChange={handleChange}
//             >
//                 {fileList.length >= 8 ? null : uploadButton}
//             </Upload>
//             <Modal
//                 visible={previewVisible}
//                 title={previewTitle}
//                 footer={null}
//                 onCancel={handleCancel}
//             >
//                 <img alt="example" style={{ width: '100%' }} src={previewImage} />
//             </Modal>
//         </>
//     )
// }