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
