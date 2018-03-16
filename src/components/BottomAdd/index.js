import React from 'react'
import { browserHistory } from 'react-router';
import './index.less'
import {Icon,Button} from 'antd-mobile'

class BottomAdd extends React.Component {
  // componentDidMount(){
  //   window.addEventListener('scroll',(e)=>{
  //     console.log(e.target)
  //     console.log(e.srcElement)
  //   })
  // }
  handleAdd(){
    browserHistory.push('/publish')
  }
  render(){
    return (
      <div className='bottom_add'>
        <Button className='hack_add' onClick={this.handleAdd}>+</Button>
      </div>
    )  
  }
}
export default BottomAdd