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
    message
} from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { reqRoomeTypeCreate } from '../../../api'
import {reqUpdateRoomType} from '../../../api'
import UploadImgs from '../upload-imgs/uploadImg';
import './addOrUpdate.less'

const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 10 },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
export default function AddOrUpdateRoom(props: any) {
    const h = useHistory()
    const [roomTypeData, setRoomTypeData] = useState({
        roomType: '',
        roomArea: '',
        floor: ''
    })
    const [roomData, setRoomData] = useState({
        id: '',
        roomType: '',
        introduction: '',
        roomNum: '',
        computer: {},
        imgs: [''],
        computerNum: '',
        shower: '',
        people_count: '',
        bed: ''
    })
    const [computerConfig, setComputerConfig] = useState({
        CPU: '',
        master: '',
        keyboard: '',
        mouse: '',
        displayCard: '',
        displayer: '',
        memory: '',
        headset: ''
    })
    // 这里虽然用的bool类型但是 下面赋值的时候强转为其他类型了
    let houseTypeId = false
    let addHouseId = false
    if (props.location.query) {
        houseTypeId = props.location.query.houseTypeId
        addHouseId = props.location.query.addHouseId
    }
    useEffect(() => {
        // 进入方式   
        if (houseTypeId) {
           
            setRoomTypeData({
                roomType: '高级电竞房',
                roomArea: '20',
                floor: '11'
            })
        }
        if (addHouseId) {
            setRoomData({
                id: '2',
                roomType: '大床房',
                introduction: '舒适，安静',
                roomNum: '400',
                computer: { CPU: 'i7-1234', displayCard: 'GTX1080Ti', displayer: 'lalala', memory: '8G', keyboard: '黑爵', mouse: '罗技', master: 'nb', headset: 'beats' },
                imgs: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                ],
                bed: '1',
                people_count: '2',
                computerNum: '2',
                shower: 'lalala'
            })
            setComputerConfig({
                CPU: 'i7-1234',
                displayCard: 'GTX1080Ti',
                displayer: 'lalala',
                memory: '8G',
                keyboard: '黑爵',
                mouse: '罗技',
                master: 'nb',
                headset: 'beats'
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
    const handleRoomType =async () => {
        if(houseTypeId) {
            const data = await reqUpdateRoomType({id:houseTypeId,type_name:roomTypeData.roomType})
            console.log(data.code);
            if(data.code === 0) {
                h.replace('/room')
                return message.success('修改成功');
            } else {
                return message.error('修改失败');
            }
        }
        const data = await reqRoomeTypeCreate(roomTypeData)
        console.log(data);
        console.log(roomTypeData)

    }
    const handleRoom = () => {
        console.log(roomData)
        console.log(computerConfig)
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
                            <Input value={roomTypeData.roomArea} onChange={(e: any) => setRoomTypeData({ ...roomTypeData, roomArea: e.target.value })} />
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
                                <Select.Option value="1">大床房</Select.Option>
                                <Select.Option value="2">主题大床房</Select.Option>
                                <Select.Option value="3">高配电竞大床房</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="房间号" rules={[{ required: true }]}>
                            <Input value={roomData.roomNum} onChange={(e: any) => { setRoomData({ ...roomData, roomNum: e.target.value }) }} />
                        </Form.Item>
                        {/* <Form.Item label="电脑配置">
                            <Input.TextArea value={roomData.computer} onChange={(e: any) => { setRoomData({ ...roomData, computer: e.target.value }) }} />
                        </Form.Item> */}
                        <Form.Item label="房间简介"  >
                            <Input.TextArea value={roomData.introduction} onChange={(e: any) => { setRoomData({ ...roomData, introduction: e.target.value }) }} />
                        </Form.Item>
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
                        <Form.Item label="电脑数量" rules={[{ required: true }]}>
                            <Input value={roomData.computerNum} onChange={(e: any) => setRoomData({ ...roomData, computerNum: e.target.value })} />
                        </Form.Item>
                        <Form.Item label="床位数" rules={[{ required: true }]}>
                            <Input value={roomData.bed} onChange={(e: any) => setRoomData({ ...roomData, bed: e.target.value })} />
                        </Form.Item>
                        <Form.Item label="入住人数" rules={[{ required: true }]}>
                            <Input value={roomData.people_count} onChange={(e: any) => setRoomData({ ...roomData, people_count: e.target.value })} />
                        </Form.Item>

                        <Form.Item label="浴室配置" rules={[{ required: true }]}>
                            <Input.TextArea value={roomData.shower} onChange={(e: any) => setRoomData({ ...roomData, shower: e.target.value })} />
                        </Form.Item>
                    </Col>
                    <Col span={6} >
                        <Form.Item label="CPU" rules={[{ required: true }]}>
                            <Input value={computerConfig.CPU} onChange={(e: any) => setComputerConfig({ ...computerConfig, CPU: e.target.value })} />
                        </Form.Item>
                        <Form.Item label="显卡" rules={[{ required: true }]}>
                            <Input value={computerConfig.displayCard} onChange={(e: any) => setComputerConfig({ ...computerConfig, displayCard: e.target.value })} />
                        </Form.Item>
                        <Form.Item label="主板" rules={[{ required: true }]}>
                            <Input value={computerConfig.master} onChange={(e: any) => setComputerConfig({ ...computerConfig, master: e.target.value })} />
                        </Form.Item>

                        <Form.Item label="显示器" rules={[{ required: true }]}>
                            <Input value={computerConfig.displayer} onChange={(e: any) => setComputerConfig({ ...computerConfig, displayer: e.target.value })} />
                        </Form.Item>

                    </Col>
                    <Col span={6}>
                        <Form.Item label="内存" rules={[{ required: true }]}>
                            <Input value={computerConfig.memory} onChange={(e: any) => setComputerConfig({ ...computerConfig, memory: e.target.value })} />
                        </Form.Item>
                        <Form.Item label="键盘" rules={[{ required: true }]}>
                            <Input value={computerConfig.keyboard} onChange={(e: any) => setComputerConfig({ ...computerConfig, keyboard: e.target.value })} />
                        </Form.Item>
                        <Form.Item label="耳机" rules={[{ required: true }]}>
                            <Input value={computerConfig.headset} onChange={(e: any) => setComputerConfig({ ...computerConfig, headset: e.target.value })} />
                        </Form.Item>
                        <Form.Item label="鼠标" rules={[{ required: true }]}>
                            <Input value={computerConfig.mouse} onChange={(e: any) => setComputerConfig({ ...computerConfig, mouse: e.target.value })} />
                        </Form.Item>
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

//map  方法
// const labels = [[{ label: '电脑数量', value: 'computerNum' }, { label: '床位数', value: 'bed' }, { label: '入住人数', value: 'checkInNum' }, { label: '浴室配置', value: 'shower' }],
// [{ label: 'CPU', value: 'CPU' }, { label: '显卡', value: 'xinaka' }, { label: '主板', value: 'zhuban' }, { label: '显示器', value: 'xianshiqi' }],
// [{ label: '内存', value: 'neicun' }, { label: '键盘', value: 'jianpan' }, { label: '耳机', value: 'erji' }, { label: '鼠标', value: 'shubiao' }]]
// const getFormItem = (labels: string[][], roomData: any) => {
//     return labels.map((colItem: string[], colIndex: number) => {
//         return (
//             <Col span={6} key={colIndex}>
//                 {
//                     colItem.map((item: any, index: number) => {
//                         return (
//                             <Form.Item label={item.label} rules={[{ required: true }]} key={index}>
//                                 {

//                                 }
//                                 <Input value={roomData[item.value]} onChange={(e: any) => setRoomData({ ...roomData, value:e.target.value})} />
//                             </Form.Item>
//                         )
//                     })
//                 }
//             </Col>
//         )
//     })
// }