import React, { useMemo, useState } from 'react';
import LoginPage from '../pages/LoginPage';
import style from '../style/logIn.module.css';
import logo from '../assets/logo.png'
import image from '../assets/photo.png'

const LoginLayout = () => {
  return (
    <div className={style.logInContainer}>
      <nav className={style.navBar}>
        <img loading='lazy' decoding='async' src={logo} alt='Logo' />
        <p>Almost Messenger</p>
      </nav>
      <LoginPage />
      <img loading='lazy' decoding='async' src={image} alt='Photo' className={style.logInImg} />
      <footer className={style.footer}>
        <p>
          © Mini Messenger. <span> The logos are trademarks of their respective owners. </span>
        </p>
      </footer>
    </div>
  );
};

export default LoginLayout;
