import React, { useEffect, useState } from 'react';
import Conversation from '../components/Conversation';
import Message from '../components/Message';
import style from '../style/mainPage.module.css';

const MainPage = () => {
  const [users, setUsers] = useState([])

  useEffect(()=>{
    const fetchData = async()=>{
      const response = await fetch(`http://localhost:3500/users`).then((res)=>res.json())
      setUsers(response.data)
    }
    fetchData()
  },[])
  return (
    <div className={style.container}>
      <div className={style.userContainer}>
        <section className={style.wrapper}>
          {users.map((e)=>{
            return <Conversation name={e.fullName}/>
          })
          }
        </section>
      </div>
      <div className={style.chatBoxContainer}>
        <section className={`${style.wrapper} ${style.chatBoxWrapper}`}>
          <main className={style.chatBoxTop}>
            <Message/>
            <Message own={true}/>
            <Message/>
          </main>
          <main className={style.chatBoxBottom}>
            <textarea placeholder='write something...' className={style.chatMessageInput}></textarea>
            <button className={style.submitButton}>Send</button>
          </main>
        </section>
      </div>
      <div className={style.profileContainer}>
        profile
      </div>
    </div>
  );
};

export default MainPage;
