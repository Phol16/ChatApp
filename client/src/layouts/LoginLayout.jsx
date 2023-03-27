import React, { useMemo, useState } from 'react';
import LoginPage from '../pages/LoginPage';
import style from '../style/logIn.module.css';
import logo from '../assets/logo.png'
import image from '../assets/photo.png'

const LoginLayout = () => {
  const [open, setOpen] = useState(true);
  const [arrow, setArrow] = useState('⌃ Click Me');

  useMemo(() => {
    open ? setArrow('⌄ Hide') : setArrow('⌃ Open');
  }, [open]);
  return (
    <div className={style.logInContainer}>
      <nav className={style.navBar}>
        <img src={logo} alt='Logo' />
        <p>Almost Messenger</p>
      </nav>
      <LoginPage />
      <img src={image} alt='Photo' className={style.logInImg} />
      <footer className={style.footer}>
        <p>
          © Mini Messenger. <span> The logos are trademarks of their respective owners. </span>
        </p>
      </footer>
      <section
        className={style.fixedInfo}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <span style={{ display: `${open ? 'inline-block' : 'none'}` }}>
          To test the realtime feature in mini messenger. use different browser/application to log in as different user
          <br />
          <br />
          initial request from server will take time, please wait. <br /> thank you!
          <br />
          <br />
        </span>
        {arrow}
      </section>
    </div>
  );
};

export default LoginLayout;
