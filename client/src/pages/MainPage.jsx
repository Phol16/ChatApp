import React, { useEffect, useState } from 'react';
import Conversation from '../components/Conversation';
import Message from '../components/Message';
import style from '../style/mainPage.module.css';

const MainPage = () => {
  return (
    <div className={style.container}>
      <div className={style.userContainer}>
        <section className={style.wrapper}>
          <Conversation/>
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
