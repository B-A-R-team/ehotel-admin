import React, { useState } from 'react'
import {
    Card,
    Select,
    Table,
    Input,
    Tag,
    Space,
    Button,
     Form,
    InputNumber,
} from 'antd'
import { LeftOutlined } from '@ant-design/icons'

export default function UpdateRoom(props:any) {
    const title = (
        <span>
            <a onClick={(e) => e.preventDefault()}>
                <LeftOutlined onClick={() => { props.history.goBack() }} />
            </a>
            <span>&nbsp;修改房型&房间</span>
        </span>
    )
    return (
        <Card title={title} className="card">

        </Card>
    )
}