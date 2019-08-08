
import {articleSave} from '../../../api/http'

export const saveArticle = (data)=>{
        return (dispatch) =>{
                const payload = {content:data}
                return new Promise((reject,resolve)=>{
                        articleSave(payload).then((res)=>{
                                alert('保存文章成功!!!')
                        }).catch(error=>{
                                reject(error)
                        })
                })
        }
}


