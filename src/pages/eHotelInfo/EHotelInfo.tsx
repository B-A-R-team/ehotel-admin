/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Divider, Card, Upload, Image } from 'antd';
import { Link } from 'react-router-dom'
import './eHotelInfo.less'
import { reqEHotelInfo } from '../../api/index'
import storageUtils from '../../utils/storageUtils'
import { BASE_URL } from '../../utils/constant';

export default () => {

    const [loading, setloading] = useState(true);
    const [info, setInfo] = useState({
        id: '',
        avatar: "",
        eHotelName: '',
        phone: '',
        address: '',
        desc: '',
        end_time:'',
        open_time:''
    })

    useEffect(() => {
        async function test() {
            const hotelId = storageUtils.getUser().id
            const hotelInfo = await reqEHotelInfo(hotelId)
            setloading(false);
            const { code, data } = hotelInfo
            if (parseInt(code) === 0) {
                const { address, phone, desc, title, swiperList, id, end_time, open_time } = data
                setInfo({
                    id,
                    desc,
                    avatar: swiperList[0],
                    eHotelName: title,
                    phone,
                    address,
                    end_time,
                    open_time
                })
            }
        }
        test()

    }, [])
    const title = (
        <span>
            <span>商家基本信息管理</span>
        </span>
    )
    return (
        <Card title={title} >
            <Card loading={loading} className="in-card">
                <div className="ehotel-main">
                    <div className="my-card">
                 
                        <span>店名: {info.eHotelName}</span>
                        <Divider dashed></Divider>

                        <span>营业时间:早 {info.open_time}</span>
                        <Divider dashed></Divider>
                             
                        <span>营业时间:晚 {info.end_time}</span>
                        <Divider dashed></Divider>



                        <span>电话: {info.phone}</span>
                        <Divider dashed></Divider>

                        <span>简介: {info.desc}</span>
                        <Divider dashed></Divider>

                        <span>地址: {info.address}</span>
                    </div>
                    <Link to={`/eHotelInfo/update/${info.id}`} className="ant-btn ant-btn-primary link-btn">修改信息</Link>
                </div>
            </Card>
        </Card>
    );

}
