import {get,post} from './index.js'
//登录
export const loginInfo = data => get('api/user',data);
//注册
export const register = data => get('api/register',data)
//搜索List
export const searchList = data => get('api/searchList',data)
//homeList
export const homeList = data => get('api/homeList',data)
//上传头像
export const uploadAvatar = data => get('api/infoReset',data)
//修改name
export const updateName = data => get('api/infoReset',data)
//保存文章
export const articleSave = data => post('api/article',data)
//点赞收藏
export const upOrlike = data => get('/api/upOrVote',data)
//获取点赞List
// export const UpListInfo = data => get('/api/upList',data)