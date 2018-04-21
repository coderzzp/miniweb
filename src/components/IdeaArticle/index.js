import React from 'react'
import axios from 'axios'
import './index.less'
export default class IdeaArticle extends React.Component{
  constructor(props){
    super(props)
    this.state={
      html:''
    }
  }
  componentDidMount(){
    const id=this.props.params.id
    axios.get(`idea/${id}`, {withCredentials: true})
      .then((res)=>{
        this.setState({
          html:res.data.data.html
        })
      })
  }
  render(){
    //渲染html代码
    const html={__html:this.state.html}
    return (
      <div dangerouslySetInnerHTML={html}>
      </div>
    )
  }
}
