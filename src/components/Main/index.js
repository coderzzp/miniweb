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
    axios.get('b/main', {withCredentials: true})
      .then((res)=>{
        const data= res.data.data
        this.setState({data})
      })
  }
  renderBlocker(){
    let res=[]
    const data= this.state.data
    var reactkey=1
    res.push(
          data.map((item,index)=>{
            return (
              <div key={reactkey++}>
                <WhiteSpace size="md" />
                <Blocker data={item} onLike={(_id)=>this.onLike(_id)} onDisLike={(_id)=>this.onDisLike(_id)}/>
              </div>
            )
          })      
    )
    return res
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
              icon={{ uri: 'https://res.cloudinary.com/coderzzp2/image/upload/v1522219589/%E4%B8%AA%E4%BA%BA_t3tb17.svg' }}
              selectedIcon={{ uri: 'https://res.cloudinary.com/coderzzp2/image/upload/v1522219571/%E4%B8%AA%E4%BA%BA_1_gtstef.svg' }}
              title="个人"
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
