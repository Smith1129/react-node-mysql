
import React,{Component} from 'react';
import ReactQuill,{ Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button ,Modal,message} from 'antd';
import axios from 'axios'
// import MYURL  from '../api/config';
import { ImageDrop } from 'quill-image-drop-module';
Quill.register('modules/imageDrop', ImageDrop);

class Editer extends Component {
    constructor(props) {
        super(props)
        this.state = { text: '' } // You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this)
        this.selectImage = this.selectImage.bind(this);
        this.changeImageBeforeUpload = this.changeImageBeforeUpload.bind(this);
        this.imageHandler = this.imageHandler.bind(this);
        this.showUploadBox = this.showUploadBox.bind(this);
        this.hideUploadBox =this.hideUploadBox.bind(this);
        this.handleUpload =this.handleUpload.bind(this);
    }
    handleChange(value) {
        console.log(value)
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
        console.log('eeeeeee',window)
    }
    /*3.开始上传图片*/
    handleUpload(){      
        let this_=this;
        /*调用上传图片的封装方法*/
        if(!this.state.file){
            alert('请选择图片！！')
        }else{
            console.log(1000)
            console.log(this.state)
            const formdata =  new FormData()
            formdata.append('smfile', this.state.file);
                axios.post('https://sm.ms/api/upload',formdata).then((res) =>{
                    console.log(res)
                    if(res.data.code === 'success'){
                        this_.hideUploadBox();//隐藏弹框
                        this_.imageHandler(res.data.data.url);//处理插入图片到编辑器
                        // const payload = {
                        //     imgUrl:res.data.data.url,
                        //     type:'upload'
                        // }
                        // return new Promise((reject,resolve)=>{
                        //     uploadAvatar(payload).then((res)=>{
                        //         this.setState({
                        //             avatar:res.Data.imgUrl
                        //         })
                        //         message.success(` uploaded successfully`);
                        //     }).catch(error=>{
                        //         reject(error)
                        //     })
                        // })
                    }else{
                        alert('请勿重复上传！！！')
                    }
            })
            // let fileServerAddr = MYURL.fileServer //服务器地址
            // let file =this.state.file.name
            // let size =this.state.file.size
            // this.uploadForImage(fileServerAddr,file,size,function (response) {//回调函数处理进度和后端返回值
            //     console.log('res----?>',response)
            //     if ((response && response.status === 200) ||(response && response.status === "200")) {
            //         message.success("上传成功！");
            //         this_.hideUploadBox();//隐藏弹框
            //         console.log("response.data.url???=>",response.data.url)
            //         this_.imageHandler(response.data.url);//处理插入图片到编辑器
            //     }else if (response && response.status !== 200) {
            //         message.error(response.msg)
            //     }
            // },
            // localStorage.getItem("access_token"));
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
        console.log("quill.getSelection.======",quill.getSelection().index)
    };
    render() {
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
                <div className="ImagaBox" >
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
            <div>提交</div>
        </div>
      )
    }
};
export default  Editer;