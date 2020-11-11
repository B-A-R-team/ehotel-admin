/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
    Card,
    Table,
    Input,
    Button,
    Image,
    message
} from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { reqRoomByTypeId, reqDelRoom, reqRoomById, reqUpdateRoom } from '../../../api'
import './roomDetail.less'
import { BASE_URL, PAGE_SIZE } from '../../../utils/constant'
import Modal from 'antd/lib/modal/Modal';

export default function RoomDetail(props: any) {
    const [loading, setLoading] = useState(true)
    const [profileState] = useState(props)
    const [modal, contextHolder] = Modal.useModal();
    const [data, setData] = useState([{
        key: '',
        roomNum: 0,
        computer: {},
        imgs: [''],
        isCheckIn: false,
        roomInfo: {}
    }])
    const title = (
        <span>
            <a href="" onClick={(e) => e.preventDefault()}>
                <LeftOutlined onClick={() => { profileState.history.push('/room') }} />
            </a>
            <span>&nbsp;详细信息</span>
        </span>
    )
    const tableTitle = (
        <span>
            <Input
                style={{ width: 200, margin: '0 10px' }}
                placeholder='关键字'
                onChange={() => { }}

            />
            <Button type='primary' onClick={() => { }}>搜索</Button>
        </span>

    )
    useEffect(() => {
        setData([])
        reqRoomByTypeId(props.match.params.houseId).then((res: any) => {
            // console.log(res.data.rooms);
            if (res.code === 0) {
                let myArr: any = []
                res.data.rooms.forEach((item: any) => {
                    myArr.push({
                        key: item.id,
                        imgs: JSON.parse(item.img_url || "[]"),
                        roomInfo: JSON.parse(item.room_info),
                        computer: JSON.parse(item.computer_info),
                        roomNum: item.room_num,
                        isCheckIn: item.is_used
                    })
                })
                // console.log(myArr);
                setData(myArr)
                setLoading(false)

            }
        })

        // eslint-disable-next-line
    }, [])
    const columns = [
        {
            title: '房间号',
            dataIndex: 'roomNum',
            key: 'roomNum',
            width: 110,
            render: (text: any) => (<a>{text}</a>)
        },

        {
            title: '电脑配置',
            dataIndex: 'computer',
            key: 'computer',
            width: 230,
            //   电脑配置： cpu   显卡  显示器 主板 内存 键盘 鼠标 耳机 
            render: (data: any) => {
                return (
                    <div className="computer">
                        <span>cpu：{data.cpu || "暂无记录"}</span>
                        <span>显卡：{data.gpu || "暂无记录"}</span>
                        <span>主板：{data.mainboard || "暂无记录"}</span>
                        <span>内存：{data.memory || "暂无记录"}</span>
                        <span>键盘：{data.keyboard || "暂无记录"}</span>
                        <span>鼠标：{data.mouse || "暂无记录"}</span>
                        <span>耳机：{data.earphone || "暂无记录"}</span>
                        <span>显示器：{data.device || "暂无记录"}</span>
                    </div>
                )
            }
        },
        {
            title: '电脑数量',
            width: 110,
            render: (e: any) => {
                // console.log(e);
                return (
                    <>{e.roomInfo.computer_count}</>
                )

            }
        },
        {
            title: '床位',
            render: (e: any) => {
                // console.log(e);
                return (
                    <>{e.roomInfo.bed_count}</>
                )

            }
        },
        {
            title: '浴室配置',
            render: (e: any) => {
                // console.log(e);
                return (
                    <>{e.roomInfo.bathroom}</>
                )

            }
        },
        {
            title: '可住人数',
            key: 'people_count',
            render: (e: any) => {
                // console.log(e);
                return (
                    <>{e.roomInfo.people_count}</>
                )

            }
        },

        {
            title: '房间环境',
            render: (e: any) => {
                return e.imgs.map((item: any, index: number) => {
                    return (
                        <Image
                            key={index}
                            style={{ marginRight: 10 }}
                            width={80}
                            src={BASE_URL + item}
                        />
                    )
                })
            }
        },
        {
            title: '入住状态',
            dataIndex: 'isCheckIn',
            key: 'isCheckIn',
            width: 150,
            render: (status: Boolean, record: any) => <div style={{ textAlign: "center" }}>
                <span
                    className={!status ? 'isCheckIn notCheck' : 'isCheckIn'}
                    onClick={() => { record.isCheckIn && updateRoomStatus(record) }} >{!status ? '未入住' : '已入住'}</span>
            </div>
        },
        {
            title: '房间详情',
            key: 'action',
            width: 100,
            render: (record: any) => {
                return (
                    <>
                        <Button type="primary" ghost onClick={() => { props.history.push({ pathname: '/room/addOrUpdateRoom', query: { addHouseId: record.key } }) }}>点击修改</Button>
                        {record.isCheckIn ? (<Button danger disabled
                            style={{ display: 'inline-block', margin: '20px 0' }}>
                            点击删除</Button>) : (<Button
                                danger
                                style={{ display: 'inline-block', margin: '20px 0' }}
                                onClick={() => { deleteARoom(record.key) }}
                            >点击删除</Button>)}


                        {record.isCheckIn ? (<Button ghost disabled >暂无详情</Button>) : (<Button onClick={() => { }}>查看详情</Button>)}
                    </>
                )
            }
        }
    ];
    const deleteARoom = (id: number) => {
        // setVisible(true)
        modal.confirm({
            title: '删除该房间!',
            content: (
                <>
                    你确定要删除该间房间么？
                </>
            ),
            onCancel: () => { },
            onOk: async () => {
                const res = await reqDelRoom(id)
                // console.log(res);
                if (res.code === 0 && res.data.affected === 1) {
                    data.splice(id, 1)
                    message.success('删除成功')
                }
            },
            okText: '确定',
            cancelText: '取消'
        })
    }
    const updateRoomStatus = (record: any) => {
        if (record.isCheckIn) {
            modal.confirm({
                title: '修改房间状态!',
                content: (
                    <>
                       <p style={{color:'red'}}>请务必要确保客人已经离开或者房间已经到期。</p>
                       <p>你确定要修改房间状态么？</p>
                    </>
                ),
                onCancel: () => { },
                onOk: async () => {
                   const res = await reqRoomById(record.key)
                    if(res.code === 0) {
                        res.data.is_used = !record.isCheckIn
                        const updateStatus = await reqUpdateRoom(res.data)
                        if(updateStatus.code === 0 && updateStatus.data.affected === 1) {
                            const updateRoomArr = data.map((item:any) => {
                                if(item.key === record.key) {
                                    item.isCheckIn = false
                                }
                                return item
                            })
                            setData(updateRoomArr)
                            message.success('变更成功')
                        }
                    }
                },
                okText: '确定',
                cancelText: '取消'
            })
        }
    }
    return (
        <Card className="card" title={title}>
            {contextHolder}
            <Card title={tableTitle}>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    loading={loading}
                    pagination={{
                        defaultPageSize: PAGE_SIZE,
                        total: 4,
                        showQuickJumper: true,
                        onChange: () => { },
                        position: ['bottomCenter']

                    }}
                />

            </Card>

        </Card>
    )

} 
