import React, { Component } from 'react';
import Login from './components/Login'
import './App.less';

class App extends Component {
  state={
    text:'hello'
  }
  handleClick=()=>{
    this.setState({a:1})
  }
  render() {
    console.log('render App')
    return (
      <div>
        <button onClick={this.handleClick}>change APP state</button>
        <Content />
      </div>
    );
  }
}
class Content extends Component {
  shouldComponentUpdate(nextProps){
    console.log(nextProps)
  }
  render() {
    console.log('render Content!')
    return (
      <div>
        Content!
      </div>
    );
  }
}
export default App;
