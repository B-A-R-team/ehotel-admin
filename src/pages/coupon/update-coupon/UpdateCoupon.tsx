import React, { useState, useContext, useEffect } from 'react';
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
import moment from 'moment';

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
};
const dateFormat = 'YYYY-MM-DD HH:mm:ss'
export default function UpdateCoupon(props: any) {

    const [couponInfo, setCouponInfo] = useState(props.couponInfo)

    useEffect(() => {
        setCouponInfo(props.couponInfo)
    }, [props.couponInfo])

    const { visible, setVisible } = useContext(DrawerContext)
    const onClose = () => {
        setVisible(false)
    };

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
                    <Input value={couponInfo.label} onChange={(e) => setCouponInfo({ ...couponInfo, label: e.target.value })} />
                </Form.Item>
                <Form.Item
                    label="优惠券类型"
                >
                    <Select value={couponInfo.is_full_down?'fullCoupon':'voucher '}
                        style={{ width: 120 }} onChange={(e) => {
                            console.log(  e === 'fullCoupon');
                            const couponName = e === 'fullCoupon'?true:false
                           return  setCouponInfo({ ...couponInfo, is_full_down: couponName })
                        }}>
                        <Select.Option value="voucher ">代金券</Select.Option>
                        <Select.Option value="fullCoupon">满减券</Select.Option>
                    </Select>

                </Form.Item>
                {
                    couponInfo.is_full_down ?
                        (
                            <>
                                <Form.Item label="满减券" >
                                    <span className="ant-form-text"> 满：</span>
                                    <Form.Item
                                        noStyle
                                    >
                                        <InputNumber
                                            value={couponInfo.limit_price}
                                            onChange={(e: number | string | any) => setCouponInfo({ ...couponInfo, limit_price: e })}
                                        />
                                    </Form.Item>
                                </Form.Item>
                                <Form.Item label="满减券" >
                                    <span className="ant-form-text"> 减：</span>
                                    <Form.Item
                                        noStyle
                                    >
                                        <InputNumber
                                            value={couponInfo.reduce_price}
                                            onChange={(e) => { setCouponInfo({ ...couponInfo, reduce_price: e }) }}
                                        />
                                    </Form.Item>
                                </Form.Item>
                            </>
                        ) :
                        (
                            <Form.Item
                                label="代金券"
                                rules={[{ type: 'number', min: 0, max: 10000 }]}
                            >
                                <InputNumber
                                    value={couponInfo.reduce_price}
                                    min={0}
                                    max={10000}
                                    step={1}
                                    formatter={value => `${value}元`}
                                    parser={(value: any) => value.replace('元', '')}
                                    onChange={(e) => { setCouponInfo({ ...couponInfo, reduce_price: e }) }}
                                />
                            </Form.Item>
                        )
                }
                {console.log(new Date(1603296003000).toLocaleDateString())}
                {/* {console.log(moment('1603296003000',dateFormat))} */}
                <Form.Item label="日期" rules={[{ required: true }]} >
                    <DatePicker.RangePicker showTime
                     defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                     format={dateFormat}
                     onChange={(e)=> {
                         console.log(e);

                     }}
                    />
                </Form.Item>
                <>
                    <Form.Item label="优惠券的描述"  >
                        <Input.TextArea placeholder="请输入对优惠券的描述" value={couponInfo.remarks}
                            onChange={(e) => { setCouponInfo({ ...couponInfo, remarks: e.target.value }) }} />
                    </Form.Item>
                </>
            </Form>
        </Drawer>
    )
}