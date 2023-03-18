import React, { useEffect, useState } from 'react'
import style from '../style/conversation.module.css'

const Conversation = ({name}) => {
  return (
    <div className={style.convoContainer}>
      <img src="https://images.unsplash.com/photo-1678962304218-d4aea8fa7d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" className={style.photo} />
      <p>{name}</p>
    </div>
  )
}

export default Conversation