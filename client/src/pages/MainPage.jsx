import React, { useEffect, useRef, useState } from 'react';
import Conversation from '../components/Conversation';
import Message from '../components/Message';
import Profile from '../components/Profile';
import style from '../style/mainPage.module.css';

const MainPage = () => {
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState();
  const [receiver, setReceiver] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const scrollRef = useRef()
  const sender = localStorage.getItem('User');

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
  }, [receiver]);
  
  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:'smooth'})
  },[messages])

  const handleSubmit = async () => {
    const data = { membersId: [receiver._id, sender], receiverId: receiver._id, senderId: sender, text };

    if (receiver._id && text) {
      const response = await fetch(`http://localhost:3500/message`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());
      setText('')
    }
  };

  return (
    <div className={style.container}>
      <div className={style.userContainer}>
        <section className={style.wrapper}>
          <h2>Users:</h2>
          {users.map((e) => {
            return (
              <button
                onClick={() => {
                  setReceiver(e);
                }}
                key={e._id}
                className={style.userButton}
              >
                <Conversation name={e.fullName} />
              </button>
            );
          })}
        </section>
      </div>
      <div className={style.chatBoxContainer}>
        <section className={`${style.wrapper}`}>
          {receiver ? (
            <>
              <h2 className={style.chatBoxTop}>{receiver.fullName}<hr/></h2>
              <main className={style.chatBoxMiddle}>
                {messages.map((e) => {
                  return (
                    <div ref={scrollRef}>
                    <Message data={e} own={e.senderId !== sender ? false : true} key={e._id} />
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
      <div className={style.profileContainer}>
        <section className={style.profileWrapper}>
          <Profile profile={profile}/>
        </section>
      </div>
    </div>
  );
};

export default MainPage;
