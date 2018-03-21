import React from 'react'
import { NavBar, Icon } from 'antd-mobile';
import {browserHistory} from 'react-router'
import './navbar.less'

export default class Nav extends React.Component{
  render(){
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          rightContent={[
            <BottomAdd key='0'/>
          ]}
        >miniweb</NavBar>
      </div>
    )
  }
}
class BottomAdd extends React.Component {
  handleAdd(){
    browserHistory.push('/publish')
  }
  render(){
    return (
      <div className='bottom_add'>
        <span className='hack_add' onClick={this.handleAdd}>+</span>
      </div>
    )  
  }
}