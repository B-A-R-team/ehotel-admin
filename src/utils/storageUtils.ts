const USER_KEY = 'user_info';
const TOKEN = 'token'
export default {
    saveToken(token:string) {
        localStorage.setItem(TOKEN,JSON.stringify(token))
    },
    getToken() {
        return JSON.parse(localStorage.getItem(TOKEN) || '');
    },
    removeToken() {
        localStorage.setItem(TOKEN,JSON.stringify(TOKEN))
    },
    saveUser(user:any){
        localStorage.setItem(USER_KEY,JSON.stringify(user));
    },
    getUser(){
        return JSON.parse(localStorage.getItem(USER_KEY) || '{}');
    },
    removeUser(){
        localStorage.removeItem(USER_KEY);
    }
}
