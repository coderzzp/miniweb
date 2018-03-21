import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { Toast,List, TextareaItem } from 'antd-mobile';
import {createForm} from 'rc-form'
import { browserHistory } from 'react-router';
import Controller from './components/Controller'
import axios from 'axios'

const CLOUDINARY_UPLOAD_PRESET = 'fpjzpwg1';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/coderzzp2/upload';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
        browserHistory.push('/index')
      })
  }
  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

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
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }

  render() {
    const { getFieldProps } = this.props.form;

    return (
      <div>
        <Controller onPublish={()=>this.onPublish()}/>
        <List >
          <TextareaItem
            {...getFieldProps('word')}
            rows={3}
            placeholder="说说照片故事..."
          />
        </List>
        <form>
          <div className="FileUpload">
            <Dropzone
              onDrop={this.onImageDrop.bind(this)}
              multiple={false}
              accept="image/*">
              <div>Drop an image or click to select a file to upload.</div>
            </Dropzone>
          </div>

          <div>
            {this.state.uploadedFileCloudinaryUrl === '' ? null :
            <div>
              <p>{this.state.uploadedFile.name}</p>
              <img src={this.state.uploadedFileCloudinaryUrl} style={{width:'100%'}} alt='upload_img'/>
            </div>}
          </div>
        </form>
      </div>
    )
  }
}
export default createForm()(App)