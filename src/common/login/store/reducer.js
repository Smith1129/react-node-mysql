import * as Constants from './constants'
const defaultState = {
    show:false,
    userInfo:''
}
export default (state = defaultState,action) => {
    switch (action.type) {
        case 'loginshow':
            const newState1 = JSON.parse(JSON.stringify(state));
            newState1.show = action.value
            return newState1
        default:
        return state
        case 'setUserInfo':
            const userInfoState = JSON.parse(JSON.stringify(state))
            userInfoState.userInfo = action.value
            return userInfoState

    }

}
