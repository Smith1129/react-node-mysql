import React,{ Component } from 'react'
import { HomeWrapper ,HomeLeft,HomeRight,BackTop} from "./style";
import Topic from './components/Topic'
import Recommend from './components/Recommend'
import List from './components/List'
import Writer from './components/Writer'
import {connect} from 'react-redux'
import {actionCreators} from './store'
class Home extends Component{
    handleScrollToTop(){
        window.scroll(0,0)
    }
    render() {
        return(
            <HomeWrapper>
                <HomeLeft>
                <img className='banner-img' src='//upload.jianshu.io/admin_banners/web_images/4668/77e4329017294a607d78e74789afc6a22f4a6ebe.png?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540' alt=''/>
                    <Topic></Topic>
                <List/>
                </HomeLeft>
                <HomeRight>
                    <Recommend/>
                    <Writer/>
                </HomeRight>
                {
                    this.props.scrollShow ? <BackTop onClick={this.handleScrollToTop}>回到顶部</BackTop> : null
                }
            </HomeWrapper>
        )
    }
    componentDidMount() {
        this.props.getHomeData()
        this.bindEvents()
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.props.changeScrollShow);
    }

    bindEvents(){
        window.addEventListener('scroll',this.props.changeScrollShow)
    }
}
//连接方式
const mapStateToProps = (state) =>{            //state是指store里的数据
    return{
        scrollShow:state.home.scrollShow,     //将store里的inputValue映射到inputValue,此时组件取值要用this.props.inputValue
        userInfo:state.login.userInfo
    }
}
//对store里的数据做修改
const mapDispatchToProps = (dispatch) =>{   //将store.dispatch方法挂载到dispatch上
    return{
        getHomeData(){
            dispatch(actionCreators.getHomeList())
        },
        changeScrollShow(){
            if(document.documentElement.scrollTop > 100)
            {
                dispatch(actionCreators.changeScrollShow(true))
            }else {
                dispatch(actionCreators.changeScrollShow(false))
            }

        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)
