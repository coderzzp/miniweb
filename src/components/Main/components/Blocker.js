import React from 'react'
import './blocker.less'
import {Icon ,Button,Modal,Toast} from 'antd-mobile'
import axios from 'axios'

const alert = Modal.alert;

const Blocker = ({data,ifCancel,onCancleBlog}) => (
  <div className={`placeholder blocker`} >
    <div>
      <div className='head'>
        <img className='head_pic' src={require('./页面1.jpg')} alt='head' ></img>
        <span>{data.userName}</span>
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
    </div>
  </div>
);
export default Blocker