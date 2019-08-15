
import React,{Component} from 'react';
import {connect} from 'react-redux'
import ReactQuill,{ Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button ,Modal,message,Upload,Icon} from 'antd';
import axios from 'axios'
import {ArticleContent, ImgContent, DescContent} from './style'
import { ImageDrop } from 'quill-image-drop-module';
import {articleSave} from '../../api/http'
Quill.register('modules/imageDrop', ImageDrop);

class Article extends Component {
    constructor(props) {
        super(props)
        this.state = { text: '' ,
        visible:false,
        title:'',
        desc:'',
        descImg:'',
        formData:''
    } // You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this)
        this.selectImage = this.selectImage.bind(this);
        this.changeImageBeforeUpload = this.changeImageBeforeUpload.bind(this);
        this.imageHandler = this.imageHandler.bind(this);
        this.showUploadBox = this.showUploadBox.bind(this);
        this.hideUploadBox =this.hideUploadBox.bind(this);
        this.handleUpload =this.handleUpload.bind(this);
        this.submit = this.submit.bind(this)
        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.titleChange = this.titleChange.bind(this)
        this.handleDescChange = this.handleDescChange.bind(this)
        this.handleUploadBefore = this.handleUploadBefore.bind(this)
        this.customRequest = this.customRequest.bind(this)
    }
    handleChange(value) {
        this.setState({ text: value })
    };
    modules={//富文本配置
        toolbar:{
            container:[
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike','blockquote'],        // toggled buttons
                ['blockquote', 'code-block'],
                // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction
                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'},{ 'align': [] }],
                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'align': [] }],
                ['link', 'image', 'video'],
                ['clean'],
            ],
            handlers: {
                'image':this.showUploadBox.bind(this)
            }
        },
        imageDrop: true,
    };
    submit(){
        if(this.state.text){
            // this.props.handleSubmit(this.state.text)
            this.setState({
                visible:true
            })
        }else{
            alert('文章内容不能为空！！')
        }
    }
    showUploadBox(){
        this.setState({
            uploadBoxVisible:true
        });
    };
    hideUploadBox(){
        this.setState({
            uploadBoxVisible:false
        });
    };
    
    selectImage(){
        this.refs.uploadInput.click();//点击modal的html结构中的input标签
    };

    changeImageBeforeUpload(e){
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        let src;
        // 匹配类型为image/开头的字符串
        if (file.type==="image/png"||file.type==="image/jpeg") {
            src = URL.createObjectURL(file);
        }else{
            message.error("图片上传只支持JPG/PNG格式,请重新上传！");
            return;
        }
        if (file.size/1024/1024>5) {
            message.error("图片上传大小不要超过5MB,请重新上传！");
            return;
        }
        this.setState({
            src:src,
            file:file
        })
    }
    /*3.开始上传图片*/
    handleUpload(){      
        let this_=this;
        /*调用上传图片的封装方法*/
        if(!this.state.file){
            alert('请选择图片！！')
        }else{
            const formdata =  new FormData()
            formdata.append('smfile', this.state.file);
                axios.post('https://sm.ms/api/upload',formdata).then((res) =>{
                    if(res.data.code === 'success'){
                        this_.hideUploadBox();//隐藏弹框
                        this_.imageHandler(res.data.data.url);//处理插入图片到编辑器
                    }else{
                        alert('请勿重复上传！！！')
                    }
            })
        }
        
    };
    /*4.处理图片插入*/
    imageHandler(url){
        if (typeof this.reactQuillRef.getEditor !== 'function') return;
        const quill = this.reactQuillRef.getEditor()
        var range = quill.getSelection();
        let index = range ? range.index : 0;
        quill.insertEmbed(index, "image",url, Quill.sources.USER);//插入图片
        quill.setSelection(index + 1);//光标位置加1 
    };
    // componentDidMount(){
    //     if(!this.props.userInfo){
    //         this.props.getLoginPop()
    //     }
    // }
    titleChange(e){
        this.setState({
            title:e.target.value
        })
    }
    handleOk(){
        if(this.state.title){
            if(this.state.descImg){
                if(this.state.desc){
                     this.handleSubmit(this.state.text,this.state.title,this.state.descImg,this.state.desc)
                }else{
                    message.error('请输入文章描述!!!!!!')
                }

            }else{
                message.error('请上传文章描述图!!!!!!')
            }
        }else{
            message.error('请输入文章标题!!!!!!')
        }
    }
    handleCancel(){
        this.setState({
            visible: false,
          });
    }
    handleDescChange(e){
        this.setState({
            desc:e.target.value
        })
    }
    handleSubmit(content,title,descImg,desc){
        const payload = {content:content,title:title,descImg:descImg,desc:desc}
            return new Promise((reject,resolve)=>{
                    articleSave(payload).then((res)=>{
                        message.success('发布文章成功!!!!')
                        this.props.history.push('/')
                    }).catch(error=>{
                            reject(error)
                    })
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
                    this.setState({
                        descImg:res.data.data.url
                    })
                    // message.success(` uploaded successfully`);
                }else{
                    alert('请勿重复上传！！！')
                }
            })

    }
    render() {
        if(!this.props.userInfo){
            return null
        }else{

      return (
        // maxHeight:"500px"
        <div>
            <ReactQuill id="ddd"  ref={(el) =>{this.reactQuillRef = el}} value={this.state.text} onChange={this.handleChange}
                theme={"snow"}  modules={this.modules} />
            <Modal
                title="上传图片"
                visible={this.state.uploadBoxVisible}
                onCancel={this.hideUploadBox}
                onOk={ this.handleUpload }
                maskClosable={false}
                width={500}
                >
                <div className={'ImagaBox'} >
                    <div>
                        <Button onClick={this.selectImage.bind(this)} style={{background:"#18ade4",border:"none",color:"#fff"}}>
                            选择图片
                        </Button>
                        <input ref="uploadInput" type='file' accept='image/*'
                            style={{width:"100px",border:"none",visibility:"hidden"}}
                            onChange={this.changeImageBeforeUpload.bind(this)}
                        />
                    </div>
                    <div style={{textAlign:"center",margin:"10px 0"}}>
                        {this.state.src?
                            <img src={this.state.src} alt="" style={{maxWidth:"100%",height:"300px"}}/>
                            :
                            <div style={{background:"#f2f2f2",width:"100%",height:"300px"}}></div>
                        }
                    </div>
                </div>
            </Modal>
            <Button type="primary" onClick = {()=>{this.submit()}}>提交</Button>
                <Modal
                        title="请输入文章展示标题、缩略图、描述等"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        >
                       <ArticleContent>
                            标题：<input value={this.state.title} onChange={(e)=>this.titleChange(e)}></input>
                            <ImgContent>
                                <span>描述图：</span>
                                    <Upload  beforeUpload={this.handleUploadBefore}
                                        customRequest={this.customRequest}
                                        className={'uploadImg'}
                                    >
                                        <Button className={'upload'}>
                                        <Icon type="upload" /> 上传图片
                                        </Button>
                                    </Upload>
                                    {this.state.descImg?(<img src={this.state.descImg} alt=''></img>):null}
                            </ImgContent>
                            <DescContent>
                                <span>文章描述：</span>
                                <textarea rows="3" cols="20" value={this.state.desc} onChange={(e)=>{this.handleDescChange(e)}}>
                                </textarea>
                            </DescContent>
                        </ArticleContent>
                </Modal>
        </div>
      )
    }
}
};
const mapStateToProps = (state) =>{            //state是指store里的数据
    return{
        userInfo:state.login.userInfo      //将store里的inputValue映射到inputValue,此时组件取值要用this.props.inputValue
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getLoginPop(){
            dispatch({type:'loginshow',value:true})
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Article)