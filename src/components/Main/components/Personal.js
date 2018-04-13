import React from 'react'
import './personal.less'
import axios from 'axios'
import Dropzone from 'react-dropzone'
import Blocker from '../components/Blocker'
import {ActionSheet,Toast,WhiteSpace,Button} from 'antd-mobile'
import {browserHistory} from 'react-router'
import request from 'superagent'
const CLOUDINARY_UPLOAD_PRESET = 'fpjzpwg1';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/coderzzp2/upload';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

export default class Personal extends React.Component{
  constructor(props){
    super(props)
    this.state={
      data:null,
      user:{},
      uploading:false,
      uploadedFileCloudinaryUrl:'',
      tempImg:'',
    }
  }
  componentWillMount(){
    axios.get('user/info', {withCredentials: true})
      .then(res=>{
        if(!res.data.success){
          Toast.fail(res.data.err)
          browserHistory.push('/login')
        }else{
          console.log(res)
          this.setState({
            data:res.data.info,
            user:res.data.user,
          })
        }
      })
  }
  onCancleBlog(cancledData){
    console.log(cancledData)
    console.log(this.state.data)
    var data = this.state.data
    data.forEach((element,index) => {
      if(element===cancledData){
        data.splice(index,1)
        this.setState({data})
      }
    });
    
  }
  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });
    this.readAsDataURL(files[0])
  }
  readAsDataURL(file){ 
    const self= this
    //检验是否为图像文件 
    if(!/image\/\w+/.test(file.type)){ 
      alert("看清楚，这个需要图片！"); 
      return false; 
    } 
    var reader = new FileReader(); 
    //将文件以Data URL形式读入页面 
    reader.readAsDataURL(file)
    console.log(reader)
    reader.onload=function(e){ 
      self.setState({
        tempImg:reader.result
      })
    } 
  }
  onHeadSure(){
    console.log(this)
    this.setState({uploading:true})
    this.handleImageUpload(this.state.tempImg);
    this.setState({
      tempImg:''
    }) 
  }
  onHeadCancle(){
    this.setState({
      tempImg:''
    }) 
  }
  onLike(_id){
    axios.get(`b/like/${_id}`, {withCredentials: true})
      .then((res)=>{
        if(res.data){
          axios.get('b/main', {withCredentials: true})
            .then((res)=>{
              const data= res.data.data
              this.setState({data})
            })
        }
      })
  }
  onDisLike(_id){
    axios.get(`b/dislike/${_id}`, {withCredentials: true})
      .then((res)=>{
        if(res.data){
          axios.get('b/main', {withCredentials: true})
            .then((res)=>{
              const data= res.data.data
              this.setState({data})
            })
        }
      })
  }
  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                     .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                     .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        //这里去发出请求
        axios.post('u/changeheadimg', {headImgUrl:response.body.secure_url},{withCredentials: true,})
          .then((res)=>{
            if(res.data.success){
              this.setState({
                uploading:false,
                uploadedFileCloudinaryUrl: response.body.secure_url
              });
            }else{
              alert('上传失败！')
            }
          })
       
      }
    });
  }
  renderBlocker(){
    let res=[]
    const data= this.state.data
    if(data){
      var reactkey = 1;
      res.push(
        data.map((item,index)=>{
          return (
            <div key={reactkey++}>
              <WhiteSpace size="md" key={item.id}/>
              <Blocker data={item} onLike={(_id)=>this.onLike(_id)} onDisLike={(_id)=>this.onDisLike(_id)} ifCancel='1' onCancleBlog={(cancledData)=>this.onCancleBlog(cancledData)}/>
            </div>
          )
        })
      )
      return res
    }
  }

  showActionSheet = () => {
    
    const BUTTONS = [
    <div >
      <Dropzone
      className='Dropzone'
      onDrop={this.onImageDrop.bind(this)}
      multiple={false}
      accept="image/*">
      上传头像
      </Dropzone>
    </div>, 'Cancel'];
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      // title: 'title',
      message: 'I am description',
      maskClosable: true,
      'data-seed': 'logId',
      wrapProps,
    },
    (buttonIndex) => {
      this.setState({ clicked: BUTTONS[buttonIndex] });
    });
  }
  render(){
    console.log(this.state.uploadedFileCloudinaryUrl)
    return (
      <div>
        {this.state.tempImg?
          <div style={{'width':'400px','height':'780px','backgroundColor':'black',display:'fixed'}}>
            <Button inline onClick={()=>this.onHeadSure()}>确定</Button>
            <Button inline onClick={()=>this.onHeadCancle()}>取消</Button>
            <img src={this.state.tempImg} style={{'width':'100%','marginTop':'200px'}}/>
          </div>
          :
        <div>
          <div className='personal_container'>
            <div className='personal_head'>
              <Button onClick={this.showActionSheet} className='head'>
                {this.state.uploadedFileCloudinaryUrl?
                <img src={this.state.uploadedFileCloudinaryUrl} alt='head'/>:
                <img src={this.state.user.headImgUrl} alt='fuck'/>}
              </Button>
              {this.state.user.userName}
            </div>
          </div>
          <div style={{textAlign:'center'}}>
            miniweb
          </div>
          {this.renderBlocker()}
        </div>}
      </div>
    )
  }
}