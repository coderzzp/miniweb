import { WhiteSpace } from 'antd-mobile';
import React from 'react'
import './index.less'
import {TabBar} from 'antd-mobile'
import Nav from './components/NavBar'
import axios from 'axios'
import {browserHistory} from 'react-router'


export default class TabBarExample extends React.Component {
  constructor(props) {
    super(props);
    const selectedTab = window.location.href.split('/').slice(-1)[0]
    this.state = {
      selectedTab,
      fullScreen: true,
    };
  }
  render() {
    return (
      <div> 
        <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 680 }}>
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
          >
            <TabBar.Item
              title="主页"
              key="Life"
              icon={<div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://res.cloudinary.com/coderzzp2/image/upload/v1522219502/%E5%BB%BA%E7%AD%91_gjacyo.svg) center center /  21px 21px no-repeat' }}
              />
              }
              selectedIcon={<div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://res.cloudinary.com/coderzzp2/image/upload/v1522219480/%E5%BB%BA%E7%AD%91_1_djp2xw.svg) center center /  21px 21px no-repeat' }}
              />
              }
              selected={this.state.selectedTab === 'blog'}
              badge={0}
              onPress={() => {
                browserHistory.push('/main/blog')
                this.setState({
                  selectedTab: 'blog',
                });
              }}
              data-seed="logId"
            >
              <Nav/>
              {this.props.children}
              {/* {this.renderBlocker()} */}
            </TabBar.Item>
            <TabBar.Item
              icon={{ uri: 'https://res.cloudinary.com/coderzzp2/image/upload/v1523883520/idea_gflk97.svg' }}
              selectedIcon={{ uri: 'https://res.cloudinary.com/coderzzp2/image/upload/v1523883544/idea_1_vpfgqk.svg' }}
              title="idea"
              key="idea"
              selected={this.state.selectedTab === 'idea'}
              onPress={() => {
                browserHistory.push('/main/idea')
                this.setState({
                  selectedTab: 'idea',
                });
              }}
            >
              {this.props.children}
            </TabBar.Item>
            <TabBar.Item
              icon={{ uri: 'https://res.cloudinary.com/coderzzp2/image/upload/v1522219589/%E4%B8%AA%E4%BA%BA_t3tb17.svg' }}
              selectedIcon={{ uri: 'https://res.cloudinary.com/coderzzp2/image/upload/v1522219571/%E4%B8%AA%E4%BA%BA_1_gtstef.svg' }}
              title="个人"
              key="my"
              selected={this.state.selectedTab === 'personal'}
              onPress={() => {
                browserHistory.push('/main/personal')
                this.setState({
                  selectedTab: 'personal',
                });
              }}
            >
              {this.props.children}
            </TabBar.Item>
          </TabBar>
        </div>
      </div>
    );
  }
}
