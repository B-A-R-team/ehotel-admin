import { idText } from 'typescript'
import myAxios from './myAxios'
// const BASE_URL:string = 'https://www.barteam.cn:1239'
myAxios.defaults.baseURL = 'https://www.barteam.cn:1239'

export const reqLogin: any = ({ email, pass }: any) => myAxios.post('/user/login', { email, pass })
//获取 酒店信息
export const reqEHotelInfo: any = (id: string) => myAxios('/hotel/list/' + id)
// 获取 房间房型
export const reqRoomType: any = () => myAxios('/room/type/list')
// 添加房型
export const reqRoomeTypeCreate: any = ({ roomType, floor, roomArea }: any) => myAxios.post('/room/type/create', {
    type_name: roomType,
    floor: [floor],
    area: roomArea
})
// 修改房型
export const reqUpdateRoomType: any = ({ id, type_name, area, floor }: any) => myAxios.put('/room/type/update/' + id, {
    type_name,
    area,
    floor
})

//创建房间
export const reqAddRoom: any = (
    {
        title,
        room_num,
        new_price,
        desc,
        img_url,
        room_info,
        computer_info,
        typeId,
        hotelId
    }: any) => myAxios.post('/room/create', {
        title,
        room_num,
        new_price,
        desc,
        img_url,
        room_info,
        computer_info,
        typeId,
        hotelId
    })
// 根据id获取同一个类型房间接口
export const reqRoomByTypeId: any = (id: string) => myAxios('/room/getByType', {
    params: {
        typeId: id
    }
})
//根据id获取某个房间
export const reqRoomById: any = (id: string) => myAxios('/room/list/' + id)

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
    hotelId
}: any) => myAxios.put('/room/update/' + id, {
    title,
    room_num,
    new_price,
    desc,
    img_url,
    room_info,
    computer_info,
    typeId,
    hotelId
}) 
//  获取所有优惠券
export const reqAllCoupon:any = () => myAxios('/coupon/list')