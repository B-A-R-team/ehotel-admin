import myAxios from './myAxios'
const BASE_URL:string = ''

export const reqLogin = (username:string,password:string) => myAxios(BASE_URL + '/user/login',{username,password},'POST')