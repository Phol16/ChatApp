import React, { useEffect, useState } from 'react';
import Conversation from '../components/Conversation';
import Message from '../components/Message';
import style from '../style/mainPage.module.css';

const MainPage = () => {
  const [users, setUsers] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const sender = localStorage.getItem('User')

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3500/users?sender=${sender}`).then((res) => res.json());
      setUsers(response.data);
    };
    fetchData();
  }, []);

  useEffect(()=>{
    const fetchMessage = async () => {
      const response = await fetch(`http://localhost:3500/message?receiverId=${receiver}&senderId=${sender}`).then((res) => res.json());
      setMessages(response.data)
    };
    fetchMessage();
  },[receiver])

  const handleSubmit= async()=>{
    const data = {membersId:[receiver, sender], receiverId: receiver, senderId:sender, text}

    if(receiver){
    const response = await fetch(`http://localhost:3500/message`,{
      method:'POST',
      headers:{
        'Content-type': 'application/json'
      },
      body:JSON.stringify(data)
    }).then((res) => res.json());
    console.log(response)
  }
  }

  return (
    <div className={style.container}>
      <div className={style.userContainer}>
        <section className={style.wrapper}>
          {users.map((e) => {
            return (
              <button onClick={()=>{setReceiver(e._id)}} key={e._id}>
                <Conversation name={e.fullName} />
              </button>
            );
          })}
        </section>
      </div>
      <div className={style.chatBoxContainer}>
        <section className={`${style.wrapper} ${style.chatBoxWrapper}`}>
          <main className={style.chatBoxTop}>
            {
              receiver ? (
                  messages.map((e)=>{
                  return <Message text={e.text} own={e.senderId !== sender ? false : true} key={e._id} />
                  })
              ) : <span className={style.noConvo}>Open a conversation...</span>
            }
          </main>
          <main className={style.chatBoxBottom}>
            <textarea placeholder='write something...' className={style.chatMessageInput} onChange={(e)=>{setText(e.target.value)}}></textarea>
            <button className={style.submitButton} onClick={handleSubmit}>Send</button>
          </main>
        </section>
      </div>
      <div className={style.profileContainer}>profile</div>
    </div>
  );
};

export default MainPage;
