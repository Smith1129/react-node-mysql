import React,{Component} from 'react'
import {HeaderWrapper,Logo,Nav,NavItem,NavSearch,Addtion,Button,SearchWrapper,SearchInfo,SearchInfoTitle,SearchInfoSwitch,SearchInfoItem,SearchInfoList} from './style'
import { CSSTransition } from "react-transition-group";
import { connect } from 'react-redux'
import {actionCreators} from './store'
import {Link} from 'react-router-dom'
import  * as actionCreators1 from '../login/store/actionCreators'
import { Menu, Dropdown } from 'antd'
const menu = (
    <Menu>
      <Menu.Item>
      <Link to='/userInfo'>
          设置
      </Link>
      </Menu.Item>
    </Menu>
  );
class Header extends Component{
    render() {
        console.log(this.props.userInfo)
        return(
            <HeaderWrapper>
                <Link to='/'>
                <Logo/>
                </Link>
                <Nav>
                    <NavItem className='left active'>首页</NavItem>
                    <NavItem className='left'>下载APP</NavItem>
                    {this.props.userInfo?null:<NavItem className='right' onClick={()=>{this.props.getLogin(1)}}>登录</NavItem>}
                    {/* <NavItem className='right' onClick={()=>{this.props.getLogin()}}>登录</NavItem> */}
                    <NavItem className='right'>
                        <span className="iconfont">&#xe636;</span>
                    </NavItem>
                    <SearchWrapper>
                        <CSSTransition
                            in={this.props.focused}
                            timeout={200}
                            classNames={'slide'}
                        >
                            <NavSearch onFocus={()=>{this.props.handleInputSlide(this.props.list)}} className={this.props.focused ? 'focused' : ''} onBlur={this.props.handleInputBlur}></NavSearch>
                        </CSSTransition>
                        <span  className={this.props.focused ? 'iconfont focused zoom' : 'iconfont zoom'}>&#xe62d;</span>
                        {this.getListArea(this.props.focused)}
                    </SearchWrapper>
                </Nav>
                <Addtion>
                    {/* xiewenzhang */}
                    <Link to='/article'>
                        <Button className='writting'>
                            <span className="iconfont">&#xe615;</span>
                            写文章</Button>
                    </Link>
                        {/* <span onMouseEnter={this.getInfoList} className={'name'}>{this.props.userInfo.name}</span> */}
                    {this.props.userInfo?( <Dropdown overlay={menu} placement="bottomLeft">
                            <img src={this.props.userInfo.avatar} alt=''></img>
                        </Dropdown>):(<Button onClick={()=>{this.props.getLogin(2)}} className='reg'>注册</Button>)}
                </Addtion>
            </HeaderWrapper>
        )
    }
    
   
    getListArea(show)
    {
     const pageList = []
     for(let i =(this.props.page)*10;i<(this.props.page+1)*10;i++)
     {
        pageList.push(this.props.list[i])
     }
        if(show || this.props.mouseIn){
                return(
                    <SearchInfo onMouseEnter={this.props.handleMouseEnter}
                                onMouseLeave={this.props.handleMouseLeave}>
                        <SearchInfoTitle>
                            热门搜索
                            <SearchInfoSwitch onClick={()=>{
                                this.props.pageChange(this.props.page,this.props.pageCount,this.spin)
                            }}>
                                <span ref={(spin)=>{
                                    this.spin = spin
                                }} className="iconfont spin">&#xe606;</span>换一批
                            </SearchInfoSwitch>
                        </SearchInfoTitle>
                        <SearchInfoList>
                            {pageList.map((item,index)=>{
                                return(
                                    <SearchInfoItem key={index}>{item}</SearchInfoItem>
                                )
                            })}
                        </SearchInfoList>
                    </SearchInfo>
                )
        }else {
            return null
        }
    }
    componentDidMount(){
        this.props.checkInfo()
    }
}

const mapStateToProps = (state) =>{
    return{
        focused:state.header.focused,
        list:state.header.list,
        page:state.header.page,
        mouseIn:state.header.mouseIn,
        pageCount:state.header.pageCount,
        userInfo:state.login.userInfo
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        checkInfo(){
            dispatch(actionCreators1.checkUser())
        },
        getLogin(index){
            if(index===1){
                dispatch(actionCreators1.loginShow(true))
            }
            if(index===2){
                dispatch(actionCreators1.loginShow(true))
                dispatch(actionCreators1.registerShow(true))
            }
        },
        handleInputSlide(list){
            dispatch(actionCreators.slideTrue())
            if(!list.length)
            {
                dispatch(actionCreators.getSearchList())
            }
        },
        handleInputBlur(){
            dispatch(actionCreators.slideFalse())
        },
        handleMouseEnter(){
            dispatch(actionCreators.mouseInTrue())
        },
        handleMouseLeave(){
            dispatch(actionCreators.mouseInFalse())
        },
        pageChange(page,pageCount,spin){
            let originAngle = spin.style.transform.replace(/[^0-9]/ig,'')
            if(originAngle){
                originAngle = parseInt(originAngle,10)
            }else {
                originAngle = 0
            }
            spin.style.transform = 'rotate(' + (originAngle+360) + 'deg)'
            if(page<pageCount-1)
            {
                page++
            }else {
                page=0
            }
            dispatch(actionCreators.pageChange(page))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header)