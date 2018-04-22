import React from 'react'
import { Toast, List,InputItem, Tabs , Badge} from 'antd-mobile'
import { createForm } from 'rc-form';
import { browserHistory } from 'react-router';
import './index.less'
import axios from 'axios'

// const List = Form.Item;

const tabs = [
  { title: <Badge >注册</Badge> },
  { title: <Badge >登陆</Badge> },
];

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 0
    };
  }
  handleLogUp = () => {
    const self = this
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('u/signup', values,{withCredentials: true,})
          .then(function (res) {
            if (res.data.success) {
              Toast.success('注册成功！请登录')
              self.callbackClear()
              self.setState({
                activeKey: '2'
              })
            } else {
              var warn = res.data.reason || '未知错误'
              Toast.fail(warn)
            }
          })
      }
    });
  }
  handleLogIn = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('u/signin', values,{withCredentials: true,})
          .then(function (res) {
            if (res.data.success) {
              Toast.success('账户密码正确，正在进入下一个界面。。。')
              document.cookie = `userName=${res.data.userName};expires=86400000`;
              browserHistory.push('/main/idea')
            } else {
              var warn = res.data.reason || '未知错误'
              Toast.fail(warn)
            }
          })
      }
    });
  }
  handleSubmit= (e) => {
    e.preventDefault();
    this.state.activeKey%2?this.handleLogUp():this.handleLogIn()
  }
  callbackClear = (e) => {
    this.props.form.resetFields()
    this.setState({
      activeKey: 1
    })
  }

  render() {
    const { getFieldProps } = this.props.form;
    // const { getFieldDecorator } = this.props.form;
    const { activeKey } = this.state

    return (
      <div className='login'>
        <img src={require('../img/logo.png')} className={'login_logo'}></img>
        <Tabs tabs={tabs}
          initialPage={0}
          activeKey={Number(activeKey)}
        >
          <div >
            <List renderHeader={() => 'Customize to focus'}>
              <InputItem
                {...getFieldProps('userName')}
                clear
                placeholder="auto focus"
                ref={el => this.autoFocusInst = el}
              >账户</InputItem>
              <InputItem
                {...getFieldProps('password')}
                type="password"
                placeholder="****"
              >密码</InputItem>
              <List.Item>
                <div
                  style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                  onClick={this.handleLogUp}
                >
                  click to LogUp
                </div>
              </List.Item>
            </List>
          </div>
          <div>
            <List renderHeader={() => 'Customize to focus'}>
              <InputItem
                {...getFieldProps('userName')}
                clear
                placeholder="auto focus"
                ref={el => this.autoFocusInst = el}
              >账户</InputItem>
              <InputItem
                {...getFieldProps('password')}
                type="password"
                placeholder="****"
              >密码</InputItem>
              <List.Item>
                <div
                  style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                  onClick={this.handleLogIn}
                >
                  click to LogIn
                </div>
              </List.Item>
            </List>
          </div>
        </Tabs>
        
      </div>
    );
  }
}

export default createForm()(NormalLoginForm);

