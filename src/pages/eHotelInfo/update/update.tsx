import React, { useState, useContext } from 'react'
import { Card, Form, Input, InputNumber, Button, Upload, Modal } from 'antd';
import { LeftOutlined } from '@ant-design/icons'
import Photo from '../photo/photo'
// import { Map } from 'react-amap'
import './update.less'

const MAP_KEY = 'ed51e5c26a85fbed46678eae31b1eee7'

const layout = {
    labelCol: { span: 2, offset: 0 },
    wrapperCol: { span: 6 },
};

const validateMessages = {
    required: '${label} 是必须填写的!',
    types: {
        email: '${label} 不是一个可用的邮箱!',
        number: '${label} 不是一个可用的数字!',
    },
    number: {
        range: '${label}必须在 ${min} 和 ${max}之间',
    },
};

export default (props: any) => {
    const [profileState, setProfileState] = useState(props);

    const title = (
        <span>
            <a href="" onClick={(e) => e.preventDefault()}>
                <LeftOutlined onClick={() => { profileState.history.goBack() }} />
            </a>
            <span>&nbsp;修改信息</span>
        </span>
    )
    const onFinish = (values: any) => {
        console.log(values);
    };
    return (
        <div className="site-card-border-less-wrapper">

            <Card title={title} >

                <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item name={['eHotelInfo', 'eHotelName']} label="店名" rules={[{ required: true }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item name={['eHotelInfo', 'username']} label="负责人姓名" rules={[{ required: true }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item name={['eHotelInfo', 'phone']} label="联系电话" rules={[{ required: true }]} >
                        <Input />
                    </Form.Item>
                    <Form.Item name={['eHotelInfo', 'email']} label="邮箱" rules={[{ type: 'email' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['eHotelInfo', 'introduction']} label="简介">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item label="上传头像">
                        <Photo />
                    </Form.Item>
                    <Form.Item label="地图" >
                        <div className="my-map">
                            <span>位置：安阳市</span>
                            <div style={{ width: 100, height: 100 }}>

                                {/* <Map amapkey={MAP_KEY} /> */}
                            </div>
                        </div>
                    </Form.Item>
           
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                        <Button type="primary" htmlType="submit">确定修改</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
} 