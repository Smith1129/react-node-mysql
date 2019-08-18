import {constants} from './index'
import {homeList,upOrlike} from '../../../api/http'
import axios from 'axios'
export const getHomeList = ()=>{
        return (dispatch)=> {
                return new Promise((reject,resolve)=>{
                        homeList().then((res)=>{
                      dispatch(initTHomeList(res.Data))
                    }).catch(error => {
                        reject(error)
                    })
                })
        }
}
export const getUpList = ()=>{
        return (dispatch)=> {
                const payload = {isAll:true}
                return new Promise((reject,resolve)=>{
                 upOrlike(payload).then((res)=>{
                        dispatch({
                                type:'setUpList',
                                value:res.Data
                        })
                    }).catch(error => {
                        reject(error)
                    })
                })
        }
}

const initTHomeList = (data)=>{
        return{
                type:constants.GET_HOMEDATA,
                value:data.topicList,
                ArticleList:data.articleList,
                recommendList:data.recommendList,
                articleLike:data.articleLike,
                articleUp:data.articleUp,
                articleComment:data.articleComment
        }
}

export const loadMore = () =>{
        return (dispatch)=> {
                axios.get('/api/homeList.json').then((res) => {
                        dispatch(loadMoreList(res.data.data))
                }).catch(()=>{
                })
        }
}
const loadMoreList = (data) =>{
        return{
                type:constants.LOAD_MORE,
                value:data.articleList
        }
}

export const changeScrollShow = (show) => {
        return{
                type:constants.SCROLL_SHOW,
                value:show
        }
}



