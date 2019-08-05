import React,{ Component } from 'react'
import {ListItem,ListInfo,LoadMore} from "../style";
import {connect} from 'react-redux'
import { actionCreators } from '../store'
import {Link} from 'react-router-dom'

class List extends Component{
    render() {
        return(
        <div>
            {this.props.articleList.map((item,index)=>{
                return(
                    <Link key={index} to={'/detail/'+item.id}>
                    <ListItem>
                        <img className='pic' src={item.imgUrl}alt=''/>
                        <ListInfo>
                            <h3 className='title'>{item.title}</h3>
                            <p className='desc'>{item.desc}</p>
                            <span className="iconfont">&#xe602;</span>
                            <span className="iconfont">&#xe623;</span>
                            <span className="iconfont">&#xe626;</span>
                        </ListInfo>
                    </ListItem>
                    </Link>

                )
            })}
            <LoadMore onClick={this.props.handleLoadMore}>更多文字</LoadMore>
        </div>
        )
    }
}
const mapStateToProps = (state) =>{            //state是指store里的数据
    return{
        articleList:state.home.ArticleList      //将store里的inputValue映射到inputValue,此时组件取值要用this.props.inputValue
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        handleLoadMore(){
            dispatch(actionCreators.loadMore())
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(List)
