import { WhiteSpace } from 'antd-mobile';
import React from 'react'
import './index.less'
import {TabBar} from 'antd-mobile'
import Blocker from './components/Blocker'
import Nav from './components/NavBar'
import Personal from './components/Personal'
import axios from 'axios'

 export default class TabBarExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
      data:[],
      fullScreen: true,
    };
  }
  componentWillMount(){
    axios.get('http://localhost:3003/api/b/main', {withCredentials: true})
      .then((res)=>{
        const data= res.data.data
        console.log(data)
        this.setState({data})
      })
  }
  renderBlocker(){
    let res=[]
    const data= this.state.data
    res.push(
      <div>
        {
          data.map((item,index)=>{
            return (
              <div>
                <WhiteSpace size="xs" />
                <Blocker data={item}/>
              </div>
            )
          })
        }
        
      </div>
    )
    return res
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
              title="Life"
              key="Life"
              icon={<div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
              />
              }
              selectedIcon={<div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
              />
              }
              selected={this.state.selectedTab === 'blueTab'}
              badge={0}
              onPress={() => {
                this.setState({
                  selectedTab: 'blueTab',
                });
              }}
              data-seed="logId"
            >
              <Nav/>
              {this.renderBlocker()}
            </TabBar.Item>

            <TabBar.Item
              icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
              selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
              title="My"
              key="my"
              selected={this.state.selectedTab === 'yellowTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'yellowTab',
                });
              }}
            >
              <Personal/>
            </TabBar.Item>
          </TabBar>
        </div>
      </div>
    );
  }
}
