import React, { useEffect, useRef, useState } from 'react';
import Conversation from '../components/Conversation';
import Message from '../components/Message';
import Profile from '../components/Profile';
import style from '../style/mainPage.module.css';
import { io } from 'socket.io-client'

const MainPage = () => {
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState();
  const [receiver, setReceiver] = useState(null);
  const [messages, setMessages] = useState([]);
  const [update, setUpdate] = useState(Date.now());
  const [arrivalMessages, setArrivalMessages] = useState([]);
  const [onlineUser, setOnlineUser] = useState([]);
  const socket = useRef()
  const [text, setText] = useState('');

  const scrollRef = useRef()
  const sender = localStorage.getItem('User');

  useEffect(()=>{
    socket.current = io('http://localhost:3000');
    socket.current.on('getMessage',data=>{
      setArrivalMessages({
        senderId: data.senderId,
        receiver:data.receiverId,
        text: data.text,
        createdAt:Date.now(),
      })
    })
  },[])

  useEffect(()=>{
    arrivalMessages && setMessages(prev=>[...prev,arrivalMessages])
  },[arrivalMessages])

  useEffect(()=>{
    socket.current.emit('addUser', sender)
    socket.current.on('getUsers', users=>{
      setOnlineUser(users)
    })
  },[sender])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3500/users/profile?id=${sender}`).then((res) => res.json());
      setProfile(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3500/users?sender=${sender}`).then((res) => res.json());
      setUsers(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchMessage = async () => {
      const response = await fetch(`http://localhost:3500/message?receiverId=${receiver._id}&senderId=${sender}`).then((res) => res.json());
      setMessages(response.data);
    };
    if (receiver) {
      fetchMessage();
    }
  }, [receiver, update]);
  
  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:'smooth'})
  },[messages])

  const handleSubmit = async () => {
    if(receiver && text){
    const data = { membersId: [receiver._id, sender], receiverId: receiver._id, senderId: sender, text };

    onlineUser.map((e)=>{
      e.userId ===receiver._id ? 
      socket.current.emit('sendMessage',{
        senderId:sender,
        receiverId:receiver._id,
        text,
      }) : null
    })

    try {
      if (receiver._id && text) {
        const response = await fetch(`http://localhost:3500/message`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(data),
        }).then((res) => res.json());
        console.log(response)
        setText('')
        setUpdate(Date.now())
      }
    } catch (error) {
      console.log(error)
    }
  }
  };


  return (
    <div className={style.container}>
      <main className={style.detailsContainer}>
      <div className={style.userContainer}>
          <h2>Chats</h2>
          <input type="text" placeholder='Search' className={style.search}/>
        <section className={style.userWrapper}>
          {users.map((e) => {
            return (
              <button
                onClick={() => {
                  setReceiver(e);
                }}
                key={e._id}
                className={style.userButton}
              >
                <Conversation data={e} online={onlineUser}/>
              </button>
            );
          })}
        </section>
      </div>
      <div className={style.profileContainer}>
        <section className={style.profileWrapper}>
          <Profile profile={profile} socket={socket}/>
        </section>
      </div>
      </main>
      <div className={style.chatBoxContainer}>
        <section className={`${style.wrapper}`}>
          {receiver ? (
            <>
              <h2 className={style.chatBoxTop}>{receiver.fullName}<hr/></h2>
              <main className={style.chatBoxMiddle}>
                {messages.map((e) => {
                  return (
                    <div ref={scrollRef} key={e._id}>
                    <Message data={e} own={e.senderId !== sender ? false : true}  />
                    </div>
                  ) 
                })}
              </main>
            </>
          ) : (
            <span className={style.noConvo}>Open a conversation...</span>
          )}
          <main className={style.chatBoxBottom}>
            <textarea
              placeholder='write something...'
              className={style.chatMessageInput}
              onChange={(e) => {
                setText(e.target.value);
              }}
              value={text}
            ></textarea>
            <button type='submit' className={style.submitButton} onClick={handleSubmit}>
              Send
            </button>
          </main>
        </section>
      </div>
    </div>
  );
};

export default MainPage;
