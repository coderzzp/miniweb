import React from 'react'

const Blocker = ({ className = '', ...restProps }) => (
  <div className={`${className} placeholder`} {...restProps}>
    <div>
      <div >
        <img className='head_pic' src={require('../img/big/页面5.jpg')} alt='head' style={{borderRadius:'20px',width:'20px',height:'20px'}}></img>
        <span>小明</span>
      </div>
      <div >
        <img className='' src={require('../img/big/页面3.jpg')} alt="fuck" style={{width:'100%'}}/>
      </div>
    </div>
  </div>
);
export default Blocker