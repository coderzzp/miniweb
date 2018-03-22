import React from 'react'
import './personal.less'
import axios from 'axios'
import Blocker from '../components/Blocker'
import {ActionSheet,Toast,WhiteSpace,Button} from 'antd-mobile'
import {browserHistory} from 'react-router'

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
      userName:''
    }
  }
  componentWillMount(){
    axios.get('user/info', {withCredentials: true})
      .then(res=>{
        if(!res.data.success){
          Toast.fail(res.data.err)
          browserHistory.push('/login')
        }else{
          this.setState({
            data:res.data.info,
            userName:res.data.userName,
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
  renderBlocker(){
    let res=[]
    const data= this.state.data
    if(data){
      console.log(data)
      var reactkey = 1;
      res.push(
        data.map((item,index)=>{
          console.log(item)
          return (
            <div key={reactkey++}>
              <WhiteSpace size="xs" key={item.id}/>
              <Blocker data={item} ifCancel='1' onCancleBlog={(cancledData)=>this.onCancleBlog(cancledData)}/>
            </div>
          )
        })
      )
      return res
    }
  }
  showActionSheet = () => {
    
    const BUTTONS = ['上传头像', 'Cancel'];
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
    return (
      <div>
        <div className='personal_container'>
          <div className='personal_head'>
            <Button onClick={this.showActionSheet} className='head'>
              <img src={require('./head.jpg')} alt='head'/>
            </Button>
            {this.state.userName}
          </div>
          
        </div>
        <div style={{textAlign:'center'}}>
          miniweb
        </div>
        {this.renderBlocker()}
      </div>
    )
  }
}