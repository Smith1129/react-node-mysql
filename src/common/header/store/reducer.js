import * as Constants from './constants'
const defaultState = {
    focused:false,
    mouseIn:false,
    list:[],
    page:0,
    pageCount:0
}
export default (state = defaultState,action) => {
    switch (action.type) {
        case Constants.SEARCH_FOCUS:
            const newState1 = JSON.parse(JSON.stringify(state));
            newState1.focused = true
            return newState1
        case Constants.SEARCH_BLUR:
            const newState2 = JSON.parse(JSON.stringify(state));
            newState2.focused = false
            return newState2
        case Constants.CHANGE_LIST:
            const newState = JSON.parse(JSON.stringify(state));
            newState.list = action.value;
            newState.pageCount = action.pageCount
            return newState;
        case Constants.MOUSEIN_TRUE:
            const newState3 = JSON.parse(JSON.stringify(state));
            newState3.mouseIn = action.value
            return newState3
        case Constants.MOUSEIN_FALSE:
            const newState4 = JSON.parse(JSON.stringify(state));
            newState4.mouseIn = action.value
            return newState4
        case Constants.PAGE_CHANGE:
            const newState5 = JSON.parse(JSON.stringify(state));
            newState5.page = action.value
            return newState5
        default:
        return state

    }
    // if(action.type === Constants.SEARCH_FOCUS)
    // {
    //     return {
    //         focused:true,
    //         list:[]
    //     }
    // }
    // if(action.type === Constants.SEARCH_BLUR)
    // {
    //     return {
    //         focused:false
    //     }
    // }
    // if(action.type === Constants.CHANGE_LIST)
    // {
    //     const newState = JSON.parse(JSON.stringify(state))
    //     newState.list = action.value
    //     return newState
    // }
    // return state
}
