import React, { useState, useEffect } from 'react';
import { Divider, Card, Upload } from 'antd';
import { Link } from 'react-router-dom'
import { Map } from 'react-amap'
import './eHotelInfo.less'

export default () => {

    const [loading, setloading] = useState(true);
    const [info, setInfo] = useState({
        avatar: "",
        eHotelName: '',
        username: '',
        phone: '',
        address: '',
        email:''
    })

    useEffect(() => {
        setTimeout(() => {
            setloading(false);
            setInfo({
                avatar: "lalal",
                eHotelName: '123',
                username: 'xiaoming',
                phone: '123456',
                address: 'adadasds',
                email:'lts.lyc@qq.com'
            })
        }, 500);

    }, [])
    const title = (
        <span>
            <span>商家基本信息管理</span>
        </span>
    )
    return (
        <Card title={title} loading={loading}>
            <Upload></Upload>
            <div className="ehotel-main">
                <div className="my-card">
                    <span>头像：{info.avatar}</span>
                    <Divider dashed></Divider>
                    <span>店名: {info.eHotelName}</span>
                    <Divider dashed></Divider>

                    <span>负责人: {info.username}</span>
                    <Divider dashed></Divider>

                    <span>邮箱: {info.email}</span>
                    <Divider dashed></Divider>

                    <span>电话: {info.phone}</span>
                    <Divider dashed></Divider>

                    <span>地址: {info.address}</span>
                </div>
                <Link to="/eHotelInfo/update" className="ant-btn ant-btn-primary link-btn">修改信息</Link>
            </div>
        </Card>
    );

}
