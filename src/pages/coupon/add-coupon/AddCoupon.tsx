import React, { useState } from 'react';
import { Card } from 'antd'
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
    return (
        <Card title={title} style={{ height: 800 }}>

        </Card>
    )
}