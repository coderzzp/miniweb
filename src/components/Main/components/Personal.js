import React from 'react'
import './personal.less'
import axios from 'axios'
import Blocker from '../components/Blocker'
import {Toast,WhiteSpace} from 'antd-mobile'
import {browserHistory} from 'react-router'

export default class Personal extends React.Component{
  constructor(props){
    super(props)
    this.state={
      data:{}
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
            data:res.data
          })
        }
      })
  }
  renderBlocker(){
    let res=[]
    const data= this.state.data.info
    if(data){
      var reactkey = 1;
      res.push(
        data.map((item,index)=>{
          return (
            <div key={reactkey++}>
              <WhiteSpace size="xs" key={item.id}/>
              <Blocker data={item} />
            </div>
          )
        })
      )
      return res
    }
  }
  render(){
    return (
      <div>
        <div className='personal_container'>
          <div className='personal_head'>
            <img src={require('./页面1.jpg')} alt='head'/>
            {this.state.data.userName}
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