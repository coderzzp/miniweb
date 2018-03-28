import React from 'react'
import {Button} from 'antd-mobile'
import { browserHistory } from 'react-router';

class Controller extends React.Component{
  handleCancle(){
    browserHistory.push('/main')
  }

  render(){
    const ifdisabled = this.props.disabled

    return (
      <div style={{textAlign:'center',overflow: 'auto'}}>
        <Button inline style={{float:'left'}} onClick={this.handleCancle}>取消</Button>
        <span style={{lineHeight:'40px'}}>发微博</span>
        <Button disabled={ifdisabled} inline type='primary' style={{float:'right'}} onClick={this.props.onPublish}>发送</Button>
      </div>
    )
  }
}

export default Controller