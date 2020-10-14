import { RecordStatus } from '../pages/record/record';
import myAxios from './myAxios';
// const BASE_URL:string = 'https://www.barteam.cn:1239'
myAxios.defaults.baseURL = 'https://www.barteam.cn:1239';

export const reqLogin: any = ({ email, pass }: any) =>
  myAxios.post('/user/login', { email, pass });

//获取 酒店信息
export const reqEHotelInfo: any = (id: string) => myAxios('/hotel/list/' + id);

// 获取 房间房型
export const reqRoomType: any = () => myAxios('/room/type/list');

// 添加房型
export const reqRoomeTypeCreate: any = ({
  roomType,
  introduction,
  roomFloor,
  roomArea,
}: any) =>
  myAxios.post('/room/type/create', {
    type_name: roomType,
    introduction,
    roomFloor,
    roomArea,
  });

// 修改房型
export const reqUpdateRoomType: any = ({ id, type_name }: any) =>
  myAxios.put('/room/type/update/' + id, {
    type_name,
  });

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
      name: member['name'],
      phone: member['phone'] || member['id_card'],
      coupon: element['coupon'],
      price: element['price'],
      status: RecordStatus[status],
    };
  });
};
