import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3500');

const MainPage = () => {
  const[message,setMessage] = useState()
  const[received,setReceived] = useState()
  const[room,setRoom] = useState()

  const handleRoom = ()=>{
    if(room !== ''){
      socket.emit('join', room)//room
    }
  }

  const handleMessage = ()=>{
    socket.emit('send', {message, room}) // emit the message by sending the message and what room to join
  }

  useEffect(()=>{
    console.log('hello')
    socket.on('rec',(data)=>{
      setReceived(data.message)
    })
  },[socket]) //this will rerender if theres an update or and event is emmitted in the socket

  return (
    <div>
      <p>{received}</p>
      <input type="text" onChange={({target:{value}})=>{setRoom(value)}}/>
      <button onClick={handleRoom}>room</button>
      <input type="text" onChange={({target:{value}})=>{setMessage(value)}}/>
      <button onClick={handleMessage}>Send Message</button>
    </div>
  )
}

export default MainPage