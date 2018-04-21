import React from "react";
import Blocker from '../PublicComp/Blocker'
import { WhiteSpace,ActivityIndicator } from 'antd-mobile';
import axios from 'axios'
import './index.less'

export default class Blog extends React.Component{
  constructor(props){
    super(props)
    this.state={
      data:[],
      page:1,
      loading:false,
      isEnd:false
    }
    this.onScroll=this.onScroll.bind(this)
  }
  componentWillMount(){
    const {page}=this.state
    axios.get(`b/main/${page}`, {withCredentials: true})
      .then((res)=>{
        const data= res.data.data
        this.setState({data})
      })
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
  componentDidMount(){
    // const a=document.getElementsByClassName('am-tab-bar-item')[0]
    this.refs.blog.addEventListener('scroll',this.onScroll)
  }
  onScroll(e){
    const {data,isEnd,page,loading} = this.state
    const dom=e.srcElement
    const {scrollTop,scrollHeight,clientHeight}=dom
    if(scrollTop+clientHeight+200>=scrollHeight){
      //如果页面还没有获取完
      if(!isEnd&&!loading){
        this.setState({
          loading:true
        })
        axios.get(`b/main/${page+1}`, {withCredentials: true})
          .then((res)=>{
            const data= res.data.data
            if(res.data.isEnd){
              console.log(1)
              this.setState({
                data,
                page:page+1,
                loading:false,
                isEnd:true
              })
            }else{
              const data= res.data.data
              this.setState(
              {
                data,
                loading:false,
                page:page+1,
              })
            }
            
          })
      } 
    }
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
  render(){
    return (
      <div className='blog' ref='blog'>
        {this.renderBlocker()}
        {
          (!this.state.isEnd&&this.state.loading)&&<ActivityIndicator className='loading' text="loading"/>
        }      
      </div>
    )
  }
}