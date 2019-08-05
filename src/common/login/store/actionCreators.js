
import {loginInfo,register} from '../../../api/http'
export const loginShow = (data)=>{
        return (dispatch) =>{
               dispatch({ type:'loginshow',value:data})
        }
}
export const UserInfo = (data) => {
        return(dispatch) => {
                const payload = data
                    return new Promise((reject,resolve)=>{
                        loginInfo(payload).then((res)=>{
                        alert('登录成功')
                        // this.props.LoginPop(false)
                        dispatch(loginShow(false))
                        localStorage.setItem("token",res.Data.token)
                        const data = {
                            username:res.Data.username,
                            name:res.Data.name
                        }
                        dispatch({type:'setUserInfo',value:data})
                        // this.props.userInfo(data)
                    }).catch(error => {
                        console.log('www'+error)
                        reject(error)
                    })
                })
                // dispatch({type:'setUserInfo',value:data})
        }
}


