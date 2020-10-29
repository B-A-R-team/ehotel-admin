/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { PageHeader, Form, Input, DatePicker, Button, Spin, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import BraftEditor, { ControlType } from 'braft-editor';
import 'braft-editor/dist/index.css';
import { FormInstance } from 'antd/lib/form';
import UploadImgs from '../../room/upload-imgs/uploadImg';
import useRequest from '../../../hooks/useRequest';
import './add-update-active.less';
import {
  reqCreateActive,
  reqAcitveById,
  reqUpdateActive,
} from '../../../api/index';
import { activeStatus } from '../active';
import moment from 'moment';

const { Item } = Form;
const { RangePicker } = DatePicker;

export interface CreateAndUpdateActiveDto {
  id?: number;
  topic: string;
  img_url?: string;
  start_time: string;
  end_time: string;
  detail: string;
  desc: string;
  hotel_id: number;
}

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
  const [isUpdate, setIsUpdate] = useState(false);

  const [activeData, setActiveData] = useState<any>({
    id: '',
    title: '',
    imgs: [''],
    desc: '',
    startTime: '',
    endTime: '',
    status: '',
    detail: '',
  });
  // 表单的实例
  const formRef = useRef<FormInstance>();
  // console.log(formRef);
  // 编辑器的实例
  const editorRef = useRef<BraftEditor>();

  // 将HTML字符串转换为编辑器所需要的EditorState实例

  /**
   * 获取要更新的active数据
   * @param id active id
   */
  const getUpdateActive = async (id: number) => {
    const { data } = await reqAcitveById(id);

    const start = new Date(data['start_time']).getTime();
    const end = new Date(data['end_time']).getTime();
    const now = Date.now();
    let status: activeStatus;
    if (start <= now && end >= now) {
      status = 'in_progress';
    } else if (start >= now) {
      status = 'todo';
    } else {
      status = 'done';
    }

    console.log(data['detail']);

    const active = {
      id: data['id'],
      title: data['topic'],
      imgs: [`https://www.barteam.cn:1239/${data['img_url']}`],
      desc: data['desc'],
      time: [moment(data['start_time']), moment(data['end_time'])],
      startTime: new Date(data['start_time']),
      endTime: new Date(data['end_time']),
      detail: data['dateil'],
      status,
    };

    setActiveData(active);
    setEditorStr(BraftEditor.createEditorState(data['detail']));
    formRef.current?.setFieldsValue(active);
  };

  //发请求 判断是否为修改
  useEffect(() => {
    //发请求
    if (props.match.params.id) {
      setIsUpdate(true);
      getUpdateActive(parseInt(props.match.params.id));

      console.log(editorStr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);
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
    console.log(val.time);
    const activeInfo = {
      title: val['title'],
      time: activeDate,
      img: activeData.imgs,
      desc: val['desc'],
      detail: editorStr,
    };

    startLoading();

    if (props.match.params.id) {
      console.log(parseInt(props.match.params.id), activeInfo);
      sendUpdate(parseInt(props.match.params.id), activeInfo);
    } else {
      showTips(activeInfo);
    }
  };

  const sendUpdate = async (
    id: number,
    values: {
      title: string;
      time: Date[];
      img: string[];
      desc: string;
      detail: string;
    }
  ) => {
    await reqUpdateActive({
      id,
      topic: values['title'],
      img_url: values['img'][0],
      start_time: values['time'][0].toLocaleDateString(),
      end_time: values['time'][1].toLocaleDateString(),
      detail: values['detail'],
      desc: values['desc'],
      hotel_id: 1,
    });

    history.goBack();
  };

  // 提交后的提示信息
  const showTips = async (values: {
    title: string;
    time: Date[];
    img: string[];
    desc: string;
    detail: string;
  }) => {
    await reqCreateActive({
      topic: values['title'],
      img_url: values['img'][0],
      start_time: values['time'][0].toLocaleDateString(),
      end_time: values['time'][1].toLocaleDateString(),
      detail: values['detail'],
      desc: values['desc'],
      hotel_id: 1,
    });

    Modal.info({
      title: '创建成功',
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
        title={isUpdate ? '修改活动详情' : '添加新活动'}
      />
      <Spin spinning={loading}>
        <Form
          ref={formRef as any}
          className="add-form"
          {...layout}
          labelAlign="right"
          onFinish={finishForm}
          // initialValues={{}}
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
            <UploadImgs
              imgs={activeData.imgs}
              inMode={!!props.match.params.id}
            />
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
