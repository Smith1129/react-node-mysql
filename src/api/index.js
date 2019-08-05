import axios from 'axios';import QS from 'qs';


// 请求超时时间
axios.defaults.timeout = 10000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;multipart/form-data';

// 请求拦截器
axios.interceptors.request.use(
    config => {
        if(config.method == 'post'){
        }else if(config.method == 'get'){
            config.params ={
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
    },
    // 服务器状态码不是200的情况
    error => {
        if (error.response.data.Code) {
            switch (error.response.data.Code) {
                case 600:
                    break;
                case 403:
                    break;
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
