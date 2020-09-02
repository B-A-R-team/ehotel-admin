import React, { useState, useEffect, createContext } from 'react';
import useRequest from '../../hooks/useRequest'
import { Card, Modal, Divider, Spin } from 'antd'

import UpdateCoupon from './update-coupon/UpdateCoupon'
import './coupon.less'

export let DrawerContext: any = createContext(false)

export default function Coupon() {
    const couponsOut = {
        couponName: '',
        couponType: '',
        fullCoupon: 0,
        subCoupon: 0,
        startTime: '',
        endTime: '',
        introduction: '',
        discountCoupon: 0
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
    const [loading] = useRequest();
    const [updateCouponInfo,setUpdateCouponInfo] = useState({...couponsOut})
    const showDrawer = (item: any, index: number) => {
        // console.log(item);
        setVisible(true)
        setUpdateCouponInfo(item)
    };
    useEffect(() => {
        const couponInfos = [
            {
                couponName: 'daquan',
                couponType: 'fullCoupon',
                fullCoupon: 50,
                subCoupon: 10,
                startTime: '2020-08-20 16:00:00',
                endTime: '2020-08-22 16:00:00',
                introduction: '123456',
                discountCoupon: 9
            },
            {
                couponName: 'xiaoquan',
                couponType: 'fullCoupon',
                fullCoupon: 100,
                subCoupon: 20,
                startTime: '2020-08-20 16:00:00',
                endTime: '2020-09-30 16:00:00',
                introduction: 'mmm',
                discountCoupon: 9
            },
            {
                couponName: 'mmmm',
                couponType: 'discountCoupon',
                fullCoupon: 50,
                subCoupon: 10,
                startTime: '2020-08-20 16:00:00',
                endTime: '2020-11-29 16:00:00',
                introduction: 'mmm',
                discountCoupon: 9
            },
            {
                couponName: 'xxxx',
                couponType: 'discountCoupon',
                fullCoupon: 50,
                subCoupon: 10,
                startTime: '2020-11-20 16:00:00',
                endTime: '2020-11-29 16:00:00',
                introduction: 'mmm',
                discountCoupon: 9
            },
            {
                couponName: 'hhhh',
                couponType: 'fullCoupon',
                fullCoupon: 50,
                subCoupon: 10,
                startTime: '2020-11-20 16:00:00',
                endTime: '2020-11-29 16:00:00',
                introduction: 'mmm',
                discountCoupon: 9
            },

        ]

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const nowDate = new Date().getTime();
        let notStartArr: any[] = []
        let startArr: any[] = []
        let endArr: any[] = []
        couponInfos.forEach((item, index) => {
            let startTime = new Date(item.startTime).getTime()
            let endTime = new Date(item.endTime).getTime()
            if (endTime < nowDate) {
                endArr.push(item)
            } else if (startTime <= nowDate && nowDate < endTime) {
                startArr.push(item)
            } else if (startTime > nowDate && endTime > nowDate) {
                notStartArr.push(item)
            }
        })
        setTimeout(() => {
            setCouponArr([startArr, notStartArr, endArr])
        }, 1000);
    }, [])

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

    const deleteCoupon = (titleIndex: number, index: number) => {
        // setVisible(true)
        modal.confirm({
            title: '删除该优惠券!',
            content: (
                <>
                    你确定要删除这个优惠券么？
                </>
            ),
            onCancel: () => { },
            onOk: () => {
                couponArr[titleIndex].splice(index, 1)
            },
            okText: '确定',
            cancelText: '取消'
        })
    }
    return (

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
                                                        <span className="coupon-name">{item.couponType === 'fullCoupon' ? '满减券' : '打折券'}</span>
                                                        <span className="coupon-delete" onClick={() => deleteCoupon(titleIndex, index)} >x</span>
                                                        <Divider />
                                                        {item.couponType === 'fullCoupon' ? (
                                                            <span className="discount" >满{item.fullCoupon}&nbsp;减{item.subCoupon}</span>
                                                        ) :
                                                            (<span className="discount" >{item.discountCoupon}折</span>)
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
            <DrawerContext.Provider value={{ visible, setVisible }}>
                <UpdateCoupon couponInfo={updateCouponInfo} />
            </DrawerContext.Provider>
        </Card>
    )
}