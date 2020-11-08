/* eslint-disable no-template-curly-in-string */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import {
    Card,
    Select,
    Input,
    Button,
    Form,
    Row,
    Col,
    message,
    InputNumber
} from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { reqRoomType, reqRoomeTypeCreate, reqAddRoom, reqRoomById, reqUpdateRoom } from '../../../api'
import { reqUpdateRoomType } from '../../../api'
import storageUtils from '../../../utils/storageUtils'
import UploadImgs from '../upload-imgs/uploadImg';
import './addOrUpdate.less'

const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 10 },
};
interface ILabel {
    label: string;
    attrName: string;
}

const labelRoomInfo1: ILabel[] = [
    { label: '房间号', attrName: 'roomNum' },
    { label: '房间价格', attrName: 'price' },
    { label: '房间简介', attrName: 'introduction' },

]
const labelRoomInfo: ILabel[] = [
    { label: '电脑数量', attrName: 'computer_count' },
    { label: '人数', attrName: 'people_count' },
    { label: '床位量', attrName: 'bed_count' },
    { label: '浴室配置', attrName: 'bathroom' },

]
const labelComputer: ILabel[] = [
    { label: 'cpu', attrName: 'cpu' },
    { label: '显卡', attrName: 'gpu' },
    { label: '主板', attrName: 'mainboard' },
    { label: '显示器', attrName: 'device' },

]
const labelComputer2: ILabel[] = [
    { label: '内存', attrName: 'memory' },
    { label: '键盘', attrName: 'keyboard' },
    { label: '耳机', attrName: 'earphone' },
    { label: '鼠标', attrName: 'mouse' },

]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AddOrUpdateRoom(props: any) {
    const h = useHistory()
    const [roomTypeData, setRoomTypeData] = useState({
        roomType: '',
        roomArea: 50,
        floor: ''
    })
    const [roomData, setRoomData] = useState({
        id: '',
        introduction: '',
        roomNum: '',
        imgs: [''],
        price: '',
        title:''

    })

    const [roomInfo, setRoomInfo] = useState({
        computer_count: '',
        bathroom: '',
        people_count: '',
        bed_count: ''
    })
    const [computerConfig, setComputerConfig] = useState({
        cpu: '',
        mainboard: '', // 主板
        keyboard: '',  //键盘
        mouse: '',  //鼠标
        gpu: '',  //显卡
        device: '',  //显示器
        memory: '', //内存
        earphone: ''  //耳机
    })
    // 这里虽然用的bool类型但是 下面赋值的时候强转为其他类型了
    let houseTypeId = false
    let addHouseId = false
    if (props.location.query) {
        houseTypeId = props.location.query.houseTypeId
        addHouseId = props.location.query.addHouseId
    }
    let [selectArr, setSelectArr] = useState([])
    useEffect(() => {
        reqRoomType().then((data: any) => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setSelectArr(data.data)
            // console.log(data.data);
        })

        async function getRoomType() {
            const roomType = await reqRoomType()
            if (roomType.code === 0) {
                const roomTypeInfo = roomType.data.find((item: any) => item.id === houseTypeId)
                // console.log(roomTypeInfo);
                setRoomTypeData({
                    roomType: roomTypeInfo.type_name,
                    roomArea: roomTypeInfo.area,
                    floor: roomTypeInfo.floor[0]
                })
            }
        }
        // 进入方式
        if (houseTypeId) {
            getRoomType()
        }
        if (addHouseId) {
            reqRoomById(addHouseId).then((res: any) => {
                const { data } = res
                console.log(res);
                let myRoomInfo = {
                    id: data.type.id.toString() || '未知错误',
                    title: data.title,
                    introduction: data.desc,
                    roomNum: data.room_num,
                    price: data.new_price,
                    roomInfo: JSON.parse(data.room_info || "{}"),
                    computerInfo: JSON.parse(data.computer_info || "{}"),
                    imgs: JSON.parse(data.img_url || "[]")
                }
                console.log(myRoomInfo);

                setRoomData({
                    id: myRoomInfo.id,
                    introduction: myRoomInfo.introduction,
                    imgs: myRoomInfo.imgs,
                    price: myRoomInfo.price,
                    roomNum: myRoomInfo.roomNum,
                    title:myRoomInfo.title
                })
                setRoomInfo({ ...myRoomInfo.roomInfo })
                setComputerConfig({ ...myRoomInfo.computerInfo })
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updateStr = houseTypeId || addHouseId ? "修改" : "添加"

    const title = (
        <span>
            <a onClick={(e) => e.preventDefault()}>
                <LeftOutlined onClick={() => { props.history.goBack() }} />
            </a>
            <span>&nbsp;{updateStr}房型&房间</span>
        </span>
    )
    //添加或修改房间类型
    const handleRoomType = async () => {
        if (houseTypeId) {
            console.log(roomTypeData);
            const data = await reqUpdateRoomType({
                id: houseTypeId,
                type_name: roomTypeData.roomType,
                area: roomTypeData.roomArea,
                floor: [roomTypeData.floor]
            })
            console.log(data.code);
            if (data.code === 0) {
                h.replace('/room')
                return message.success('修改成功');
            } else {
                return message.error('修改失败');
            }
        }
        console.log(roomTypeData)
        const data = await reqRoomeTypeCreate(roomTypeData)
        console.log(data);
        console.log(roomTypeData)
        return message.success('添加成功');

    }
    //添加或修改房间
    const handleRoom = async () => {
        const userInfo = storageUtils.getUser()
        const computer_info = JSON.stringify(computerConfig)
        const room_info = JSON.stringify(roomInfo)
        // 找到当前选中type_name
        const seletTitle =  selectArr.find((item:any) => item.id.toString() === roomData.id) || {type_name:''}
        const data = {
            title:seletTitle.type_name,
            room_num: roomData.roomNum,
            new_price: roomData.price,
            desc: roomData.introduction,
            img_url: JSON.stringify(roomData.imgs),
            room_info: room_info,
            computer_info: computer_info,
            typeId: roomData.id,
            hotelId: userInfo.id
        }
        if (addHouseId) {
            console.log(data);
            const res = await reqUpdateRoom({ id: addHouseId, ...data })
            console.log(res);
            if (res.code === 0) {
                return message.success('修改成功')

            } else {
                return message.error('修改失败')

            }
        }
        const res = await reqAddRoom(data)
        console.log(res);
        if (res.code === 0) {
            message.success('添加成功');
        }
    }

    const typeCard = (

        <Card title={<span> {updateStr}房型</span>}>
            <Form {...layout}>

                <Row>
                    <Col span={6}>

                        <Form.Item label="房间类型">
                            <Input value={roomTypeData.roomType} onChange={(e: any) => { setRoomTypeData({ ...roomTypeData, roomType: e.target.value }) }} />
                        </Form.Item>
                        <Form.Item label="房间面积" rules={[{ required: true }]}>
                            <InputNumber value={roomTypeData.roomArea} onChange={(e: any) => {
                                console.log(e);
                                return setRoomTypeData({ ...roomTypeData, roomArea: parseInt(e) })
                            }} />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
                            <Button type="primary" onClick={handleRoomType}>
                                {updateStr}
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col span={6}>

                        <Form.Item label="房型楼层" rules={[{ required: true }]}>
                            <Input value={roomTypeData.floor} onChange={(e: any) => setRoomTypeData({ ...roomTypeData, floor: e.target.value })} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

        </Card >
    )

    const detailCard = (
        <Card style={{ marginTop: 10 }} title={<span>{updateStr}房间</span>}>
            <Form {...layout}>

                <Row>
                    <Col span={6}>
                        <Form.Item label="房间类型" rules={[{ required: true }]} initialValue="1">
                            <Select value={roomData.id} onChange={(e: string) => { setRoomData({ ...roomData, id: e }) }}>
                                {/* map  出来 */}
                                {
                                    selectArr.map((item: any, index: number) => {
                                        return (
                                            <Select.Option value={item.id.toString()} key={index}>{item.type_name}</Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                        {getForm(roomData, setRoomData, labelRoomInfo1)}
                        <Form.Item label="房间图片" wrapperCol={{ span: 24 }}>
                            <UploadImgs imgs={roomData.imgs} inMode={!!addHouseId} />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }} >
                            <Button type="primary" onClick={handleRoom}>
                                {updateStr}
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        {getForm(roomInfo, setRoomInfo, labelRoomInfo)}
                    </Col>
                    <Col span={6} >
                        {getForm(computerConfig, setComputerConfig, labelComputer)}
                    </Col>
                    <Col span={6}>
                        {getForm(computerConfig, setComputerConfig, labelComputer2)}
                    </Col>
                </Row>
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

function getForm(state: any, setState: any, label: any) {
    return label.map((item: ILabel, index: number) => {
        if (item.label === '浴室配置') {
            return (
                <Form.Item label={item.label}  key={index}>
                    <Input.TextArea value={state[item.attrName]} onChange={(e: any) => {
                        let _state = { ...state }
                        _state[item.attrName] = e.target.value
                        return setState(_state)
                    }} />
                </Form.Item>
            )
           
        } else if(item.label === '房间价格' || item.label === '电脑数量' || item.label === '床位量' || item.label === '人数') {
            return (
                <Form.Item label={item.label} key={index}>
                    <InputNumber value={state[item.attrName]} onChange={(e: any) => {
                        let _state = { ...state }
                        _state[item.attrName] = parseInt(e)
                        // InputNumber 类型 在添加的时候 state[item.attrName] 是string类型 但是没有报错
                        // console.log(typeof _state[item.attrName]);
                        return setState(_state)
                    }} />
                </Form.Item>
            )
        }
        else {
            return (
                <Form.Item label={item.label} key={index}>
                    <Input value={state[item.attrName]} onChange={(e: any) => {
                        let _state = { ...state }
                        _state[item.attrName] = e.target.value
                        return setState(_state)
                    }} />
                </Form.Item>
            )
        }

    })
}