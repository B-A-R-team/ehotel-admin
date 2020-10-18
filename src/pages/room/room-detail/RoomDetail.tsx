/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, ReactNode, useEffect } from 'react';
import {
    Card,
    Table,
    Input,
    Button,
    Image
} from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { reqRoomByTypeId } from '../../../api'
import './roomDetail.less'
import { PAGE_SIZE } from '../../../utils/constant'
 
interface IRoomData {
    key: string;
    roomNum: number;
    computer: string;
    imgs: string[];
    isCheckIn: boolean;
}
export default function RoomDetail(props: any) {
    const [loading, setLoading] = useState(true)
    const [profileState, setProfileState] = useState(props)
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
                <LeftOutlined onClick={() => { profileState.history.goBack() }} />
            </a>
            <span>&nbsp;详细信息</span>
        </span>
    )
    const tableTitle = (
        <span>
            <Input
                style={{ width: 200, margin: '0 10px' }}
                placeholder='关键字'
                onChange={(event) => { }}

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
                res.data.rooms.map((item: any) => {
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
        // setTimeout(() => {
        //     const data = [
        //         {
        //             key: '1',
        //             roomNum: 101,
        //             computer: '高配电脑',
        //             imgs: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        //                 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'],
        //             isCheckIn: true,
        //             bed: '2',
        //             shower: '啦啦啦啦啦舒畅',
        //             computerNum: '1',
        //             people_count: '2',
        //             roomInfo: ''
        //         },
        //         {
        //             key: '2',
        //             roomNum: 301,
        //             computer: '高配电脑',
        //             imgs: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'],
        //             isCheckIn: false,
        //             bed: '2',
        //             shower: '啦啦啦啦啦舒畅',
        //             computerNum: '1',
        //             people_count: '2',
        //             roomInfo: ''

        //         },

        //     ];
        //     setData(data)
        //     setLoading(false)
        // }, 1000);
    }, [])
    const columns = [
        {
            title: '房间号',
            dataIndex: 'roomNum',
            key: 'roomNum',
            width: 110,
            render: (text: any, item: any, index: any) => (<a>{text}</a>)
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
                        <span>显示器：{data.device || "暂无记录"}</span>
                        <span>主板：{data.mainboard || "暂无记录"}</span>
                        <span>内存：{data.memory || "暂无记录"}</span>
                        <span>键盘：{data.keyboard || "暂无记录"}</span>
                        <span>鼠标：{data.mouse || "暂无记录"}</span>
                        <span>耳机：{data.earphone || "暂无记录"}</span>
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
                            src={item}
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
            render: (status: Boolean) => <div style={{ textAlign: "center" }}>
                <span className={!status ? 'isCheckIn notCheck' : 'isCheckIn'} >{!status ? '未入住' : '已入住'}</span>
            </div>
        },
        {
            title: '房间详情',
            key: 'action',
            width: 100,
            render: (record: any) => {
                return (
                    <>
                        <a onClick={() => { props.history.push({ pathname: '/room/addOrUpdateRoom', query: { addHouseId: record.key } }) }}>点击修改</a>
                        {record.isCheckIn ? (<span>暂无详情</span>) : (<a onClick={() => { }}>查看详情</a>)}
                    </>
                )
            }
        }
    ];
    return (
        <Card className="card" title={title}>
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
                        onChange: (e) => { console.log(e); },
                        position: ['bottomCenter']

                    }}
                />

            </Card>

        </Card>
    )
} 