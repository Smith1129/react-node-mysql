import * as Constants from './constants'
const defaultState = {
    TopicList:[],
    ArticleList:[],
    recommendList:[],
    scrollShow:false,
    UpList:[]
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
        case 'setUpList':
            const newState4 = JSON.parse(JSON.stringify(state));
            newState4.UpList = action.value
            return newState4
        default:
            return state
    }
}
