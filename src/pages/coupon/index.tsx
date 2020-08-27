import React, { useState } from 'react';

import { Card } from 'antd'
import './coupon.less'

export default function Coupon() {
    const [isEmpty, setIsEmpty] = useState(false);
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
    return (
        <Card title={title} style={{ height: 800 }}>
            {console.log(12345)}
            <div className={isEmpty ? 'none' : ''}>暂无优惠卷</div>
        </Card>
    )
}