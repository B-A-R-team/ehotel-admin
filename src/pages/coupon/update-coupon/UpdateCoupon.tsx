import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment'
import {
    Drawer,
    Form,
    Input,
    Button,
    Select,
    DatePicker,
    InputNumber,
} from 'antd'

import { DrawerContext } from '../index'

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
};

export default function UpdateCoupon(props: any) {

    const [couponInfo, setCouponInfo] = useState(props.couponInfo)
    const [couponType, setCouponType] = useState('FullCutCoupon')

    useEffect(() => {
        setCouponInfo(props.couponInfo)
        setCouponType(props.couponInfo.couponType)
    }, [props.couponInfo])

    const { visible, setVisible } = useContext(DrawerContext)
    const onClose = () => {
        setVisible(false)
    };

    const couponTypeChange = (value: any) => {
        setCouponType(value)
        setCouponInfo({ ...couponInfo, couponType: value })
    }
    const handleClick = () => {
        //发请求
        setVisible(false)
        console.log(couponInfo)
    }
    return (
        <Drawer
            title="修改优惠券"
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
            getContainer={false}
            style={{ position: 'absolute' }}
            width={520}
            footer={
                <div>
                    <Button ghost type="primary" onClick={onClose}>
                        取消 </Button>
                    <Button style={{marginLeft:"20px"}} type="primary" onClick={handleClick}>
                        提交 </Button>
                    <span style={{marginLeft:"20px", color:"gray" }}>如果不提交，则不会保存任何修改</span>
                </div>
            }
        >
            <Form
                {...layout}
            >
                <Form.Item
                    label="优惠券名称"
                >
                    <Input value={couponInfo.couponName} onChange={(e) => setCouponInfo({ ...couponInfo, couponName: e.target.value })} />
                </Form.Item>
                <Form.Item
                    label="优惠券类型"
                >
                    <Select value={couponInfo.couponType}
                        style={{ width: 120 }} onChange={couponTypeChange}>
                        <Select.Option value="discountCoupon">打折券</Select.Option>
                        <Select.Option value="fullCoupon">满减券</Select.Option>
                    </Select>

                </Form.Item>
                {
                    couponType === 'fullCoupon' ?
                        (
                            <>
                                <Form.Item label="满减券" >
                                    <span className="ant-form-text"> 满：</span>
                                    <Form.Item
                                        noStyle
                                    >
                                        <InputNumber
                                            value={couponInfo.fullCoupon}
                                            onChange={(e: number | string | any) => setCouponInfo({ ...couponInfo, fullCoupon: e })}
                                        />
                                    </Form.Item>
                                </Form.Item>
                                <Form.Item label="满减券" >
                                    <span className="ant-form-text"> 减：</span>
                                    <Form.Item
                                        noStyle
                                    >
                                        <InputNumber
                                            value={couponInfo.subCoupon}
                                            onChange={(e) => { setCouponInfo({ ...couponInfo, subCoupon: e }) }}
                                        />
                                    </Form.Item>
                                </Form.Item>
                            </>
                        ) :
                        (
                            <Form.Item
                                label="打折券"
                                rules={[{ type: 'number', min: 0, max: 10 }]}
                            >
                                <InputNumber
                                    value={couponInfo.discountCoupon}
                                    min={0}
                                    max={10}
                                    step={0.1}
                                    formatter={value => `${value}折`}
                                    parser={(value: any) => value.replace('折', '')}
                                    onChange={(e) => { setCouponInfo({ ...couponInfo, discountCoupon: e }) }}
                                />
                            </Form.Item>
                        )
                }
                <Form.Item label="日期" rules={[{ required: true }]} >
                    <DatePicker.RangePicker showTime />
                </Form.Item>
                <>
                    <Form.Item label="优惠券的描述"  >
                        <Input.TextArea placeholder="请输入对优惠券的描述" value={couponInfo.introduction}
                            onChange={(e) => { setCouponInfo({ ...couponInfo, introduction: e.target.value }) }} />
                    </Form.Item>
                </>
            </Form>
        </Drawer>
    )
}