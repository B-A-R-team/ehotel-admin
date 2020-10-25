/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react';
import moment from 'moment'
import {
    Form,
    Input,
    Button,
    Select,
    DatePicker,
    InputNumber,
    Card,
    message
} from 'antd';
import { reqAddCoupon } from '../../../api'
import storageUtils from '../../../utils/storageUtils';
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 4 },
};

const validateMessages = {
    required: '${label} 是必须的!',
    types: {
        number: '${label} 不是一个合法的数字!',

    },
    number: {
        range: '${label} 必须在 ${min} 和 ${max} 之间',
    },
};
export function AddCoupon() {
    const title = (
        <span>
            <span style={{ fontSize: 14 }}>
                优惠卷管理 / &nbsp;
               <span style={{ fontSize: 13 }}>
                    添加优惠卷
                   </span>
            </span>
        </span>
    )
    
    const onFinish = (values: any) => {
        const { coupon } = values
        const momentArr = coupon.date;
        console.log(momentArr[0]);
        let startTime = new Date(momentArr[0].format('YYYY-MM-DD HH:mm:ss')).getTime();
        let endTime = new Date(momentArr[1].format('YYYY-MM-DD HH:mm:ss')).getTime();
        coupon.startTime = startTime;
        coupon.endTime = endTime;
        delete values.coupon.date;
        //发请求 
        const userInfo = storageUtils.getUser()
        let myCounpon = {
            is_full_down: couponType, //true: 满减券, false：代金券
            start_time: coupon.startTime, //开始时间
            end_time: coupon.endTime, //结束时间
            remarks: coupon.introduction, //备注
            limit_price: coupon.fullCoupon || 100,
            reduce_price: coupon.subCoupon,
            label: coupon.couponName,
            is_used: false,
            user_id: parseInt(userInfo.id),
            hotel_id: parseInt(userInfo.id)
        }
        // console.log(myCounpon);
        reqAddCoupon(myCounpon).then((res: any) => {
            console.log(res);
            if(res.code === 0) {
                message.success('添加成功')
            }
        })

    };
    const [couponType, setCouponType] = useState(true);
    const couponTypeChange = (value: any) => {
        setCouponType(!couponType)
    }

    return (
        <Card title={title} style={{ height: 800 }}>
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
            >
                <Form.Item
                    wrapperCol={{ span: 3 }}
                    name={['coupon', 'couponName']}
                    label="优惠券名称"
                    rules={[{ required: true }]}>
                    <Input
                    />
                </Form.Item>
                <Form.Item initialValue="FullCutCoupon" name={['coupon', 'couponType']} label="优惠券类型" >

                    <Select style={{ width: 120 }} onChange={couponTypeChange}>
                        <Select.Option value="discountCoupon">代金券</Select.Option>
                        <Select.Option value="FullCutCoupon">满减券</Select.Option>
                    </Select>

                </Form.Item>

                {
                    couponType ?
                        (
                            <>
                                <Form.Item label="满减券">
                                    <span className="ant-form-text"> 满：</span>
                                    <Form.Item
                                        name={['coupon', 'fullCoupon']}
                                        noStyle
                                        initialValue={50}
                                        rules={[{ type: 'number', min: 0 }]}
                                    >
                                        <InputNumber min={0} />
                                    </Form.Item>
                                </Form.Item>
                                <Form.Item label="满减券" >
                                    <span className="ant-form-text"> 减：</span>
                                    <Form.Item
                                        name={['coupon', 'subCoupon']}
                                        noStyle
                                        initialValue={10}
                                        rules={[{ type: 'number', min: 1 }]}
                                    >
                                        <InputNumber
                                            min={1}

                                            onChange={(e) => { console.log(e); }}
                                        />
                                    </Form.Item>
                                </Form.Item>
                            </>
                        ) :

                        (
                            <Form.Item
                                name={['coupon', 'subCoupon']}
                                label="代金券"
                                initialValue={10}
                                rules={[{ type: 'number', min: 0, max: 10000 }]}
                            >
                                <InputNumber

                                    min={0}
                                    max={10000}
                                    step={1}
                                    formatter={value => `${value}元`}
                                    parser={(value: any) => value.replace('元', '')}
                                    onChange={() => { }}
                                />
                            </Form.Item>
                        )
                }

                <Form.Item name={['coupon', 'date']} label="日期" rules={[{ required: true }]} >
                    <DatePicker.RangePicker showTime />
                </Form.Item>
                <>
                    <Form.Item name={['coupon', 'introduction']} label="优惠券的描述" initialValue=" ">
                        <Input.TextArea placeholder="请输入对优惠券的描述" />
                    </Form.Item>
                </>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                    <Button type="primary" htmlType="submit">
                        添加
                    </Button>
                </Form.Item>
            </Form>

        </Card>

    )
}