import React from 'react';
import './active.less';
import { Card, Image, Tag, Spin } from 'antd';
import {
  SyncOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import useRequest from '../../hooks/useRequest';
import { Link, useHistory } from 'react-router-dom';

const { Meta } = Card;

const data = [
  {
    title: '《Monster Hunter World: Iceborne》最后的"开发者日记"',
    image_url:
      'https://i0.hdslb.com/bfs/album/cec8bfa8c2ac5bb162944a2169c247e93c1f783b.jpg@320w_180h_1e_1c.webp',
    desc:
      '【不容错过】"开发者日记 The Final Stand"将于8月28日晚上8时直播！《Monster Hunter World: Iceborne》最后的"开发者日记"将于8月28日（五）20:00开始播放！届时将会公开"免费大型更新第5弹"中登场的"复活怪物"，你能够猜中是哪只怪物吗?',
    url: 'https://tuzilow.github.io/',
    time: '2020-01-01',
    status: 'in_progress',
  },
  {
    title: '超级马里奥赛车 - 线下友谊赛',
    image_url:
      'https://i0.hdslb.com/bfs/album/2e7085fd1747d0b4029d6423a18f4197cc119976.jpg',
    desc:
      '首届《马力欧卡丁车8 豪华版》“巅峰邀请赛” 将于7月31日20:00开始！此前在预选赛中最终获胜的4位玩家将和特邀嘉宾 lolo今天玩什么、哈尼她姐、馍王MoWang、NS新闻速报 相聚上海同台竞技；Boo战队创始人 任天真真 和LPL知名解说 闫紫境GwAwa 也将来到比赛现场全程解说。到时大家可以在bilibili直播、斗鱼直播、虎牙直播观看这场巅峰对决。',
    url: 'https://tuzilow.github.io/',
    time: '2020-10-01',
    status: 'todo',
  },
  {
    title: '《糖豆人：终极淘汰赛》第二赛季',
    image_url:
      'https://i0.hdslb.com/bfs/album/f6f288c9641abe97a4df8442b64441f568f4e00c.png@518w_1e_1c.png',
    desc:
      '《糖豆人：终极淘汰赛》Steam平台销量成功突破7,000,000份啦！不仅如此，我们还带来了全新的第二赛季内容大揭秘！炫酷的关卡、神秘的中世纪服装......快戳下面的视频先睹为快吧~',
    url: 'https://tuzilow.github.io/',
    time: '2020-11-01',
    status: 'todo',
  },
  {
    title: '[MHWIB] 免费大型游戏更新第4弹',
    image_url:
      'https://i0.hdslb.com/bfs/album/1cbb554c11535ef3e920ed9c407ff368d07273c8.jpg@518w_1e_1c.jpg',
    desc:
      '由于日本已解除“紧急事态宣言”，现恢复开发游戏更新。免费大型游戏更新第4弹的发布日期预定为以下日子：・2020年7月上旬 决定发布日期后，我们将通过官方网站和社交媒体通知大家。 请耐心稍候免费大型游戏更新第4弹的到来。 ​​​​ ',
    url: 'https://tuzilow.github.io/',
    time: '2020-01-01',
    status: 'done',
  },
];

// 根据status生成标签
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

const Active = () => {
  const [loading, startLoading] = useRequest();
  const history = useHistory();

  return (
    <div className="active-page">
      <Spin spinning={loading}>
        <div className="active-card-row">
          <Card
            className="active-card-item add-active"
            onClick={() => {
              history.push('/active/add');
            }}
          >
            <PlusOutlined />
            <span>添加活动</span>
          </Card>
          {data.map((item, index) => (
            <Card
              className="active-card-item"
              key={index}
              cover={
                <Image
                  style={{ paddingTop: '1rem', paddingBottom: 0 }}
                  src={item['image_url']}
                />
              }
            >
              <Meta
                title={<a href={item['url']}>{item['title']}</a>}
                description={
                  <>
                    <a href={item['url']}>{item['desc']}</a>
                    <div className="footer">
                      <span>{item['time']}</span>
                      <span>{tagVariant[item['status']]}</span>
                    </div>
                  </>
                }
              />
            </Card>
          ))}
        </div>
      </Spin>
    </div>
  );
};
export default Active;
