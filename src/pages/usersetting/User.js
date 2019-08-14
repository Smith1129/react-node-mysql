import React,{ Component } from 'react'
import {UserHomeWrapper,Name} from './style'
import {connect} from 'react-redux'
import { Upload, message, Button, Icon} from 'antd'
import axios from 'axios'
import {uploadAvatar,updateName} from '../../api/http'
class User extends Component{
    constructor(props){
        super(props)
        this.state = {
            formData:'',
            name:'',
            avatar:''
        }
        // this.handleChange = this.handleChange.bind(this)
        this.customRequest = this.customRequest.bind(this)
        this.handleUploadBefore = this.handleUploadBefore.bind(this)
        this.handleName = this.handleName.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }
    render() {
        if(this.props.userInfo)
        {
            return(
                <UserHomeWrapper>
                    <img src={this.state.avatar} alt=''></img>
                    <Upload  beforeUpload={this.handleUploadBefore}
                        customRequest={this.customRequest}
                    >
                        <Button className={'upload'}>
                        <Icon type="upload" /> 更换头像
                        </Button>
                    </Upload>
                    <Name>
                         <span>昵称</span><input value={this.state.name} onChange={(e)=>{this.handleName(e)}}></input><span onClick={this.handleUpdate}>修改</span>
                    </Name>
    
                </UserHomeWrapper>
            )
        }else{
            return null
        }
    }
    
    componentDidMount(){
        this.setState({
            name:this.props.userInfo.name,
            avatar:this.props.userInfo.avatar
        })
    }
    handleUpdate(){
        return new Promise((reject,resolve)=>{
            const payload = {
                name:this.state.name,
                type:'name'
            }
            updateName(payload).then(()=>{
                alert('修改成功')
            }).catch(error=>{
                reject(error)
            })
        })
    }
    handleName(e){
       this.setState({
        name:e.target.value
       })
    }
    handleUploadBefore(e){
        if(e.type.indexOf("image/") === -1){
            alert('请选择正确的图片格式')
            return false
        }else{
            const  isLt2M = e.size / 1024 / 1024 < 2
            if(!isLt2M){
                alert('上传图片大小不能超过2MB')
                return false
            }
            this.setState({
                formData:e
            })
            return true
        }

    }
    customRequest(){
        const formdata =  new FormData()
        formdata.append('smfile', this.state.formData);
            axios.post('https://sm.ms/api/upload',formdata).then((res) =>{
                if(res.data.code === 'success'){
                    const payload = {
                        imgUrl:res.data.data.url,
                        type:'upload'
                    }
                    return new Promise((reject,resolve)=>{
                        uploadAvatar(payload).then((res)=>{
                            this.setState({
                                avatar:res.Data.imgUrl
                            })
                            message.success(` uploaded successfully`);
                        }).catch(error=>{
                            reject(error)
                        })
                    })
                }else{
                    alert('请勿重复上传！！！')
                }
            })

    }
}
const mapStateToProps = (state) =>{            //state是指store里的数据
    return{
        userInfo:state.login.userInfo      //将store里的inputValue映射到inputValue,此时组件取值要用this.props.inputValue
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        initData(){
            // this.setState({
            //     name:this.props.userInfo.name
            // })
        }
        // LoginPop(isshow){
        //     dispatch(actionCreators.loginShow(isshow))
        // },
        // userInfo(data){
        //     dispatch(actionCreators.UserInfo(data))  
        // }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(User)
