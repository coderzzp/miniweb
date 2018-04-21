import React from 'react'
import './blocker.less'
import {Icon ,Button,Modal,Toast} from 'antd-mobile'
import axios from 'axios'
var classNames = require('classnames');

const alert = Modal.alert;

const Blocker = ({data,onLike,onDisLike,ifCancel,onCancleBlog}) => {
  const userName = document.cookie.split('=')[1]
  const likeUserName = data.likeUserName
  const hasLiked = likeUserName.some(item=>{
    return item==userName
  })
  const iconLikeClass=classNames({ icon_like: true }, { iconHasLiked: hasLiked });
  const wordLikeClass=classNames({word:true},{ wordHasLiked: hasLiked })
  return (
  <div className={`placeholder blocker`} >
    <div className='head'>
      <img className='head_pic' src={data.headImgUrl} alt='head' ></img>
      <span className='head_word'>{data.userName}</span>
      {ifCancel&&
      <Button className='head_cancle'
        onClick={() =>alert('Delete', 'Are you sure???', [
          { text: 'Cancel', onPress: () => console.log('cancel') },
          { text: 'Ok', 
            onPress: () => axios.post('b/delblog', {_id:data._id},{withCredentials: true,})
              .then((res)=>{
                if(res.data.success){
                  Toast.success('删除成功！')
                  onCancleBlog(data)
                }else{
                  Toast.fail(`删除失败,原因${res}`)
                }
              })
          },
        ])
      }>
        <Icon type="cross" size="xs" />
      </Button>}
    </div>
    <div>
      <span className='word' >{data.word}</span>
    </div>
    <div >
      <img className='pic' src={data.uploadedFileCloudinaryUrl} alt="fuck" />
    </div>
    <div className='comment'>
      <div>
        <div className='icon_dis'/>
        <span className='word'>评论</span>
      </div>
      <div>
        <div className={iconLikeClass} />
        {hasLiked?
        <span className={wordLikeClass} onClick={()=>onDisLike(data._id)}>{data.like}</span>:
        <span className={wordLikeClass} onClick={()=>onLike(data._id)}>{data.like}</span>}
      </div>
      
    </div>
  </div>
)};
export default Blocker