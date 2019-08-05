import axios from 'axios';import QS from 'qs';
// import { Toast } from 'vant';
// import store from '../store/index'
// import router from '../router/index'

// import { removeToken ,getToken} from '@/utils/auth'

// 环境的切换
// if (process.env.NODE_ENV == 'development') {
//     axios.defaults.baseURL = 'http://res.ttz.com/';
// } else if (process.env.NODE_ENV == 'debug') {
//     axios.defaults.baseURL = '';
// } else if (process.env.NODE_ENV == 'production') {
//     axios.defaults.baseURL = 'http://res.ttz.com/';
// }

// 请求超时时间
axios.defaults.timeout = 10000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;multipart/form-data';

// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        // const token = store.state.user.userToken;
        // token && (config.headers.Authorization = token);
        if(config.method == 'post'){
            // config.data = { 
            //     ...config.data, 
            // } 
        }else if(config.method == 'get'){
            config.params ={
                // UserId:18812608,
                // token:getToken('ttz_token'),
                ...config.params
            }
        }
        
        return config;
    },
    error => {
        return Promise.error(error);
    })

// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.Code === 200) {
            return Promise.resolve(response);
        }else if(response.data.Code===111)
        {
            alert(response.data.Data.Msg)
        }
        // else if(response.data.Code===444){
        //     alert('token')
        // }
        
        // else if(response.data.Code === 111)
        // {
        //     return Promise.resolve(response);
        // } 


        // else {
        //     if(response.data.Code === 9999){
        //         return Promise.resolve(response);
        //     }else if(response.data.Code === 600){//用户未登录
        //         removeToken()
        //         store.commit('user/SET_TOKEN','')
        //         store.commit('user/SET_INFO','')
        //         return Promise.reject(response);
        //     }else if(response.data.Code===901){
        //         return Promise.resolve(response);
        //     }else if(response.data.Code===444){ //轮询VIP订单
        //         return Promise.resolve(response);
        //     }else if(response.data.Code == 673){   //游戏试玩未开始游戏
        //         router.push('/')
        //         store.commit('app/getFrame',true)
        //         store.commit('app/getFrameMsg',response.data.Msg)
        //         store.commit('app/getFrameIcon')
        //         store.commit('app/getFrameState',0)
        //         return Promise.reject(response);
        //     }else if(response.data.Code == 602){  //金融密码权限丢失
        //         removeToken('ttz_freeca')
        //         return Promise.reject(response);
        //     }else if(response.data.Code == 2222){   //密码错误&验证码错误
        //         store.commit('app/getFrame',true)
        //         store.commit('app/getFrameMsg',response.data.Msg)
        //         store.commit('app/getFrameIcon')
        //         store.commit('app/getFrameState',0)
        //         store.commit('app/setAccess',{state:false})
        //         tabCode()
        //         return Promise.reject(response);
        //     }else{
        //         store.commit('app/getFrame',true)
        //         store.commit('app/getFrameMsg',response.data.Msg)
        //         store.commit('app/getFrameIcon')
        //         store.commit('app/getFrameState',0)
        //         store.commit('app/setAccess',{state:false})
        //         return Promise.reject(response);
        //     }
        // }
        
        // return Promise.resolve(response);
    },
    // 服务器状态码不是200的情况
    error => {
        if (error.response.data.Code) {
            switch (error.response.data.Code) {
                // 600: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                case 600:
                    break;
                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面
                case 403:
                    break;
                // 404请求不存在
                case 404:
                    
                break;
                default:
            }
            return Promise.reject(error.response);
        }
    }
);
/**
  * get方法，对应get请求
  * @param {String} url [请求的url地址]
  * @param {Object} params [请求时携带的参数]
  */
export function get(url, params){
    // const url1 = 'http://localhost:4000/'
    // const uri = url1+url
    return new Promise((resolve, reject) =>{
        axios.get(url, {
            params: params
        })
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            // reject(err.data)
        })
    });
}
/**
  * post方法，对应post请求
  * @param {String} url [请求的url地址]
  * @param {Object} params [请求时携带的参数]
  */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            // reject(err.data)
        })
    });
}
