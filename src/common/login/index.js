import React,{ Component } from 'react'
import {LoginWrapper,AllContent,TitleContent,LoginUsername,LoginPass,LoginBtn} from "./style";
import {connect} from 'react-redux'
import {Button,Avatar,Input } from 'antd'
import {loginInfo,register} from '../../api/http'
import {actionCreators} from './store'
import { userInfo } from 'os';
class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            isLogin:true,
            isRegister:false,
            loginUsername:'',
            loginPass:'',
            registerUsername:'',
            registerPass:'',
            name:''
        }
        this.getLogin = this.getLogin.bind(this)
        this.getRegister = this.getRegister.bind(this)
        this.loginInputChange = this.loginInputChange.bind(this)
        this.loginSubmit = this.loginSubmit.bind(this)
        this.registerSubmit = this.registerSubmit.bind(this)
    }
    loginSubmit(){
        if(this.state.loginUsername&&this.state.loginPass)
            {
                    const payload={
                        username:this.state.loginUsername,
                        pass:this.state.loginPass
                    }
                this.props.userInfo(payload)
            }else{
                alert('用户名密码不能为空')
            }

    }
    registerSubmit(){
        if(this.state.registerUsername&&this.state.registerPass&&this.state.name)
        {
                const payload={
                    registerUsername:this.state.registerUsername,
                    registerPass:this.state.registerPass,
                    name:this.state.name
                }
                return new Promise((reject,resolve)=>{
                    register(payload).then((res)=>{
                       alert('注册成功')
                       this.setState({
                        isLogin:true,
                        isRegister:false
                       })
                }).catch(error => {
                    reject(error)
                })
            })
        }else{
            alert('用户名密码名字均不能为空')
        }

    }
    loginInputChange(type,name,e){
        if(type === 'login' && name==='username')
        {
            this.setState({
                loginUsername:e.target.value
            })
            // this.loginUsername = e.target.value
        }else if(type === 'register' && name==='username')
        {
            this.setState({
                registerUsername:e.target.value
            })
            // this.registerUsername = e.target.value
        }else if(type === 'login' && name==='pass'){
            this.setState({
                loginPass:e.target.value
            })
            // this.loginPass = e.target.value
        }else if(type === 'register' && name==='pass'){
            this.setState({
                registerPass:e.target.value
            })
            // this.registerPass = e.target.value
        }else if(type==='register'&&name === 'name'){
            this.setState({
                name:e.target.value
            })
            // this.name = e.target.value
        }        
    }

    render() {
        if(this.props.isShow){
            if(this.state.isLogin)
            {
                return(
                    <AllContent>
                        <LoginWrapper>
                            <p onClick={()=>this.props.LoginPop(false)}>x</p>
                            <TitleContent>
                                <span className={'active'} onClick={this.getLogin}>登录</span>
                                <span>-</span>
                                <span onClick={this.getRegister}>注册</span>
                            </TitleContent>
                            <LoginUsername>
                                <Avatar shape="square" size="small" icon="user"></Avatar>
                                <Input placeholder="用户名" onChange={(v)=>{this.loginInputChange('login','username',v)}}/>
                            </LoginUsername>
                            <LoginPass>
                                <Avatar shape="square" size="small" icon="user"></Avatar>
                                <Input placeholder="密码" onChange={(v)=>{this.loginInputChange('login','pass',v)}}  />
                            </LoginPass>
                            <LoginBtn>
                                <Button type="primary" size="large" onClick={this.loginSubmit}>登录</Button>
                            </LoginBtn>
    
                        </LoginWrapper>
                    </AllContent>
                    // hello
                )
            }else if(this.state.isRegister){
                return(
                    <AllContent>
                        <LoginWrapper>
                            <p  onClick={()=>this.props.LoginPop(false)}>x</p>
                            <TitleContent>
                                <span onClick={this.getLogin}>登录</span>
                                <span>-</span>
                                <span className={'active'} onClick={this.getRegister}>注册</span>
                            </TitleContent>
                            <LoginUsername>
                                <Avatar shape="square" size="small" icon="user"></Avatar>
                                <Input placeholder="你的昵称"  onChange={(v)=>{this.loginInputChange('register','name',v)}} />
                            </LoginUsername>
                            <LoginPass>
                                <Avatar shape="square" size="small" icon="user"></Avatar>
                                <Input placeholder="用户名"  onChange={(v)=>{this.loginInputChange('register','username',v)}} />
                            </LoginPass>

                            <LoginPass>
                                <Avatar shape="square" size="small" icon="user"></Avatar>
                                <Input placeholder="设置密码"  onChange={(v)=>{this.loginInputChange('register','pass',v)}} />
                            </LoginPass>
                            <LoginBtn>
                                <Button type="primary" size="large" onClick={this.registerSubmit} className={'register'}>注册</Button>
                            </LoginBtn>
    
                        </LoginWrapper>
                    </AllContent>
                    // hello
                ) 
            }
        }else{
            return(
                null
            )
        }
    }
    getLogin(){
        this.setState({
            isLogin:true,
            isRegister:false
        })
    }
    getRegister(){
        this.setState({
            isLogin:false,
            isRegister:true
        })
    }
}

const mapStateToProps = (state) =>{            //state是指store里的数据
    // console.log(state.login.show)
    return{
        isShow:state.login.show      //将store里的inputValue映射到inputValue,此时组件取值要用this.props.inputValue
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        LoginPop(isshow){
            dispatch(actionCreators.loginShow(isshow))
        },
        userInfo(data){
            dispatch(actionCreators.UserInfo(data))  
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Login)
