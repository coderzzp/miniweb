import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { Toast,List, TextareaItem } from 'antd-mobile';
import {createForm} from 'rc-form'
import { browserHistory } from 'react-router';
import Controller from './components/Controller'
import './index.less'
import axios from 'axios'

const CLOUDINARY_UPLOAD_PRESET = 'fpjzpwg1';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/coderzzp2/upload';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploading:false,
      uploadedFile: null,
      uploadedFileCloudinaryUrl: ''
    };
  }
  componentWillMount(){
    //若该用户未登录，则跳转至登陆页面
    axios.get('b/auth',{withCredentials: true})
      .then(res=>{
        if(!res.data.success){
          Toast.fail(res.data.err)
          browserHistory.push('/login')
        }
      })
  }
  onPublish(){
    //收集数据并发送
    const word = this.props.form.getFieldValue('word')
    const uploadedFileCloudinaryUrl = this.state.uploadedFileCloudinaryUrl
    const json = {
      word,
      uploadedFileCloudinaryUrl
    }
    axios.post('b/publish', json,{withCredentials: true})
      .then((res)=>{
        Toast.success('发表成功')
        browserHistory.push('/')
      })
  }
  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });
    this.setState({uploading:true})
    this.handleImageUpload(files[0]);
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
        this.setState({
          uploading:false,
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }

  render() {
    const { getFieldProps } = this.props.form;
    const {uploading} = this.state
    return (
      <div className='Publish'>
        {uploading&&Toast.loading('正在上传，请稍候...', 1)}
        <Controller onPublish={()=>this.onPublish()} disabled={this.state.uploadedFileCloudinaryUrl?false:true}/>
        <List >
          <TextareaItem
            {...getFieldProps('word')}
            count={140}
            rows={3}
            placeholder="说说照片故事..."
          />
        </List>
        <form>
          <div className="FileUpload">
            {this.state.uploadedFileCloudinaryUrl === '' ? null :
            <div className='hasUploaded'>
              <img src={this.state.uploadedFileCloudinaryUrl} style={{width:'100px',height:'100px'}} alt='upload_img'/>
            </div>}
            <Dropzone
              className='Dropzone'
              onDrop={this.onImageDrop.bind(this)}
              multiple={false}
              accept="image/*">
              <img src='https://res.cloudinary.com/coderzzp2/image/upload/v1522223810/%E5%8A%A0_2_foztta.svg' alt='img' style={{width:'100px',height:'100px'}}></img>
            </Dropzone>
          </div>
        </form>
      </div>
    )
  }
}
export default createForm()(App)