import React, { useState, useEffect } from 'react'
import {
    Card,
    Typography,
    Tag,
    Divider,
    Image,
    Button

} from 'antd'
import {
    LeftOutlined,
    ClockCircleOutlined,
    SyncOutlined,
    MinusCircleOutlined
} from '@ant-design/icons'

import './activeDetail.less'

const { Title, Paragraph, Text } = Typography;
export default function ActiveDetail(props: any) {
    const title = (
        <span>
            <a onClick={(e) => e.preventDefault()}>
                <LeftOutlined onClick={() => { props.history.goBack() }} />
            </a>
            <span>&nbsp;活动详情</span>
        </span>
    )
    const [activeData, setActiveData] = useState<any>({
        id: '',
        title: '',
        imgs: [''],
        desc: '',
        startTime: '',
        endTime: '',
        status: '',
    })
    useEffect(() => {
        if (!props.match.params.id) {
            props.hisroty.replace('/avtive')
        }
        const data = {
            id: '798',
            title: '《糖豆人：终极淘汰赛》第二赛季',
            imgs: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'],
            desc:
                '《糖豆人：终极淘汰赛》Steam平台销量成功突破7,000,000份啦！不仅如此，我们还带来了全新的第二赛季内容大揭秘！炫酷的关卡、神秘的中世纪服装......快戳下面的视频先睹为快吧~',
            startTime: '2020-11-01',
            endTime: '2022-11-01',
            status: 'in_progress',
        }
        setActiveData(data)
        console.log(props);
    }, [])
    const tagVariant: { [index: string]: React.ReactNode } = {
        todo: (
            <Tag icon={<ClockCircleOutlined />} color="cyan">
                未开始
            </Tag>
        ),
        in_progress: (
            <Tag icon={<SyncOutlined spin />} color="processing">
                进行中
            </Tag>
        ),
        done: (
            <Tag icon={<MinusCircleOutlined />} color="default">
                已结束
            </Tag>
        ),
    };

    return (
        <Card
            className="card"
            title={title}
            extra={
                <Button
                    onClick={() => { props.history.push('/active/update/' + activeData.id) }}
                    type="primary">编辑
                </Button>
            }
        >

            <Typography>
                <Title level={2}>标题：{activeData.title}
                </Title>
                <div>
                    {tagVariant[activeData.status]}
                    <span>开始时间：{activeData.startTime}</span>, &nbsp;
                <span>-03-2截止时间：{activeData.endTime}</span>
                </div>
                <Divider className="my-divider" />
                <Paragraph>
                    <Title level={3}>活动图片</Title>
                    {
                        activeData.imgs.map((img: string, index: number) => {
                            return (
                                <Image
                                    key={index}
                                    style={{ marginRight: 10 }}
                                    width={100}
                                    src={img}
                                />
                            )
                        })
                    }

                </Paragraph>
                <Paragraph >
                    <Title level={3} className="my-title">活动简介</Title>
                    <Text strong style={{ fontSize: 17 }}>
                        {activeData.desc}
                    </Text>.
              </Paragraph>
                <Paragraph>
                    <Title level={3}>活动详情</Title>
                    <Text strong style={{ fontSize: 17 }}>
                        lalalalala
                    </Text>.
            </Paragraph>

            </Typography>
        </Card>
    )
}