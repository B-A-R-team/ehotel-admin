import { RecordStatus } from '../pages/record/record';
import { BASE_URL } from '../utils/constant';
import myAxios from './myAxios';
import { CreateAndUpdateActiveDto } from '../pages/active/addOrUpdateActive/AddOrUpdatective';
import { CreateLogDto } from '../pages/vip/vip-card/integral';
// const BASE_URL:string = 'https://www.barteam.cn:1239'
myAxios.defaults.baseURL = BASE_URL;

export const reqLogin: any = ({ email, pass }: any) =>
  myAxios.post('/user/login', { email, pass });
//获取 酒店信息
export const reqEHotelInfo: any = (id: string) => myAxios('/hotel/list/' + id)
// 修改酒店信息
export const reqUpdateHotelInfo: any = ({
  address,
  desc,
  end_time,
  id,
  latitude,
  longitude,
  open_time,
  phone,
  swiperList,
  title
}: any) => myAxios.put('/hotel/update?id=' + id, {
  address,
  desc,
  end_time,
  id,
  latitude,
  longitude,
  open_time,
  phone,
  swiperList,
  title
})
// 获取 房间房型
export const reqRoomType: any = () => myAxios('/room/type/list');
// 添加房型
export const reqRoomeTypeCreate: any = ({ roomType, floor, roomArea }: any) =>
  myAxios.post('/room/type/create', {
    type_name: roomType,
    floor: [floor],
    area: roomArea,
  });
// 修改房型
export const reqUpdateRoomType: any = ({ id, type_name, area, floor }: any) =>
  myAxios.put('/room/type/update/' + id, {
    type_name,
    area,
    floor,
  });

//创建房间
export const reqAddRoom: any = ({
  title,
  room_num,
  new_price,
  desc,
  img_url,
  room_info,
  computer_info,
  typeId,
  hotelId,
}: any) =>
  myAxios.post('/room/create', {
    title,
    room_num,
    new_price,
    desc,
    img_url,
    room_info,
    computer_info,
    typeId,
    hotelId,
  });
// 根据id获取同一个类型房间接口
export const reqRoomByTypeId: any = (id: string) =>
  myAxios('/room/getByType', {
    params: {
      typeId: id,
    },
  });
//根据id获取某个房间
export const reqRoomById: any = (id: string) => myAxios('/room/list/' + id);

//更新房间信息
export const reqUpdateRoom: any = ({
  id,
  title,
  room_num,
  new_price,
  desc,
  img_url,
  room_info,
  computer_info,
  typeId,
  hotelId,
  is_used
}: any) =>
  myAxios.put('/room/update/' + id, {
    title,
    room_num,
    new_price,
    desc,
    img_url,
    room_info,
    computer_info,
    typeId,
    hotelId,
    is_used
  });
// 删除房间
export const reqDelRoom: any = (id: number) => myAxios.delete('/room/delete/' + id)

//  获取所有优惠券
export const reqAllCoupon: any = () => myAxios('/coupon/list');

//添加优惠券
export const reqAddCoupon: any = ({
  label,
  is_full_down,
  limit_price,
  reduce_price,
  start_time,
  end_time,
  remarks,
  hotel_id,
  user_id,
  is_used,
}: any) =>
  myAxios.post('/coupon/create', {
    label,
    is_full_down,
    limit_price,
    reduce_price,
    start_time,
    end_time,
    remarks,
    hotel_id,
    user_id,
    is_used,
  });
//删除优惠券
export const reqDelCoupon = (id: any) => myAxios.delete('/coupon/delete/' + id);
//修改优惠券
export const reqUpdateCoupon = ({
  id,
  label,
  is_full_down,
  limit_price,
  reduce_price,
  start_time,
  end_time,
  remarks,
  hotel_id,
  user_id,
  is_used,

}: any) => myAxios.put('/coupon/update/' + id, {
  label,
  is_full_down,
  limit_price,
  reduce_price,
  start_time,
  end_time,
  remarks,
  hotel_id,
  user_id,
  is_used
})


// 获取用户
export const reqUsers = () => myAxios.get('/user/list');

// 删除用户
export const reqDeleteUser = (idList: number[]) =>
  myAxios.delete('/user/delete', { data: { idList } });

// 获取轮播图
export const reqSwiperList = () => myAxios.get('/hotel/swiper/1');

// 添加轮播图
export const reqAddSwiper = (swiper_url: string) =>
  myAxios.put('/hotel/add/swiper', { id: 1, swiper_url });

// 修改轮播图
export const reqUpdateSwiper = (swiperList: string[]) =>
  myAxios.put('/hotel/update/swiper?id=1', { swiperList });

// 获取订单并格式化
export const reqAllRecords = async () => {
  const res = await myAxios.get('/record/getByHotelId?hotelId=1');
  return res['data'].map((element: any) => {
    const status = element['status'] as 'waiting' | 'finish' | 'unpaid';
    const member = JSON.parse(element['member_message']);

    return {
      key: element['id'],
      id: element['id'],
      create_at: new Date(element['create_at']).toLocaleString(),
      room: element['room']['title'],
      room_num: element['room']['room_num'],
      name: member['name'],
      phone: member['phone'] || member['id_card'],
      coupon: element['coupon'],
      price: element['price'],
      status: RecordStatus[status],
    };
  });
};

export const reqChangeStatus = (id: number, status: string) =>
  myAxios.put('/record/changeStatus', { id, status });

// 获取活动列表
export const reqActiveList = () => myAxios.get('/active/getByHotel?hotelId=1');

// 根据ID获取活动数据
export const reqAcitveById = (id: number) => myAxios.get(`/active/list/${id}`);

// 创建活动
export const reqCreateActive = (active: CreateAndUpdateActiveDto) =>
  myAxios.post('/active/create', active);

// 更新活动
export const reqUpdateActive = (active: CreateAndUpdateActiveDto) =>
  myAxios.put(`/active/update/${active['id']}`, active);

// 获取vip
export const reqVipList = () => myAxios.get('/user/viplist');

// 更新vip姓名
export const reqUpdateVipName = (id: number, name: string) =>
  myAxios.put('/user/changeName', { id, name });

// 更新电话号
export const reqUpdateVipPhone = (id: number, phone: string) =>
  myAxios.put('/user/changePhone', { id, phone });

// 获取积分记录
export const reqIntegralLog = (id: number) =>
  myAxios.get(`/integralLog/getByUser?userId=${id}`);

// 创建积分记录
export const reqCreateIntegralLog = (id: number, log: CreateLogDto) =>
  myAxios.post('/integralLog/create', {
    user_id: id,
    ...log,
  });

// 获取某用户总积分
export const reqTotalIntegral = (id: number) =>
  myAxios.get(`/integralLog/getTotalIntegral?userId=${id}`);
