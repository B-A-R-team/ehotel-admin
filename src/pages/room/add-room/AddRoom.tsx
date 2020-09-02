import React, { useState, useEffect } from 'react'
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
import Demo from '../upload-imgs/uploadImg';

const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 6 },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not validate email!',
        number: '${label} is not a validate number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
export default function AddRoom(props: any) {
    const [roomTypeData, setRoomTypeData] = useState({
        id:'',
        roomType: '',
        introduction: ''
    })
    const [roomData, setRoomData] = useState({
        id:'',
        roomType: '',
        introduction: '',
        roomNum: '',
        computer: '',
        imgs: []
    })
    let houseTypeId = false
    let addHouseId = false
    if (props.location.query) {
        houseTypeId = props.location.query.houseTypeId
        addHouseId = props.location.query.addHouseId
    }
    useEffect(() => {
        if (houseTypeId) {
            setRoomTypeData({
                id:'',
                roomType: '高级电竞房',
                introduction: '高配置的电脑'
            })
            return
        }
        if (addHouseId) {
            setRoomData({
                id:'2',
                roomType: '大床房',
                introduction: '舒适，安静',
                roomNum: '400',
                computer: 'RTX2080Ti',
                imgs: []
            })
        }
    }, [])

    const updateStr = houseTypeId || addHouseId ? "修改" : "添加"
    const onFinish = (values: any) => {
        console.log(values);
    };
    const title = (
        <span>
            <a onClick={(e) => e.preventDefault()}>
                <LeftOutlined onClick={() => { props.history.goBack() }} />
            </a>
            <span>&nbsp;{updateStr}房型&房间</span>
        </span>
    )
    const handleRoomType = () => {
        console.log(roomTypeData)
    }
    const handleRoom = () => {
        console.log(roomData)
    }
    const typeCard = (

        <Card title={<span> {updateStr}房型</span>}>
            <Form.Item label="房间类型" {...layout} >
                <Input value={roomTypeData.roomType} onChange={(e: any) => { setRoomTypeData({ ...roomTypeData, roomType: e.target.value }) }} />
            </Form.Item>

            <Form.Item {...layout} label="房型介绍" >
                <Input.TextArea value={roomTypeData.introduction} onChange={(e: any) => setRoomTypeData({ ...roomTypeData, introduction: e.target.value })} />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
                <Button type="primary" onClick={handleRoomType}>
                    {updateStr}
                </Button>
            </Form.Item>
        </Card >
    )

    const detailCard = (
        <Card style={{ marginTop: 10 }} title={<span>{updateStr}房间</span>}>
            <Form {...layout}>
                <Form.Item  label="房间类型" rules={[{ required: true }]} initialValue="1">
                    <Select value={roomData.id} onChange={(e:string) => {setRoomData({...roomData,id:e})}}>
                        {/* map  出来 */}
                        <Select.Option value="1">大床房</Select.Option>
                        <Select.Option value="2">主题大床房</Select.Option>
                        <Select.Option value="3">高配电竞大床房</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item  label="房间号" rules={[{ required: true }]}>
                    <Input value={roomData.roomNum} onChange={(e:any) => {setRoomData({...roomData,roomNum:e.target.value})}} />
                </Form.Item>
                <Form.Item  label="电脑配置">
                    <Input.TextArea  value={roomData.computer} onChange={(e:any) => {setRoomData({...roomData,computer:e.target.value})}}/>
                </Form.Item>
                <Form.Item  label="房间简介"  >
                    <Input.TextArea value={roomData.introduction} onChange={(e:any) => {setRoomData({...roomData,introduction:e.target.value})}} />
                </Form.Item>
                <Form.Item label="房间图片">
                    <Demo />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }} >
                    <Button type="primary" onClick={handleRoom}>
                        {updateStr}
                    </Button>
                </Form.Item>
                </Form>
        </Card>
    )
    const getFinalCard = (houseTypeId: any, addHouseId: any) => {
        if (houseTypeId && !addHouseId) {
            return typeCard
        }
        if (addHouseId && !houseTypeId) {
            return detailCard
        }
        return (
            <>
                {
                    typeCard
                }
                {
                    detailCard
                }
            </>
        )
    }
    return (
        <Card className="card" title={title}>
            {
                getFinalCard(houseTypeId, addHouseId)
            }
        </Card>
    )
}