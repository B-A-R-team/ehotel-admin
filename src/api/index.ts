import myAxios from './myAxios'
const BASE_URL:string = ''

export const reqLogin = (username:string,password:string) => myAxios.post(BASE_URL + '/user/login',{username,password})
export const reqEHotelInfo = (id:string) => myAxios(BASE_URL+'',{
    params:{
        id
    }
})