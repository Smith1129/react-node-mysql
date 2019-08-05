import {get,post} from './index.js'
//登录
export const loginInfo = data => get('api/user',data);
//注册
export const register = data => get('api/register',data)
//搜索List
export const searchList = data => get('api/searchList',data)
//homeList
export const homeList = data => get('api/homeList',data)