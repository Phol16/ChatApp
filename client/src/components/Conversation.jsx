import React from 'react'
import style from '../style/conversation.module.css'

const Conversation = () => {
  return (
    <div className={style.convContainer}>
      <img src="https://images.unsplash.com/photo-1678962304218-d4aea8fa7d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" className={style.photo} />
      <p>John Doe</p>
    </div>
  )
}

export default Conversation