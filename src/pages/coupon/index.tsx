/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, createContext } from 'react';
import { Card, Modal, Divider, Spin, message } from 'antd'

import UpdateCoupon from './update-coupon/UpdateCoupon'
import './coupon.less'
import { reqAllCoupon, reqDelCoupon } from '../../api';
export let DrawerContext: any = createContext(false)

export default function Coupon() {
    const couponsOut = {
        id: '1',
        is_full_down: true,
        start_time: '', //开始时间
        end_time: '', //结束时间
        remarks: '', //备注
        limit_price: '',
        reduce_price: '',
        label: '',
        is_used: false
    }
    const [isNotEmpty, setIsNotEmpty] = useState(true);
    const [visible, setVisible] = useState(false)
    const [couponArr, setCouponArr] = useState(
        [
            [{ ...couponsOut }],
            [{ ...couponsOut }],
            [{ ...couponsOut }]
        ]
    )
    const [loading, setLoading] = useState(true);
    //传入抽屉的数据
    const [updateCouponInfo, setUpdateCouponInfo] = useState({ ...couponsOut })
    const showDrawer = (item: any, index: number) => {
        setVisible(true)
        console.log(item);
        setUpdateCouponInfo(item)
    };
    useEffect(() => {
        reqAllCoupon().then((res: any) => {
            if (res.code === 0) {
                const nowDate = new Date().getTime();
                // console.log(nowDate);
                let notStartArr: any[] = []
                let startArr: any[] = []
                let endArr: any[] = []
                res.data.forEach((item: any, index: number) => {
                    // let start_time = new Date(item.start_time).getTime()
                    const { start_time, end_time } = item
                    // let end_time = new Date(item.end_time).getTime()
                    if (end_time < nowDate) {
                        endArr.push(item)
                    } else if (start_time <= nowDate && nowDate < end_time) {
                        startArr.push(item)
                    } else if (start_time > nowDate && end_time > nowDate) {
                        notStartArr.push(item)
                    }
                })
                setCouponArr([startArr, notStartArr, endArr])
                setLoading(false)
            }
        })
    }, [visible])
    const title = (
        <span>
            <span style={{ fontSize: 14 }}>
                优惠卷管理 / &nbsp;
                <span style={{ fontSize: 13 }}>
                    我的优惠卷
                </span>
            </span>
        </span>
    )
    const titleArr = [
        { title: '进行中', styles: 'coupons-start' },
        { title: '未开始 ', styles: 'coupons-start border-color' },
        { title: '已过期', styles: 'coupons-start border-color' }
    ]
    const [modal, contextHolder] = Modal.useModal();

    const deleteCoupon = (titleIndex: number, index: number, id: string) => {
        // setVisible(true)
        console.log(id);
        modal.confirm({
            title: '删除该优惠券!',
            content: (
                <>
                    你确定要删除这个优惠券么？
                </>
            ),
            onCancel: () => { },
            onOk: async () => {
                const res:any = await  reqDelCoupon(id)
                if (res.code === 0 && res.data.affected === 1) {
                    couponArr[titleIndex].splice(index, 1)
                    message.success('删除成功')

                }

            },
            okText: '确定',
            cancelText: '取消'
        })
    }
    return (
        <div>
            <Card title={title} className="card">
                {contextHolder}
                <div className={isNotEmpty ? 'none' : ''}>暂无优惠卷</div>

                <div className="coupon">
                    {
                        titleArr.map((cardItem, titleIndex) => {
                            return (
                                <Card className="my-card" key={titleIndex} title={(<span style={{ fontSize: 13 }}>{cardItem.title}</span>)}>
                                    <Spin spinning={loading}>
                                        <div className="coupons" >

                                            {
                                                couponArr[titleIndex].map((item, index) => {
                                                    return (

                                                        <div className={cardItem.styles} key={index}>
                                                            <span className="coupon-name">{item.is_full_down ? '满减券' : '代金券'}</span>
                                                            <span className="coupon-delete" onClick={() => deleteCoupon(titleIndex, index, item.id)} >x</span>
                                                            <Divider />
                                                            {item.is_full_down ? (
                                                                <span className="discount" >满{item.limit_price}&nbsp;减{item.reduce_price}</span>
                                                            ) :
                                                                (<span className="discount" >{item.reduce_price}元</span>)
                                                            }

                                                            <span className="update-btn" onClick={() => showDrawer(item, index)}>修改</span>
                                                        </div>
                                                    )
                                                })
                                            }

                                        </div>
                                    </Spin>
                                </Card>
                            )
                        })
                    }
                </div>

            </Card>
            <DrawerContext.Provider value={{ visible, setVisible }}>
                <UpdateCoupon couponInfo={updateCouponInfo} />
            </DrawerContext.Provider>
        </div>
    )
}