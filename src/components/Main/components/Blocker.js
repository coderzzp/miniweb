import React from 'react'
import './blocker.less'
const Blocker = ({data}) => (
  <div className={`placeholder blocker`} >
    <div>
      <div className='head'>
        <img className='head_pic' src={require('./页面1.jpg')} alt='head' ></img>
        <span>{data.userName}</span>
      </div>
      <div>
        <span className='word' >{data.word}</span>
      </div>
      <div >
        <img className='pic' src={data.uploadedFileCloudinaryUrl} alt="fuck" />
      </div>
    </div>
  </div>
);
export default Blocker