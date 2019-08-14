
import {loginInfo} from '../../../api/http'
export const loginShow = (data)=>{
        return (dispatch) =>{
               dispatch({ type:'loginshow',value:data})
        }
}
export const registerShow = (data) => {
    return (dispatch) =>{
        dispatch({ type:'registerShow',value:data})
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
                            name:res.Data.name,
                            avatar:res.Data.avatar
                        }
                        dispatch({type:'setUserInfo',value:data})
                    }).catch(error => {
                        reject(error)
                    })
                })

        }
}


