# BAR 酒店后台接口文档

项目根路由`https://www.barteam.cn:1239`

## 项目变量表

请善用`ctrl + F`

| 变量名               | 变量类型                     | 备注                                                                                                                                                                                                                                 |
| -------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| code                 | number                       | 响应状态（0 - 成功，其他 - 失败）                                                                                                                                                                                                    |
| loginforwx.code      | string                       | 微信小程序登陆自动生成的 code                                                                                                                                                                                                        |
| message              | string                       | 响应信息                                                                                                                                                                                                                             |
| token                | string                       | 登陆生成的 token                                                                                                                                                                                                                     |
| total                | number                       | 获得数据条数                                                                                                                                                                                                                         |
| is_business          | boolean                      | 是否为商家                                                                                                                                                                                                                           |
| is_vip               | boolean                      | 是否为 VIP                                                                                                                                                                                                                           |
| paid_balance         | number                       | 付费余额                                                                                                                                                                                                                             |
| free_balance         | number                       | 免费余额（未启用）                                                                                                                                                                                                                   |
| integral（intergal） | number                       | 积分（有的单词打错了）                                                                                                                                                                                                               |
| nickname             | string                       | 昵称                                                                                                                                                                                                                                 |
| name                 | string                       | 姓名                                                                                                                                                                                                                                 |
| pass                 | string                       | 密码                                                                                                                                                                                                                                 |
| avatar_url           | string                       | 头像 URL                                                                                                                                                                                                                             |
| email                | string                       | 邮箱                                                                                                                                                                                                                                 |
| openid               | string                       | 微信小程序登录 openid                                                                                                                                                                                                                |
| person_id            | string                       | 身份证 ID                                                                                                                                                                                                                            |
| swiperList           | string[]                     | 轮播图 URL 数组                                                                                                                                                                                                                      |
| open_time            | string                       | 酒店开门时间                                                                                                                                                                                                                         |
| end_time             | string                       | 酒店关门时间                                                                                                                                                                                                                         |
| owners_id            | string[]                     | 酒店所属用户 id 数组                                                                                                                                                                                                                 |
| room_count           | number                       | 该类房间总数                                                                                                                                                                                                                         |
| max_count            | number                       | 最大入住人数                                                                                                                                                                                                                         |
| empty_count          | number                       | 空房间数目                                                                                                                                                                                                                           |
| hotel.title          | string                       | 酒店名                                                                                                                                                                                                                               |
| room.title           | string                       | 房间名                                                                                                                                                                                                                               |
| room_num             | string                       | 房间门牌编号                                                                                                                                                                                                                         |
| room.desc            | string                       | 房间介绍                                                                                                                                                                                                                             |
| room_info            | JSON 字符串                  | 房间信息{\"area\":\"45\",\"people_count\":\"2\",\"bed_count\":\"2\",\"bathroom\":\"干湿分离 独立浴室 独立卫生间\",\"computer_count\":\"2\",\"floor\":\"11-12\"}                                                                      |
| computer_info        | JSON 字符串                  | 电脑配置信息{\"cpu\":\"i5-9400F\",\"gpu\":\"ITX2080\",\"device\":\"华硕 VG27VQE\",\"mainboard\":\"华硕 13365\",\"memory\":\"金士顿 16G\",\"keyboard\":\"黑峡谷 K735 机械键盘\",\"mouse\":\"罗技 402\",\"earphone\":\"雷蛇北海巨妖\"} |
| old_price            | number                       | 旧价格                                                                                                                                                                                                                               |
| new_price            | number                       | 新价格                                                                                                                                                                                                                               |
| room.img_url         | string[]                     | 房间宣传图 URL 数组                                                                                                                                                                                                                  |
| rooms_id             | string[]                     | 房间 id 数组（未启用）                                                                                                                                                                                                               |
| address              | string                       | 酒店地址                                                                                                                                                                                                                             |
| phone                | string                       | 酒店联系电话                                                                                                                                                                                                                         |
| desc                 | string                       | 酒店简介                                                                                                                                                                                                                             |
| latitude             | number                       | 酒店坐标维度                                                                                                                                                                                                                         |
| longitude            | number                       | 酒店坐标经度                                                                                                                                                                                                                         |
| member               | JSON 字符串                  | {”name“: "xmy", "phone": "123123123", id_card: "1349871203975"}                                                                                                                                                                      |
| status               | ["待入住","待付款","已完成"] | 订单状态                                                                                                                                                                                                                             |

### 复杂变量解释

#### room_info

| 变量名         | 类型   | 备注       |
| -------------- | ------ | ---------- |
| area           | string | 房间面积   |
| people_count   | string | 可住人数   |
| bed_count      | string | 床位数     |
| bathroom       | string | 卫生间介绍 |
| computer_count | string | 电脑数量   |
| floor          | string | 楼层       |

#### computer_info

| 变量名    | 类型   | 备注 |
| --------- | ------ | ---- |
| cpu       | string | CPU  |
| gpu       | string | GPU  |
| device    | string | 硬盘 |
| mainboard | string | 主板 |
| memory    | string | 内存 |
| keyboard  | string | 键盘 |
| mouse     | string | 鼠标 |
| earphone  | string | 耳机 |

## 接口概览表

### 用户接口

| 接口                 | 方法 | 功能               | 跳转                            |
| -------------------- | ---- | ------------------ | ------------------------------- |
| `/users/login`       | POST | 登陆               | [查看详情](#登陆)               |
| `/users/register`    | POST | 注册               | [查看详情](#注册)               |
| `/users/tobusniess`  | PUT  | 成为商家           | [查看详情](#成为商家)           |
| `/users/outbusiness` | PUT  | 退出商家           | [查看详情](#退出商家)           |
| `/users/list`        | GET  | 分页获取用户       | [查看详情](#分页获取用户)       |
| `/users/list/:id`    | GET  | 根据 ID 获取用户   | [查看详情](#根据ID获取用户)     |
| `/users/loginforwx`  | POST | 微信小程序授权登录 | [查看详情](#微信小程序授权登录) |

### 酒店接口

| 接口                    | 方法   | 功能                 | 跳转                              |
| ----------------------- | ------ | -------------------- | --------------------------------- |
| `/hotels/swiper`        | GET    | 获取轮播图           | [查看详情](#获取轮播图)           |
| `/hotels/swiper/update` | PUT    | 修改轮播图           | [查看详情](#修改轮播图)           |
| `/hotels/clientget`     | GET    | 根据 ID 获取酒店信息 | [查看详情](#根据ID获取酒店信息)   |
| `/hotels/getrooms`      | GET    | 获取某酒店的房间信息 | [查看详情](#获取某酒店的房间信息) |
| `/hotels/create`        | POST   | 创建酒店             | [查看详情](#创建酒店)             |
| `/hotels/upload/swiper` | POST   | 上传轮播图           | [查看详情](#上传轮播图)           |
| `/hotels/update/:id`    | PUT    | 修改酒店信息         | [查看详情](#修改酒店信息)         |
| `/hotels/delete/:id`    | DELETE | 注销店面             | [查看详情](#注销店面)             |

### 房间接口

| 接口                | 方法   | 功能             | 跳转                        |
| ------------------- | ------ | ---------------- | --------------------------- |
| `/rooms/create`     | POST   | 创建房间         | [查看详情](#创建房间)       |
| `/rooms/:id`        | GET    | 根据 ID 查找房间 | [查看详情](#根据ID查找房间) |
| `/rooms/update/:id` | PUT    | 修改房间         | [查看详情](#修改房间)       |
| `/rooms/delete/:id` | DELETE | 删除房间         | [查看详情](#删除房间)       |

### 住房记录接口

| 接口                    | 方法   | 功能                                      | 跳转                                                  |
| ----------------------- | ------ | ----------------------------------------- | ----------------------------------------------------- |
| `/records/getbyId`      | GET    | 根据 ID 获取记录                          | [查看详情](#根据ID获取记录)                           |
| `/records/getby`        | GET    | 根据酒店 ID/(房间 ID/客户 ID)获取获取记录 | [查看详情](<#根据酒店ID/(房间ID/客户ID)获取获取记录>) |
| `/records/create`       | POST   | 创建住房记录                              | [查看详情](#创建住房记录)                             |
| `/records/setclose/:id` | PUT    | 将某条记录设置为无效记录                  | [查看详情](#将某条记录设置为无效记录)                 |
| `/records/setopen/:id`  | PUT    | 将某条记录设置为有效记录                  | [查看详情](#将某条记录设置为有效记录)                 |
| `/records/update/:id`   | PUT    | 更新记录信息                              | [查看详情](#更新记录信息)                             |
| `/records/delete/:id`   | DELETE | 删除订单记录                              | [查看详情](#删除订单记录)                             |

### 积分记录接口

| 接口                        | 方法   | 功能                     | 跳转                                |
| --------------------------- | ------ | ------------------------ | ----------------------------------- |
| `/integralLogs/getbyId/:id` | GET    | 根据 id 获取积分记录     | [查看详情](#根据id获取积分记录)     |
| `/integralLogs/getby`       | GET    | 根据用户 id 获取积分记录 | [查看详情](#根据用户id获取积分记录) |
| `/integralLogs/create`      | POST   | 创建积分记录             | [查看详情](#创建积分记录)           |
| `/integralLogs/update/:id`  | PUT    | 更新积分记录             | [查看详情](#更新积分记录)           |
| `/integralLogs/delete/:id`  | DELETE | 删除积分记录             | [查看详情](#删除积分记录)           |

### 活动接口

| 接口                   | 方法   | 功能                 | 跳转                            |
| ---------------------- | ------ | -------------------- | ------------------------------- |
| `/actives/create`      | POST   | 创建活动             | [查看详情](#创建活动)           |
| `/actives/getbyId/:id` | GET    | 根据 ID 查询活动     | [查看详情](#根据ID查询活动)     |
| `/actives/getby`       | GET    | 根据酒店 ID 查询活动 | [查看详情](#根据酒店ID查询活动) |
| `/actives/update/:id`  | PUT    | 修改活动信息         | [查看详情](#修改活动信息)       |
| `/actives/delete/:id`  | DELETE | 删除活动             | [查看详情](#删除活动)           |

## 接口详情

### 用户相关接口

#### 登陆

##### 描述

- 用户登录接口

##### 请求 URL

- `/users/login`

##### 请求方式

- POST

##### Body 参数

| 参数名 | 必选 | 类型   | 说明     |
| ------ | ---- | ------ | -------- |
| email  | √    | string | 登陆邮箱 |
| pass   | √    | string | 密码     |

##### 返回示例

```json
{
  "code": 0,
  "data": {
    "user": {
      "is_business": true,
      "is_vip": false,
      "paid_balance": 0,
      "free_balance": 0,
      "integral": 0,
      "_id": "5f4c7d0a55f2260d90b7b1a1",
      "nickname": "xmy",
      "pass": "xxxxxxx",
      "email": "123456@email.com",
      "__v": 0
    },
    "token": "Bearer xxxxxxxxxx"
  }
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)

#### 注册

##### 描述

- 用户注册接口

##### 请求 URL

- `/users/register`

##### 请求方式

- POST

##### Body 参数

| 参数名   | 必选 | 类型   | 说明     |
| -------- | ---- | ------ | -------- |
| email    | √    | string | 登陆邮箱 |
| pass     | √    | string | 密码     |
| nickname | √    | string | 昵称     |

##### 返回示例

```json
{
  "code": 0,
  "message": "SUCCESS"
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)

#### 分页获取用户

##### 描述

- 分页获取用户信息

##### 请求 URL

- `/users/list?page=1&size=10`

##### 请求方式

- GET

##### Header

| 参数名        | 必选 | 参数值         |
| ------------- | ---- | -------------- |
| Authorization | √    | 登陆获取 token |

##### Query 参数

| 参数名 | 必选 | 类型   | 说明         |
| ------ | ---- | ------ | ------------ |
| page   | √    | number | 请求页码     |
| size   | √    | number | 页面数据容量 |

##### 返回示例

```json
{
  "code": 0,
  "data": {
    "userList": [
      {
        "is_business": false,
        "is_vip": false,
        "paid_balance": 0,
        "free_balance": 0,
        "integral": 0,
        "_id": "5f4c7cdf16d50709706a0902",
        "nickname": "ceshi",
        "pass": "xxxxxxx",
        "email": "abc@email.com",
        "__v": 0
      },
      {
        "is_business": true,
        "is_vip": false,
        "paid_balance": 0,
        "free_balance": 0,
        "integral": 0,
        "_id": "5f4c7d0a55f2260d90b7b1a1",
        "nickname": "xmy",
        "pass": "xxxxxxx",
        "email": "123456@email.com",
        "__v": 0
      },
      {
        "is_business": false,
        "is_vip": false,
        "paid_balance": 0,
        "free_balance": 0,
        "integral": 0,
        "_id": "5f504692b26f3e0d74fa4fb7",
        "nickname": "200OK",
        "avatar_url": "https://xxxxxx",
        "openid": "xxxxx",
        "__v": 0
      }
    ],
    "total": 3
  }
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)

#### 根据 ID 获取用户

##### 描述

- 根据 ID 获取某个用户的信息

##### 请求 URL

- `/users/list/:id`

##### 请求方式

- GET

##### Header

| 参数名        | 必选 | 参数值         |
| ------------- | ---- | -------------- |
| Authorization | √    | 登陆获取 token |

##### Params 参数

| 参数名 | 必选 | 类型   | 说明    |
| ------ | ---- | ------ | ------- |
| id     | √    | string | 用户 ID |

##### 返回示例

```json
{
  "code": 0,
  "data": {
    "is_business": false,
    "is_vip": false,
    "paid_balance": 0,
    "free_balance": 0,
    "integral": 0,
    "_id": "5f504692b26f3e0d74fa4fb7",
    "nickname": "200OK",
    "avatar_url": "https://xxx",
    "openid": "xxxxxxx",
    "__v": 0
  }
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)

#### 成为商家

##### 描述

- 将某个用户的账号设为商家账号

##### 请求 URL

- `/users/tobusiness`

##### 请求方式

- PUT

##### Header

| 参数名        | 必选 | 参数值         |
| ------------- | ---- | -------------- |
| Authorization | √    | 登陆获取 token |

##### Query 参数

| 参数名 | 必选 | 类型   | 说明    |
| ------ | ---- | ------ | ------- |
| id     | √    | string | 用户 ID |

##### 返回示例

```json
{
  "code": 0,
  "message": "SUCCESS"
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)

#### 退出商家

##### 描述

- 将某个商家账号设为非商家账号

##### 请求 URL

- `/users/outbusiness`

##### 请求方式

- PUT

##### Header

| 参数名        | 必选 | 参数值         |
| ------------- | ---- | -------------- |
| Authorization | √    | 登陆获取 token |

##### Query 参数

| 参数名 | 必选 | 类型   | 说明    |
| ------ | ---- | ------ | ------- |
| id     | √    | string | 用户 ID |

##### 返回示例

```json
{
  "code": 0,
  "message": "SUCCESS"
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)

#### 微信小程序授权登录

##### 描述

- 通过小程序登陆
- 只有通过微信小程序才可执行该接口

##### 请求 URL

- `/users/loginforwx`

##### 请求方式

- POST

##### Header

| 参数名        | 必选 | 参数值         |
| ------------- | ---- | -------------- |
| Authorization | √    | 登陆获取 token |

##### Body 参数

| 参数名     | 必选 | 类型   | 说明                          |
| ---------- | ---- | ------ | ----------------------------- |
| nickname   | √    | string | 用户微信昵称                  |
| code       | √    | string | 微信小程序登陆自动生成的 code |
| avatar_url | √    | string | 微信头像 URL                  |

##### 返回示例

```json
{
  "code": 0,
  "user": {
    "is_business": true,
    "is_vip": false,
    "paid_balance": 0,
    "free_balance": 0,
    "integral": 0,
    "_id": "5f4c7d0a55f2260d90b7b1a1",
    "nickname": "xmy",
    "pass": "xxxxxxx",
    "email": "123456@email.com",
    "__v": 0
  },
  "token": "Bearer xxxxxxxxxx"
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)

### 酒店相关接口

#### 获取轮播图

##### 描述

- 获取酒店轮播图

##### 请求 URL

- `/hotels/swiper`

##### 请求方式

- GET

##### Query 参数

| 参数名 | 必选 | 类型   | 说明    |
| ------ | ---- | ------ | ------- |
| id     | √    | string | 酒店 ID |

##### 返回示例

```json
{
  "code": 0,
  "data": [
    "static/1597464405743.jpg",
    "static/1598851474000.jpg",
    "static/1598853777805.png",
    "static/1598853827884.png"
  ]
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)
- data 为轮播图路径数组

#### 修改轮播图

##### 描述

- 修改酒店轮播图

##### 请求 URL

- `/hotels/swiper/update`

##### 请求方式

- PUT

##### Header

| 参数名        | 必选 | 参数值         |
| ------------- | ---- | -------------- |
| Authorization | √    | 登陆获取 token |

##### Body 参数

| 参数名        | 必选 | 类型     | 说明                   |
| ------------- | ---- | -------- | ---------------------- |
| id            | √    | string   | 酒店 ID                |
| swiperUrlList | √    | string[] | 更新后的轮播图路径数组 |

##### 返回示例

```json
{
  "code": 0,
  "message": "SUCCESS"
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)

#### 根据 ID 获取酒店信息

##### 描述

- 根据 ID 获取酒店信息

##### 请求 URL

- `/hotels/clientget?id=xxxxxx`

##### 请求方式

- GET

##### Query 参数

| 参数名 | 必选 | 类型   | 说明    |
| ------ | ---- | ------ | ------- |
| id     | √    | string | 酒店 ID |

##### 返回示例

```json
{
  "code": 0,
  "data": {
    "swiperList": [
      "static/1597464405743.jpg",
      "static/1598851474000.jpg",
      "static/1598853777805.png",
      "static/1598853827884.png"
    ],
    "open_time": "08:00",
    "end_time": "22:00",
    "owners_id": ["5f4c7d0a55f2260d90b7b1a1"],
    "_id": "5f15898e9e625204e0c20b29",
    "rooms_id": [],
    "title": "测试酒店222",
    "address": "河南",
    "phone": "123456",
    "desc": "无简介111",
    "__v": 0,
    "latitude": 34,
    "longitude": 113
  }
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)
- `rooms_id`未启用

#### 获取某酒店的房间信息

##### 描述

- 根据 ID 获取某酒店的房间信息

##### 请求 URL

- `/hotels/getrooms?id=xxxxxx`

##### 请求方式

- GET

##### Query 参数

| 参数名 | 必选 | 类型   | 说明    |
| ------ | ---- | ------ | ------- |
| id     | √    | string | 酒店 ID |

##### 返回示例

```json
{
  "code": 0,
  "data": [
    {
      "room_count": 4,
      "max_count": 2,
      "empty_count": 4,
      "old_price": 100,
      "new_price": 100,
      "img_url": ["static/default_room.jpg"],
      "_id": "5f16c6ad93042c5b14d9304d",
      "title": "大床房",
      "room_num": "101",
      "hotel_id": "5f15898e9e625204e0c20b29",
      "__v": 0,
      "desc": "介绍123",
      "computer_info": "{\"cpu\":\"i5-9400F\",\"gpu\":\"ITX2080\",\"device\":\"华硕 VG27VQE\",\"mainboard\":\"华硕 13365\",\"memory\":\"金士顿16G\",\"keyboard\":\"黑峡谷K735机械键盘\",\"mouse\":\"罗技402\",\"earphone\":\"雷蛇北海巨妖\"}",
      "room_info": "{\"area\":\"45\",\"people_count\":\"2\",\"bed_count\":\"2\",\"bathroom\":\"干湿分离 独立浴室 独立卫生间\",\"computer_count\":\"2\",\"floor\":\"11-12\"}"
    },
    {
      "room_count": 4,
      "max_count": 2,
      "empty_count": 4,
      "old_price": 80,
      "new_price": 80,
      "img_url": ["static/default_room.jpg"],
      "_id": "5f1bfc32e9118e40e4c753d1",
      "title": "标准房",
      "room_num": "102",
      "hotel_id": "5f15898e9e625204e0c20b29",
      "__v": 0,
      "desc": "这里是 标准房间",
      "computer_info": "{\"cpu\":\"i5-8300H\",\"gpu\":\"RTX1080TI\",\"device\":\"华硕 VG27VQE\",\"mainboard\":\"华硕 13365\",\"memory\":\"金士顿16G\",\"keyboard\":\"杂牌机械键盘\",\"mouse\":\"电竞鼠标\",\"earphone\":\"一般耳机\"}",
      "room_info": "{\"area\":\"45\",\"people_count\":\"2\",\"bed_count\":\"2\",\"bathroom\":\"干湿分离 独立浴室 独立卫生间\",\"computer_count\":\"2\",\"floor\":\"11-12\"}"
    }
  ]
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)

#### 创建酒店

##### 描述

- 创建酒店

##### 请求 URL

- `/hotels/create`

##### 请求方式

- POST

##### Header

| 参数名        | 必选 | 参数值         |
| ------------- | ---- | -------------- |
| Authorization | √    | 登陆获取 token |

##### Body 参数

| 参数名    | 必选 | 类型     | 说明           |
| --------- | ---- | -------- | -------------- |
| title     | √    | string   | 酒店名         |
| address   | √    | string   | 酒店地址       |
| phone     | √    | string   | 酒店联系电话   |
| open_time | √    | string   | 开门时间       |
| end_time  | √    | string   | 关门时间       |
| owners_id | √    | string[] | 所有者 ID 数组 |
| desc      | √    | string   | 简介           |
| latitude  | √    | number   | 维度           |
| longitude | √    | number   | 经度           |

##### 返回示例

```json
{
  "code": 0,
  "message": "SUCCESS"
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)

#### 上传轮播图

##### 描述

- 上传酒店轮播图

##### 请求 URL

- `/hotels/upload/swiper`

##### 请求方式

- POST

##### Header

| 参数名        | 必选 | 参数值         |
| ------------- | ---- | -------------- |
| Authorization | √    | 登陆获取 token |

##### Query 参数

| 参数名 | 必选 | 类型   | 说明    |
| ------ | ---- | ------ | ------- |
| id     | √    | string | 酒店 ID |

##### Body 参数

| 参数名 | 必选 | 类型 | 说明     |
| ------ | ---- | ---- | -------- |
| file   | √    | File | 上传图片 |

##### 返回示例

```json
{
  "code": 0,
  "url": "static/1599918722622.jpg"
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)

#### 修改酒店信息

##### 描述

- 修改酒店信息

##### 请求 URL

- `/hotels/update/:id`

##### 请求方式

- POST

##### Header

| 参数名        | 必选 | 参数值         |
| ------------- | ---- | -------------- |
| Authorization | √    | 登陆获取 token |

##### Params 参数

| 参数名 | 必选 | 类型   | 说明    |
| ------ | ---- | ------ | ------- |
| id     | √    | string | 酒店 ID |

##### Body 参数

| 参数名    | 必选 | 类型     | 说明           |
| --------- | ---- | -------- | -------------- |
| title     | √    | string   | 酒店名         |
| address   | √    | string   | 酒店地址       |
| phone     | √    | string   | 酒店联系电话   |
| open_time | √    | string   | 开门时间       |
| end_time  | √    | string   | 关门时间       |
| owners_id | √    | string[] | 所有者 ID 数组 |
| desc      | √    | string   | 简介           |
| latitude  | √    | number   | 维度           |
| longitude | √    | number   | 经度           |

##### 返回示例

```json
{
  "code": 0,
  "message": "SUCCESS"
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)

#### 注销店面

##### 描述

- 注销酒店

##### 请求 URL

- `/hotels/delete/:id`

##### 请求方式

- POST

##### Header

| 参数名        | 必选 | 参数值         |
| ------------- | ---- | -------------- |
| Authorization | √    | 登陆获取 token |

##### Params 参数

| 参数名 | 必选 | 类型   | 说明    |
| ------ | ---- | ------ | ------- |
| id     | √    | string | 酒店 ID |

##### 返回示例

```json
{
  "code": 0,
  "message": "SUCCESS"
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)

### 房间相关接口

#### 创建房间

##### 描述

- 创建房间

##### 请求 URL

- `/rooms/create`

##### 请求方式

- POST

##### Header

| 参数名        | 必选 | 参数值         |
| ------------- | ---- | -------------- |
| Authorization | √    | 登陆获取 token |

##### Body 参数

| 参数名        | 必选 | 类型        | 说明                       |
| ------------- | ---- | ----------- | -------------------------- |
| title         | √    | string      | 房间名                     |
| room_num      | √    | number      | 房间号                     |
| room_count    | √    | number      | 该类的房间总数             |
| max_count     | √    | number      | 最大入住人数               |
| empty_count   | √    | number      | 空房间数                   |
| hotel_id      | √    | string      | 所属酒店 ID                |
| new_price     | √    | number      | 最新价格                   |
| img_url       | X    | string[]    | 图片                       |
| desc          | X    | string      | 简介                       |
| room_info     | √    | JSON string | [房间信息](#room_info)     |
| computer_info | √    | JSON string | [电脑信息](#computer_info) |

##### 返回示例

```json
{
  "code": 0,
  "message": "SUCCESS"
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)

#### 根据 ID 查找房间

##### 描述

- 根据 ID 查找房间

##### 请求 URL

- `/rooms/:id`

##### 请求方式

- GET

##### Params 参数

| 参数名 | 必选 | 类型   | 说明    |
| ------ | ---- | ------ | ------- |
| id     | √    | string | 房间 ID |

##### 返回示例

```json
{
    "code": 0,
    "data": {
        "room_count": 4,
        "max_count": 1,
        "empty_count": 4,
        "old_price": 80,
        "new_price": 80,
        "img_url": [],
        "_id": "5f5ddbc8f3a711506ca54348",
        "title": "小床房",
        "room_num": "110",
        "hotel_id": "5f15898e9e625204e0c20b29",
        "desc": "介绍",
        "computer_info": "{\"cpu\":\"i5-9400F\",\"gpu\":\"ITX2080\",\"device\":\"华硕 VG27VQE\",\"mainboard\":\"华硕 13365\",\"memory\":\"金士顿16G\",\"keyboard\":\"黑峡谷K735机械键盘\",\"mouse\":\"罗技402\",\"earphone\":\"雷蛇北海巨妖\"}",
         "room_info": "{\"area\":\"45\",\"people_count\":\"2\",\"bed_count\":\"2\",\"bathroom\":\"干湿分离 独立浴室 独立卫生间\",\"computer_count\":\"2\",\"floor\":\"11-12\"}"
        }
        "__v": 0
    }
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)

#### 修改房间

##### 描述

- 修改房间

##### 请求 URL

- `/rooms/update/:id`

##### 请求方式

- PUT

##### Header

| 参数名        | 必选 | 参数值         |
| ------------- | ---- | -------------- |
| Authorization | √    | 登陆获取 token |

##### Params 参数

| 参数名 | 必选 | 类型   | 说明    |
| ------ | ---- | ------ | ------- |
| id     | √    | string | 房间 id |

##### Body 参数

| 参数名        | 必选 | 类型        | 说明                       |
| ------------- | ---- | ----------- | -------------------------- |
| title         | √    | string      | 房间名                     |
| room_num      | √    | number      | 房间号                     |
| room_count    | √    | number      | 该类的房间总数             |
| max_count     | √    | number      | 最大入住人数               |
| empty_count   | √    | number      | 空房间数                   |
| hotel_id      | √    | string      | 所属酒店 ID                |
| new_price     | √    | number      | 最新价格                   |
| img_url       | X    | string[]    | 图片                       |
| desc          | X    | string      | 简介                       |
| room_info     | √    | JSON string | [房间信息](#room_info)     |
| computer_info | √    | JSON string | [电脑信息](#computer_info) |

##### 返回示例

```json
{
  "code": 0,
  "message": "SUCCESS"
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)

#### 删除房间

##### 描述

- 删除房间

##### 请求 URL

- `/rooms/delete/:id`

##### 请求方式

- POST

##### Header

| 参数名        | 必选 | 参数值         |
| ------------- | ---- | -------------- |
| Authorization | √    | 登陆获取 token |

##### Params 参数

| 参数名 | 必选 | 类型   | 说明    |
| ------ | ---- | ------ | ------- |
| id     | √    | string | 房间 ID |

##### 返回示例

```json
{
  "code": 0,
  "message": "SUCCESS"
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)

### 住房记录相关接口

#### 根据 ID 获取记录

##### 描述

- 根据记录 ID 获取住房记录

##### 请求 URL

- `/records/getbyId?id`

##### 请求方式

- GET

##### Header

| 参数名        | 必选 | 参数值         |
| ------------- | ---- | -------------- |
| Authorization | √    | 登陆获取 token |

##### Query 参数

| 参数名 | 必选 | 类型   | 说明    |
| ------ | ---- | ------ | ------- |
| id     | √    | string | 记录 ID |

##### 返回示例

```json
{
  "code": 0,
  "data": {
    "title": "小床bbb房",
    "id": "5f6477fd35219c8f544fe8c5",
    "status": "待付款",
    "time": "2020-09-18T09:03:57.762Z",
    "member": "{\"name\":\"xmy\",\"phone\":\"123214513245\",\"id_card\":\"13465425763456245\"}",
    "discount": 0,
    "price": 100
  }
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)

#### 根据酒店 ID/(房间 ID/客户 ID)获取获取记录

##### 描述

- 根据酒店 ID/(房间 ID/客户 ID)获取住房记录

##### 请求 URL

- `/records/getby`

##### 请求方式

- GET

##### Header

| 参数名        | 必选 | 参数值         |
| ------------- | ---- | -------------- |
| Authorization | √    | 登陆获取 token |

##### Query 参数

| 参数名  | 必选 | 类型   | 说明    |
| ------- | ---- | ------ | ------- |
| hotelId | X    | string | 酒店 ID |
| roomId  | X    | string | 房间 id |
| guestId | X    | string | 用户 id |

- 以上三个参数必须传递其中之一

##### 返回示例

```json
{
  "code": 0,
  "data": [
    {
      "is_close": false,
      "status": "待付款",
      "coupon": 0,
      "_id": "5f6477fd35219c8f544fe8c5",
      "hotel_id": "5f644712cc9fcb7398dd8295",
      "room_id": "5f6459e042dc655b4caecb55",
      "guest_id": "5f6462e6b26f3e0d74fa4fb9",
      "member_message": "{\"name\":\"xmy\",\"phone\":\"123214513245\",\"id_card\":\"13465425763456245\"}",
      "price": 100,
      "create_at": "2020-09-18T09:03:57.762Z",
      "update_at": "2020-09-18T09:03:57.762Z",
      "__v": 0
    }
  ]
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)

#### 创建住房记录

##### 描述

- 创建新的住房记录

##### 请求 URL

- `/records/create`

##### 请求方式

- POST

##### Header

| 参数名        | 必选 | 参数值         |
| ------------- | ---- | -------------- |
| Authorization | √    | 登陆获取 token |

##### Body 参数

| 参数名         | 必选 | 类型        | 说明                                     |
| -------------- | ---- | ----------- | ---------------------------------------- |
| hotel_id       | √    | string      | 酒店 ID                                  |
| room_id        | √    | string      | 房间 id                                  |
| guest_id       | √    | string      | 用户 id                                  |
| member_message | √    | JSON string | 入住人员信息（一人）                     |
| remarks        | X    | string      | 备注                                     |
| active_id      | X    | string      | 参与活动 ID                              |
| status         | X    | string      | 状态 （请查看[项目变量表](#项目变量表)） |
| coupon         | X    | number      | 优惠金额                                 |
| price          | √    | number      | 实付金额                                 |

##### 返回示例

```json
{
  "code": 0,
  "message": "SUCCESS",
  "data": {
    "is_close": false,
    "status": "待付款",
    "coupon": 0,
    "_id": "5f6477fd35219c8f544fe8c5",
    "hotel_id": "5f644712cc9fcb7398dd8295",
    "room_id": "5f6459e042dc655b4caecb55",
    "guest_id": "5f6462e6b26f3e0d74fa4fb9",
    "member_message": "{\"name\":\"xmy\",\"phone\":\"123214513245\",\"id_card\":\"13465425763456245\"}",
    "price": 100,
    "create_at": "2020-09-18T09:03:57.762Z",
    "update_at": "2020-09-18T09:03:57.762Z",
    "__v": 0
  }
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)

#### 将某条记录设置为无效记录

##### 描述

- 将某条记录设置为无效记录

##### 请求 URL

- `/records/setclose/:id`

##### 请求方式

- PUT

##### Header

| 参数名        | 必选 | 参数值         |
| ------------- | ---- | -------------- |
| Authorization | √    | 登陆获取 token |

##### Params 参数

| 参数名 | 必选 | 类型   | 说明    |
| ------ | ---- | ------ | ------- |
| id     | √    | string | 记录 id |

##### 返回示例

```json
{
  "code": 0,
  "message": "SUCCESS"
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)

#### 将某条记录设置为有效记录

##### 描述

- 将某条记录设置为有效记录

##### 请求 URL

- `/records/setopen/:id`

##### 请求方式

- PUT

##### Header

| 参数名        | 必选 | 参数值         |
| ------------- | ---- | -------------- |
| Authorization | √    | 登陆获取 token |

##### Params 参数

| 参数名 | 必选 | 类型   | 说明    |
| ------ | ---- | ------ | ------- |
| id     | √    | string | 记录 id |

##### 返回示例

```json
{
  "code": 0,
  "message": "SUCCESS"
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)

#### 更新记录信息

##### 描述

- 修改住房记录信息

##### 请求 URL

- `/records/update/:id`

##### 请求方式

- PUT

##### Header

| 参数名        | 必选 | 参数值         |
| ------------- | ---- | -------------- |
| Authorization | √    | 登陆获取 token |

##### Params 参数

| 参数名 | 必选 | 类型   | 说明    |
| ------ | ---- | ------ | ------- |
| id     | √    | string | 订单 ID |

##### Body 参数

| 参数名         | 必选 | 类型        | 说明                                     |
| -------------- | ---- | ----------- | ---------------------------------------- |
| hotel_id       | √    | string      | 酒店 ID                                  |
| room_id        | √    | string      | 房间 id                                  |
| guest_id       | √    | string      | 用户 id                                  |
| member_message | √    | JSON string | 入住人员信息（一人）                     |
| remarks        | X    | string      | 备注                                     |
| active_id      | X    | string      | 参与活动 ID                              |
| status         | X    | string      | 状态 （请查看[项目变量表](#项目变量表)） |
| coupon         | X    | number      | 优惠金额                                 |
| price          | √    | number      | 实付金额                                 |

##### 返回示例

```json
{
  "code": 0,
  "message": "SUCCESS"
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)



#### 删除订单记录

##### 描述

- 删除某条记录

##### 请求 URL

- `/records/delete/:id`

##### 请求方式

- DELETE

##### Header

| 参数名        | 必选 | 参数值         |
| ------------- | ---- | -------------- |
| Authorization | √    | 登陆获取 token |

##### Params 参数

| 参数名 | 必选 | 类型   | 说明    |
| ------ | ---- | ------ | ------- |
| id     | √    | string | 记录 id |

##### 返回示例

```json
{
  "code": 0,
  "message": "SUCCESS"
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)



### 积分记录相关接口

#### 根据id获取积分记录

##### 描述

- 根据id获取积分记录

##### 请求 URL

- `/integralLogs/getbyId/:id`

##### 请求方式

- GET

##### Header

| 参数名        | 必选 | 参数值         |
| ------------- | ---- | -------------- |
| Authorization | √    | 登陆获取 token |

##### Params 参数

| 参数名 | 必选 | 类型   | 说明        |
| ------ | ---- | ------ | ----------- |
| id     | √    | string | 积分记录 id |

##### 返回示例

```json
{
    "code": 0,
    "data": {
        "is_out": false,
        "_id": "5f646436346e76413cac6d5a",
        "user_id": "5f6462e6b26f3e0d74fa4fb9",
        "sell_count": 50,
        "remarks": "无备注",
        "__v": 0
    }
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)



#### 根据用户id获取积分记录

##### 描述

- 根据id获取积分记录

##### 请求 URL

- `/integralLogs/getby`

##### 请求方式

- GET

##### Header

| 参数名        | 必选 | 参数值         |
| ------------- | ---- | -------------- |
| Authorization | √    | 登陆获取 token |

##### Query参数

| 参数名 | 必选 | 类型   | 说明   |
| ------ | ---- | ------ | ------ |
| userId | √    | string | 用户id |

##### 返回示例

```json
{
    "code": 0,
    "data": [
        {
            "is_out": false,
            "_id": "5f646436346e76413cac6d5a",
            "user_id": "5f6462e6b26f3e0d74fa4fb9",
            "sell_count": 50,
            "remarks": "无备注",
            "__v": 0
        },
        {
            "is_out": false,
            "_id": "5f6465b0cba6693450dfdb71",
            "user_id": "5f6462e6b26f3e0d74fa4fb9",
            "sell_count": 100,
            "remarks": "无备注",
            "__v": 0
        }
    ]
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)



#### 创建积分记录

##### 描述

- 创建积分记录

##### 请求 URL

- `/integralLogs/create`

##### 请求方式

- POST

##### Header

| 参数名        | 必选 | 参数值         |
| ------------- | ---- | -------------- |
| Authorization | √    | 登陆获取 token |

##### Body参数

| 参数名     | 必选 | 类型    | 说明           |
| ---------- | ---- | ------- | -------------- |
| user_id    | √    | string  | 用户id         |
| is_out     | √    | boolean | 是否为支出积分 |
| sell_count | √    | number  | 交易数额       |
| remarks    | X    | string  | 备注           |

##### 返回示例

```json
{
    "code": 0,
    "message": "SUCCESS",
    "data": {
        "is_out": true,
        "_id": "5f65738a1c225f8894339d6f",
        "user_id": "5f646efc6b986f54807c9b2c",
        "sell_count": 10,
        "remarks": "123",
        "__v": 0
    }
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)



#### 更新积分记录

##### 描述

- 更新积分记录

##### 请求 URL

- `/integralLogs/update/:id`

##### 请求方式

- PUT

##### Header

| 参数名        | 必选 | 参数值         |
| ------------- | ---- | -------------- |
| Authorization | √    | 登陆获取 token |

##### Params参数

| 参数名 | 必选 | 类型   | 说明        |
| ------ | ---- | ------ | ----------- |
| id     | √    | string | 积分记录 id |

##### Body参数

| 参数名     | 必选 | 类型    | 说明           |
| ---------- | ---- | ------- | -------------- |
| user_id    | √    | string  | 用户id         |
| is_out     | √    | boolean | 是否为支出积分 |
| sell_count | √    | number  | 交易数额       |
| remarks    | X    | string  | 备注           |

##### 返回示例

```json
{
    "code": 0,
    "message": "SUCCESS",
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)



#### 删除积分记录

##### 描述

- 删除积分记录

##### 请求 URL

- `/integralLogs/delete/:id`

##### 请求方式

- DELETE

##### Header

| 参数名        | 必选 | 参数值         |
| ------------- | ---- | -------------- |
| Authorization | √    | 登陆获取 token |

##### Params参数

| 参数名 | 必选 | 类型   | 说明        |
| ------ | ---- | ------ | ----------- |
| id     | √    | string | 积分记录 id |

##### 返回示例

```json
{
    "code": 0,
    "message": "SUCCESS",
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)



### 活动相关接口

#### 创建活动

##### 描述

- 创建活动

##### 请求 URL

- `/actives/create`

##### 请求方式

- POST

##### Header

| 参数名        | 必选 | 参数值         |
| ------------- | ---- | -------------- |
| Authorization | √    | 登陆获取 token |

##### Body参数

| 参数名     | 必选 | 类型   | 说明       |
| ---------- | ---- | ------ | ---------- |
| img_url    | √    | string | 图片url    |
| topic      | √    | string | 活动标题   |
| start_time | √    | 时间戳 | 开始时间   |
| end_time   | √    | 时间戳 | 结束时间   |
| detail     | √    | 富文本 | 详情页     |
| desc       | √    | string | 简介       |
| hotel_id   | √    | string | 所属酒店ID |

##### 返回示例

```json
{
    "code": 0,
    "message": "SUCCESS",
    "data": {
        "_id": "5f6579ff1c225f8894339d70",
        "img_url": "static/default_room.jpg",
        "topic": "测试活动",
        "start_time": "2020-07-25T11:34:21.723Z",
        "end_time": "2021-01-01T00:00:00.000Z",
        "detail": "<p>详情页</p>",
        "desc": "简介页",
        "hotel_id": "5f15898e9e625204e0c20b29",
        "create_at": "2020-09-19T03:24:47.160Z",
        "update_at": "2020-09-19T03:24:47.160Z",
        "__v": 0
    }
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)



#### 根据ID查询活动

##### 描述

- 根据id查询活动

##### 请求 URL

- `/actives/getbyId/:id`

##### 请求方式

- GET

##### Header

| 参数名        | 必选 | 参数值         |
| ------------- | ---- | -------------- |
| Authorization | √    | 登陆获取 token |

##### Params 参数

| 参数名 | 必选 | 类型   | 说明   |
| ------ | ---- | ------ | ------ |
| id     | √    | string | 活动id |

##### 返回示例

```json
{
    "code": 0,
    "data": {
        "_id": "5f6579ff1c225f8894339d70",
        "img_url": "static/default_room.jpg",
        "topic": "测试活动",
        "start_time": "2020-07-25T11:34:21.723Z",
        "end_time": "2021-01-01T00:00:00.000Z",
        "detail": "<p>详情页</p>",
        "desc": "简介页",
        "hotel_id": "5f15898e9e625204e0c20b29",
        "create_at": "2020-09-19T03:24:47.160Z",
        "update_at": "2020-09-19T03:24:47.160Z",
        "__v": 0
    }
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)



#### 根据酒店ID查询活动

##### 描述

- 根据酒店id查询活动

##### 请求 URL

- `/actives/getby`

##### 请求方式

- GET

##### Header

| 参数名        | 必选 | 参数值         |
| ------------- | ---- | -------------- |
| Authorization | √    | 登陆获取 token |

##### Query参数

| 参数名  | 必选 | 类型   | 说明   |
| ------- | ---- | ------ | ------ |
| hotelId | √    | string | 酒店id |

##### 返回示例

```json
{
    "code": 0,
    "data": [
        {
            "_id": "5f6579ff1c225f8894339d70",
            "img_url": "static/default_room.jpg",
            "topic": "测试活动",
            "start_time": "2020-07-25T11:34:21.723Z",
            "end_time": "2021-01-01T00:00:00.000Z",
            "detail": "<p>详情页</p>",
            "desc": "简介页",
            "hotel_id": "5f15898e9e625204e0c20b29",
            "create_at": "2020-09-19T03:24:47.160Z",
            "update_at": "2020-09-19T03:24:47.160Z",
            "__v": 0
        }
    ]
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)



#### 修改活动信息

##### 描述

- 修改活动信息

##### 请求 URL

- `/actives/update/:id`

##### 请求方式

- PUT

##### Header

| 参数名        | 必选 | 参数值         |
| ------------- | ---- | -------------- |
| Authorization | √    | 登陆获取 token |

##### Params参数

| 参数名 | 必选 | 类型   | 说明   |
| ------ | ---- | ------ | ------ |
| id     | √    | string | 活动id |

##### Body参数

| 参数名     | 必选 | 类型   | 说明       |
| ---------- | ---- | ------ | ---------- |
| img_url    | √    | string | 图片url    |
| topic      | √    | string | 活动标题   |
| start_time | √    | 时间戳 | 开始时间   |
| end_time   | √    | 时间戳 | 结束时间   |
| detail     | √    | 富文本 | 详情页     |
| desc       | √    | string | 简介       |
| hotel_id   | √    | string | 所属酒店ID |

##### 返回示例

```json
{
    "code": 0,
    "message": "SUCCESS"
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)



#### 删除活动

##### 描述

- 删除活动

##### 请求 URL

- `/actives/delete/:id`

##### 请求方式

- DELETE

##### Header

| 参数名        | 必选 | 参数值         |
| ------------- | ---- | -------------- |
| Authorization | √    | 登陆获取 token |

##### Params参数

| 参数名 | 必选 | 类型   | 说明    |
| ------ | ---- | ------ | ------- |
| id     | √    | string | 活动 id |

##### 返回示例

```json
{
    "code": 0,
    "message": "SUCCESS",
}
```

##### 返回参数说明

- 查看[项目变量表](#项目变量表)

