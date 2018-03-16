import { WhiteSpace } from 'antd-mobile';
import React from 'react'
import './index.less'
import Blocker from './components/Blocker'
import BottomAdd from '../BottomAdd'
import axios from 'axios'
class WhiteSpaceExample extends React.Component{
  constructor(props){
    super(props)
    this.state={
      data:[]
    }
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
  render(){
    const {data} = this.state
    return (
      <div>
        {this.renderBlocker()}
        <BottomAdd/>
      </div>
    )
  }
}
// const WhiteSpaceExample = () => (
//   <div>
//     <WhiteSpace size="xs" />
//     <Blocker />

//     <WhiteSpace size="sm" />
//     <Blocker />

//     <WhiteSpace />
//     <Blocker />

//     <WhiteSpace size="lg" />
//     <Blocker />

//     <WhiteSpace size="xl" />
//     <Blocker />
//     <BottomAdd />
//   </div>
// );

export default WhiteSpaceExample