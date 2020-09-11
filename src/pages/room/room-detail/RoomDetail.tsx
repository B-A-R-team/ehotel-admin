import React, { useState, ReactNode, useEffect } from 'react';
import {
    Card,
    Select,
    Table,
    Input,
    Button,
    Image
} from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import UseRequest from '../../../hooks/useRequest'
import './roomDetail.less'
import { spawn } from 'child_process';

interface IRoomData {
    key: string;
    roomNum: number;
    computer: string;
    imgs: string[];
    isCheckIn: boolean;
}
export default function RoomDetail(props: any) {
    const [loading] = UseRequest()
    const [profileState, setProfileState] = useState(props)
    const [data, setData] = useState([{
        key: '',
        roomNum: 0,
        computer: '',
        imgs: [''],
        isCheckIn: false
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
        setTimeout(() => {
            const data = [
                {
                    key: '1',
                    roomNum: 101,
                    computer: '高配电脑',
                    imgs: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'],
                    isCheckIn: true,
                    bed: '2',
                    shower: '啦啦啦啦啦舒畅',
                    computerNum:'1',
                    people_count:'2'
                },
                {
                    key: '2',
                    roomNum: 301,
                    computer: '高配电脑',
                    imgs: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'],
                    isCheckIn: false,
                    bed: '2',
                    shower: '啦啦啦啦啦舒畅',
                    computerNum:'1',
                    people_count:'2'
                },
                {
                    key: '3',
                    roomNum: 201,
                    computer: '高配电脑',
                    imgs: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'],
                    isCheckIn: false,
                    bed: '2',
                    shower: '啦啦啦啦啦舒畅',
                    computerNum:'1',
                    people_count:'2'

                },
                {
                    key: '4',
                    roomNum: 102,
                    computer: '高配电脑',
                    imgs: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'],
                    isCheckIn: true,
                    bed: '2',
                    shower: '啦啦啦啦啦舒畅',
                    computerNum:'1',
                    people_count:'2'

                },
            ];
            setData(data)
        }, 1000);



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
            render: (data: string) => {
                return (
                    <div className="computer">
                        <span>cpu：{data}</span>
                        <span>显卡：{data}</span>
                        <span>显示器：{data}</span>
                        <span>主板：{data}</span>
                        <span>内存：{data}</span>
                        <span>键盘：{data}</span>
                        <span>鼠标：{data}</span>
                        <span>耳机：{data}</span>
                    </div>
                )
            }
        },
        {
            title: '电脑数量',
            dataIndex: 'computerNum',
            key: 'computerNum',
            width: 110,
            render: (text: any, item: any, index: any) => (<span>{text}个</span>)
        },
        {
            title: '床位',
            dataIndex: 'bed',
            key: 'bed',
            width: 100,
            render: (bed: string) => {
                return (
                    <span>{bed} 个</span>
                )
            }
        },
        {
            title: '浴室配置',
            dataIndex: 'shower',
            key: 'shower',
        },
        {
            title: '可住人数',
            dataIndex: 'people_count',
            key: 'people_count',
            render:(text:string) => {
                return (
                    <>
                        {text} 人                   
                    </>
                )

            }
        },

        {
            title: '房间环境',
            render: (e: any,) => {

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
                <span className={status ? 'isCheckIn notCheck' : 'isCheckIn'} >{status ? '未入住' : '已入住'}</span>
            </div>
        },
        {
            title: '房间详情',
            key: 'action',
            width: 100,
            render: (text: string, record: any) => {
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
                        defaultPageSize: 7,
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