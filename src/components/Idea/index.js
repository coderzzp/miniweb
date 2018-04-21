import React from 'react'
import './index.less'
import axios from 'axios'
import IdeaBlocker from './components/IdeaBlocker'
import {ActionSheet,Toast,WhiteSpace,Button,ActivityIndicator} from 'antd-mobile'

export default class Idea extends React.Component{
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
    axios.get(`idea/head/${page}`, {withCredentials: true})
      .then((res)=>{
        const data= res.data.data
        this.setState({data})
      })
  }
  componentDidMount(){
    this.refs.idea.addEventListener('scroll',this.onScroll)
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
        axios.get(`idea/head/${page+1}`, {withCredentials: true})
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
  renderIdeaBlocker(){
    const data=this.state.data
    return data.map((item,index)=>{
      return (
          <IdeaBlocker data={item}/>        
      )
    })
  }
  render(){
    return (
      <div className='idea' ref='idea'>
        {this.renderIdeaBlocker()}
        {
          (!this.state.isEnd&&this.state.loading)&&<ActivityIndicator className='loading' text="loading"/>
        } 
      </div>
    )
  }
}