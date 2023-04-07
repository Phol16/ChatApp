import React, { useEffect, useRef, useState } from 'react';
import Conversation from '../components/Conversation';
import Message from '../components/Message';
import Profile from '../components/Profile';
import style from '../style/mainPage.module.css';
import { io } from 'socket.io-client';

export const api = 'https://minimessengerserver.onrender.com/';
export const chatApp = 'https://minimessengersocket.onrender.com';

const MainPage = () => {
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState();
  const [receiver, setReceiver] = useState(null);
  const [messages, setMessages] = useState([]);
  const [update, setUpdate] = useState(Date.now());
  const [arrivalMessages, setArrivalMessages] = useState([]);
  const [onlineUser, setOnlineUser] = useState([]);
  const socket = useRef();
  const [text, setText] = useState('');

  const scrollRef = useRef();
  const sender = sessionStorage.getItem('User');

  useEffect(() => {
    socket.current = io(chatApp);
    socket.current.on('getMessage', (data) => {
      setArrivalMessages({
        membersId: [data.receiverId, data.senderId],
        senderId: data.senderId,
        receiver: data.receiverId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessages && setMessages((prev) => [...prev, arrivalMessages]);
  }, [arrivalMessages]);

  useEffect(() => {
    socket.current.emit('addUser', sender);
    socket.current.on('getUsers', (users) => {
      setOnlineUser(users);
    });
  }, [sender]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${api}users/profile?id=${sender}`).then((res) => res.json());
      setProfile(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${api}users?sender=${sender}`).then((res) => res.json());
      setUsers(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchMessage = async () => {
      const response = await fetch(`${api}message?receiverId=${receiver._id}&senderId=${sender}`).then((res) => res.json());
      setMessages(response.data);
    };
    if (receiver) {
      fetchMessage();
    }
  }, [receiver, update]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async () => {
    if (receiver && text) {
      const data = { membersId: [receiver._id, sender], receiverId: receiver._id, senderId: sender, text };

      onlineUser.map((e) => {
        e.userId === receiver._id
          ? socket.current.emit('sendMessage', {
              senderId: sender,
              receiverId: receiver._id,
              text,
            })
          : null;
      });

      try {
        if (receiver._id && text) {
          const response = await fetch(`${api}message`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
          }).then((res) => res.json());
          console.log(response);
          setText('');
          setUpdate(Date.now());
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={style.container}>
      <main className={style.detailsContainer}>
        <div className={style.userContainer}>
          <h2>Chats</h2>
          <input type='text' placeholder='Search' className={style.search} />
          <section className={style.userWrapper}>
            {users.map((e, index) => {
              return (
                <button
                  onClick={() => {
                    setReceiver(e);
                  }}
                  key={index}
                  className={style.userButton}
                >
                  <Conversation data={e} online={onlineUser} key={index} />
                </button>
              );
            })}
          </section>
        </div>
        <div className={style.profileContainer}>
          <section className={style.profileWrapper}>
            <Profile profile={profile} socket={socket} />
          </section>
        </div>
      </main>
      <div className={style.chatBoxContainer}>
        <section className={`${style.wrapper}`}>
          {receiver ? (
            <>
              <main className={style.chatBoxTop}>
                <section className={style.chatBoxTopContainer}>
                  <img
                    src={
                      receiver.image !== 'No Photo'
                        ? `${receiver.image}`
                        : 'data:image/png;base64,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'
                    }
                    alt='Photo'
                    className={style.photo}
                  />
                  {receiver.fullName}
                </section>
                <hr />
              </main>
              <main className={style.chatBoxMiddle}>
                {messages.map((e) => {
                  console.log(e);
                  if (e.membersId?.includes(receiver._id)) {
                    return (
                      <div ref={scrollRef} key={e._id}>
                        <Message data={e} own={e.senderId !== sender ? false : true} />
                      </div>
                    );
                  }
                })}
              </main>
            </>
          ) : (
            <span className={style.noConvo}>Open a conversation...</span>
          )}
          <main className={style.chatBoxBottom}>
            <textarea
              placeholder='Aa'
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
