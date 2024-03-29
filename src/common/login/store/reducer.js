
const defaultState = {
    show:false,
    userInfo:'',
    showRegister:false,
    isLogin:true,
    isRegister:false
}
export default (state = defaultState,action) => {
    switch (action.type) {
        case 'loginshow':
            const newState1 = JSON.parse(JSON.stringify(state));
            newState1.show = action.value
            newState1.isLogin = true
            newState1.isRegister = false
            return newState1
        case 'setUserInfo':
            const userInfoState = JSON.parse(JSON.stringify(state))
            userInfoState.userInfo = action.value
            return userInfoState
        case 'registerShow':
            const registerState = JSON.parse(JSON.stringify(state))
            registerState.isRegister = action.value
            registerState.isLogin = !(action.value)
            return registerState
        case 'removeInfo':
            const removeState = JSON.parse(JSON.stringify(state))
            removeState.userInfo = ''
            return removeState
        default:
            return state
    }

}
