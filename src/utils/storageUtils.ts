const USER_KEY = 'user_info';
const TOKEN = 'token';
const TIME_KEY = 'time';
export default {
  saveToken(token: string) {
    localStorage.setItem(TOKEN, token);
  },
  getToken() {
    return localStorage.getItem(TOKEN);
  },
  removeToken() {
    localStorage.setItem(TOKEN, TOKEN);
  },
  saveUser(user: any) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  getUser() {
    return JSON.parse(localStorage.getItem(USER_KEY) || '{}');
  },
  removeUser() {
    localStorage.removeItem(USER_KEY);
  },
  setTime() {
    let timestamp = new Date();
    timestamp.setDate(timestamp.getDate() + 3);
    localStorage.setItem(TIME_KEY, timestamp.getTime().toString());
  },
  getTime() {
    return localStorage.getItem(TIME_KEY);
  },
  removeTime() {
    localStorage.removeItem(TIME_KEY);
  },
  clearAll() {
    localStorage.clear();
    window.location.href = '/#/login';
  },
};
