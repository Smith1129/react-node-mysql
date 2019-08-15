import React,{ Component } from 'react'
import {ListItem,ListInfo,LoadMore} from "../style";
import {connect} from 'react-redux'
import { actionCreators } from '../store'
import {Link} from 'react-router-dom'

class List extends Component{
    render() {
        console.log(this.props)
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
                            {/* {item.articleUp?(<span className="iconfont">&#xe682;<em>{item.articleUp}</em></span>):(<span className="iconfont">&#xe682;<em>0</em></span>)} */}
                            
                            {/* <span className="iconfont">&#xe682;</span> */}
                            {/* &#xe627; */}
                            <span className="iconfont">&#xe61d;</span>
                            {/* &#xe608; */}
                            <span className="iconfont">&#xe618;</span>
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
        articleList:state.home.ArticleList,      //将store里的inputValue映射到inputValue,此时组件取值要用this.props.inputValue
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
