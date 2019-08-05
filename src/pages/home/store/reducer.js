import * as Constants from './constants'
const defaultState = {
    TopicList:[],
    ArticleList:[],
    recommendList:[],
    scrollShow:false
}
export default (state = defaultState,action) => {
    switch (action.type) {
        case Constants.GET_HOMEDATA:
            const newState1 = JSON.parse(JSON.stringify(state));
            newState1.TopicList = action.value
            newState1.ArticleList = action.ArticleList
            newState1.recommendList = action.recommendList
            return newState1
        case Constants.LOAD_MORE:
            const newState2 = JSON.parse(JSON.stringify(state));
            newState2.ArticleList = [...newState2.ArticleList,...action.value];
            return newState2
        case Constants.SCROLL_SHOW:
            const newState3 = JSON.parse(JSON.stringify(state));
            newState3.scrollShow = action.value
            return newState3
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
