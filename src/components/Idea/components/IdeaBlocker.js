import React from 'react'
import './index.less'
import axios from 'axios'
import {WhiteSpace} from 'antd-mobile'
import {Link} from 'react-router'

const IdearBlocker = ({data}) => {
  return (
    <div>
      <WhiteSpace size="md" />
      <div className={`placeholder blocker`} >
        <div>
          <span className='word' >{data.title}</span>
        </div>
        <div >
          <Link to={`/main/idea/${data._id}`}>
            <img className='pic' src={data.imgSrc} alt="fuck" />
          </Link>
        </div>
      </div>
    </div>
)};
export default IdearBlocker