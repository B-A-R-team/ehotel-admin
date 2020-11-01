/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-template-curly-in-string */
import React, { useState, useRef, useEffect } from 'react'
import { Card, Form, Input, Button, Row, Col, message } from 'antd';
import { LeftOutlined } from '@ant-design/icons'
import AMapLoader from '@amap/amap-jsapi-loader';
import './update.less'
import { MAP_KEY } from '../../../utils/constant'
import { FormInstance } from 'antd/lib/form';
import { reqEHotelInfo, reqUpdateHotelInfo } from '../../../api';
// 无奈 使用全局变量 使用state会有冲突
let poi = {
    name: '',
    location: {
        lat: '',
        lng: ''
    }
}

const layout = {
    labelCol: { span: 12, offset: 0 },
    wrapperCol: { span: 12 },
};
const validateMessages = {
    required: '${label} 是必须填写的!',
    types: {
        email: '${label} 不是一个可用的邮箱!',
        number: '${label} 不是一个可用的数字!',
    },
    number: {
        range: '${label}必须在 ${min} 和 ${max}之间',
    },
};

export default (props: any) => {
    const [profileState] = useState(props);
    const [hotelInfo, setHotelInfo] = useState({
        swiperList: [''],
        id: '',
        desc: '',
        latitude: '',
        longitude: ''

    })
    // 表单的实例
    const formRef = useRef<FormInstance>()
    //获取props
    useEffect(() => {
        const id = props.match.params.id
        console.log(props);
        reqEHotelInfo(id).then((res: any) => {
            console.log(res);
            if (res.code === 0) {
                console.log(res);
                setHotelInfo(res.data)
                formRef.current?.setFieldsValue(res.data)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const title = (
        <span>
            <a href="" onClick={(e) => e.preventDefault()}>
                <LeftOutlined onClick={(): any => profileState.history.goBack()} />
            </a>
            <span>&nbsp;修改信息</span>
        </span>
    )
    const onFinish = (values: any) => {
        console.log(values);
        console.log(poi.location.lat)
        console.log(hotelInfo);
        const hotel = {
            ...hotelInfo,
            ...values,
            address: poi.name,
            latitude: poi.location.lat || hotelInfo.latitude,
            longitude: poi.location.lng || hotelInfo.longitude
        }
        console.log(hotel);
        setHotelInfo(hotel)
        reqUpdateHotelInfo(hotel).then((res: any) => {
            console.log(res);
            if (res.code === 0) {
                message.success('修改成功')
                console.log(props);
                // props.history.replice('/eHotelInfo')
                // props.history.replace('/eHotelInfo')
            }
        })
    };
    // 主动给 Input赋值  解决显示bug
    const searchRef = useRef<any>(null)
    // 地图插件
    AMapLoader.load({
        "key": MAP_KEY,
        "version": "1.4.15",
        "plugins": [],
    }).then((AMap) => {
        var map = new AMap.Map('container');
        map.plugin('AMap.Geolocation', function () {
            var geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            });
            map.addControl(geolocation)
            geolocation.getCurrentPosition(function (status: any, result: any) {
                if (status === 'complete') {
                    onComplete(result)
                } else {
                    onError(result)
                }
            });
            function onComplete(data: any) {
                // data是具体的定位信息
                // console.log(data);
            }

            function onError(data: any) {
                // 定位出错
            }

        })
        map.plugin('AMap.Autocomplete', function () {
            // 实例化Autocomplete
            var autoOptions = {
                // input 为绑定输入提示功能的input的DOM ID
                input: 'tipinput'
            }
            var autoComplete = new AMap.Autocomplete(autoOptions);
            map.plugin('AMap.PlaceSearch', function () {
                // 实例化Autocomplete
                var placeSearch = new AMap.PlaceSearch({ map })
                AMap.event.addListener(autoComplete, "select", select);//注册监听，当选中某条记录时会触发
                function select(e: any) {
                    placeSearch.setCity(e.poi.adcode);
                    console.log(e.poi);
                    placeSearch.search(e.poi.name);  //关键字查询查询
                    // 使用全局变量 
                    poi = { name: e.poi.name, location: e.poi.location }
                    console.log(poi);
                    if (searchRef) {
                        searchRef.current.state.value = e.poi.name
                    }
                }
            })
        })
    }).catch(e => {
        console.log(e);
    })

    return (
        <div className="site-card-border-less-wrapper">

            <Card title={title} >

                <Form {...layout} name="nest-messages"
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                    ref={formRef as any}
                    initialValues={{}}
                >
                    <Row>
                        <Col span={8}>

                            <Form.Item name='title' label="店名" rules={[{ required: true }]} >
                                <Input />
                            </Form.Item>
                            <Form.Item name='phone' label="联系电话" rules={[{ required: true }]} >
                                <Input />
                            </Form.Item>
                            <Form.Item name='open_time' label="营业时间：早">
                                <Input />
                            </Form.Item>
                            <Form.Item name='end_time' label="营业时间：晚">
                                <Input />
                            </Form.Item>
                            <Form.Item name='desc' label="简介">
                                <Input.TextArea />
                            </Form.Item>
                            {/* <Form.Item label="上传头像">
                                <Photo imgs={hotelInfo.swiperList[0]} setHotelInfo={setHotelInfo} hotelInfo={hotelInfo} />
                            </Form.Item> */}
                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                                <Button type="primary" htmlType="submit">确定修改</Button>
                            </Form.Item>
                        </Col>
                        <Col span={16}>
                            <Form.Item label="搜索" labelCol={{ span: 3 }} wrapperCol={{ span: 12 }}>
                                <Input id="tipinput" ref={searchRef} autoComplete="off" />
                            </Form.Item>
                            <Form.Item label="地图" labelCol={{ span: 3 }} wrapperCol={{ span: 24 }}>
                                <div className="my-map">
                                    <div style={{ width: 600, height: 600 }} id="container">
                                    </div>
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    );
} 