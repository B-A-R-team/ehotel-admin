import './add-active.less';
import React, { useState, useRef } from 'react';
import {
  PageHeader,
  Form,
  Input,
  DatePicker,
  Upload,
  Button,
  Spin,
  Modal,
} from 'antd';
import { useHistory } from 'react-router-dom';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import useRequest from '../../../hooks/useRequest';
import BraftEditor, { ControlType } from 'braft-editor';
import 'braft-editor/dist/index.css';
import { FormInstance } from 'antd/lib/form';

const { Item } = Form;
const { RangePicker } = DatePicker;

// 表单项布局
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
// 表单项布局
const tailLayout = {
  wrapperCol: { offset: 6, span: 6 },
};

// 富文本控制器
const controls = [
  'text-color',
  'bold',
  'italic',
  'underline',
  'strike-through',
  'separator',
  'superscript',
  'subscript',
  'emoji',
  'separator',
  'headings',
  'list-ul',
  'list-ol',
  'blockquote',
  'separator',
  'hr',
];

const AddActive = () => {
  const history = useHistory();
  const [uploadLoading, startUploadLoading] = useRequest();
  const [loading, startLoading] = useRequest(false);
  const [imgUrl, setImgUrl] = useState('');
  const [editorStr, setEditorStr] = useState('');

  // 表单的实例
  const formRef = useRef<FormInstance>();
  // 编辑器的实例
  const editorRef = useRef<BraftEditor>();

  // 上传图片组件的配置
  const uploadConfig = {
    className: 'avatar-uploader',
    action: 'https://baidu.com',
  };

  // 提交表单
  const finishForm = (val: {
    title: string;
    time: { _d: Date }[];
    desc: string;
  }) => {
    const activeDate = [val.time[0]['_d'], val.time[1]['_d']];

    const activeInfo = {
      title: val['title'],
      time: activeDate,
      img: imgUrl,
      desc: val['desc'],
      detail: editorStr,
    };

    startLoading();
    showTips(activeInfo);
  };

  // 提交后的提示信息
  const showTips = (values: {
    title: string;
    time: Date[];
    img: string;
    desc: string;
    detail: string;
  }) => {
    Modal.info({
      title: '创建成功',
      content: (
        <>
          <p>{values['title']}</p>
          <p>
            {values['time'][0].toLocaleDateString()}-
            {values['time'][1].toLocaleDateString()}
          </p>
          <p>imgUrl: {values['img']} </p>
          <p>{values['desc']}</p>
          <p>{values['detail'].toString()}</p>
        </>
      ),
    });
  };

  // 重置
  const reset = () => {
    // 清空编辑器
    editorRef.current?.clearEditorContent();
    // 清空表单
    formRef.current?.resetFields();
  };

  // 上传图片的按钮
  const uploadButton = (
    <div className="upload-btn-wrapper">
      {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <div className="add-active-page">
      <PageHeader
        className="header"
        onBack={() => history.push('/active')}
        title="添加新活动"
      />
      <Spin spinning={loading}>
        <Form
          ref={formRef as any}
          className="add-form"
          {...layout}
          labelAlign="right"
          onFinish={finishForm}
        >
          <Item
            label="活动标题"
            name="title"
            rules={[{ required: true, message: '请输入标题' }]}
          >
            <Input placeholder="请输入活动标题" />
          </Item>
          <Item
            label="活动日期"
            name="time"
            rules={[{ required: true, message: '请选择活动日期' }]}
          >
            <RangePicker />
          </Item>
          <Item label="宣传图">
            <Upload {...uploadConfig}>
              {imgUrl ? (
                <img src={imgUrl} style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Item>
          <Item
            label="活动简介"
            name="desc"
            rules={[{ required: true, message: '请输入活动简介' }]}
          >
            <Input.TextArea rows={4} placeholder="请输入活动简介" />
          </Item>
          <Item label="活动详情">
            <BraftEditor
              ref={editorRef as any}
              style={{ border: '1px solid #ccc' }}
              contentStyle={{ maxHeight: '10rem' }}
              controls={controls as ControlType[]}
              value={editorStr}
              onChange={(editorState) => setEditorStr(editorState.toHTML())}
            />
          </Item>
          <Item {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: '1rem' }}
            >
              提交
            </Button>
            <Button onClick={reset}>重置</Button>
          </Item>
        </Form>
      </Spin>
    </div>
  );
};

export default AddActive;
