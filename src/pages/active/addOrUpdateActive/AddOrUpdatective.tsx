/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import {
  PageHeader,
  Form,
  Input,
  DatePicker,
  Button,
  Spin,
  Modal,
} from 'antd';
import { useHistory } from 'react-router-dom';
import BraftEditor, { ControlType } from 'braft-editor';
import 'braft-editor/dist/index.css';
import { FormInstance } from 'antd/lib/form';
import UploadImgs from '../../room/upload-imgs/uploadImg';
import useRequest from '../../../hooks/useRequest';
import './add-update-active.less';

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

const AddOrUpdateActive = (props: any) => {
  const history = useHistory();
  const [uploadLoading, startUploadLoading] = useRequest();
  const [loading, startLoading] = useRequest(false);
  const [editorStr, setEditorStr] = useState<any>();
  const [isUpdate, setIsUpdate] = useState(false)



  const [activeData, setActiveData] = useState<any>({
    id: '',
    title: '',
    imgs: [''],
    desc: '',
    startTime: '',
    endTime: '',
    status: '',
    detail:''
  })
  // 表单的实例
  const formRef = useRef<FormInstance>();
  // 编辑器的实例
  const editorRef = useRef<BraftEditor>();

  // 将HTML字符串转换为编辑器所需要的EditorState实例


  //发请求 判断是否为修改
  useEffect(() => {
    //发请求
    if (props.match.params.id) {
      setIsUpdate(true)
      const data = {
        id: '798',
        title: '《糖豆人：终极淘汰赛》第二赛季',
        imgs: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'],
        desc:
          '《糖豆人：终极淘汰赛》Steam平台销量成功突破7,000,000份啦！不仅如此，我们还带来了全新的第二赛季内容大揭秘！炫酷的关卡、神秘的中世纪服装......快戳下面的视频先睹为快吧~',
        startTime: '2020-11-01',
        endTime: '2022-11-01',
        status: 'in_progress',
        detail:'<p>Hello <b>World!</b></p>'
      }
      setActiveData(data)
      setEditorStr( BraftEditor.createEditorState(data.detail))
      console.log(editorStr)
      formRef.current?.setFieldsValue(data)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])
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
      img: activeData.imgs,
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
    img: string[];
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
          <p>imgs: {values['img']} </p>
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


  return (
    <div className="add-active-page">
      <PageHeader
        className="header"
        onBack={() => history.goBack()}
        title={isUpdate ? "修改活动详情" : "添加新活动"}
      />
      <Spin spinning={loading}>
        <Form
          ref={formRef as any}
          className="add-form"
          {...layout}
          labelAlign="right"
          onFinish={finishForm}
          initialValues={{}}
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
            <UploadImgs imgs={activeData.imgs} inMode={!!props.match.params.id}/>
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

export default AddOrUpdateActive;
