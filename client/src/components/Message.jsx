import React from 'react'
import style from '../style/message.module.css'

const Message = ({data, own}) => {
  return (
    <div className={own ? style.own : style.message}>
      <div className={style.messageTop}>
      <img src="https://images.unsplash.com/photo-1678962304218-d4aea8fa7d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" className={style.photo} />
        <p>{data.text}</p>
      </div>
      <div className={style.messageBottom}>{ new Date(data.createdAt).toLocaleTimeString()}</div>
    </div>
  )
}

export default Message