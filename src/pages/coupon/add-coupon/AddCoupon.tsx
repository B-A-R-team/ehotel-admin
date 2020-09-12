import React, { useState } from 'react';
import moment from 'moment'
import {
    Form,
    Input,
    Button,
    Select,
    DatePicker,
    InputNumber,
    Card
} from 'antd';

const layout = {
    labelCol: { span: 2 },
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
        let startTime = moment(momentArr[0]).format('YYYY-MM-DD HH:mm:ss');
        let endTime = moment(momentArr[1]).format('YYYY-MM-DD HH:mm:ss');
        coupon.startTime = startTime;
        coupon.endTime = endTime;
        delete values.coupon.date;
        //发请求 
        console.log(coupon);
    };
    const [couponType, setCouponType] = useState('FullCutCoupon');
    const couponTypeChange = (value: any) => {
        setCouponType(value)
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

                    <Select defaultValue="FullCutCoupon" style={{ width: 120 }} onChange={couponTypeChange}>
                        <Select.Option value="discountCoupon">打折券</Select.Option>
                        <Select.Option value="FullCutCoupon">满减券</Select.Option>
                    </Select>

                </Form.Item>

                {
                    couponType === 'FullCutCoupon' ?
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
                                name={['coupon', 'discountCoupon']}
                                label="打折券"
                                initialValue={9}
                                rules={[{ type: 'number', min: 0, max: 10 }]}
                            >
                                <InputNumber
                                   
                                    min={0}
                                    max={10}
                                    step={0.1}
                                    formatter={value => `${value}折`}
                                    parser={(value: any) => value.replace('折', '')}
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