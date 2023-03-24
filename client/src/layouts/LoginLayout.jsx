import React, { useMemo, useState } from 'react';
import LoginPage from '../pages/LoginPage';
import style from '../style/logIn.module.css';

const LoginLayout = () => {
  const [open, setOpen] = useState(true);
  const [arrow, setArrow] = useState('⌃ Click Me');

  useMemo(() => {
    open ? setArrow('⌄ Hide') : setArrow('⌃ Open');
  }, [open]);
  return (
    <div className={style.logInContainer}>
      <nav className={style.navBar}>
        <img src='https://scontent.fcgy1-1.fna.fbcdn.net/v/t39.8562-6/120009688_325579128711709_1736249742330805861_n.png?_nc_cat=1&ccb=1-7&_nc_sid=6825c5&_nc_ohc=qQwstLq8YaUAX_TG54g&_nc_ht=scontent.fcgy1-1.fna&oh=00_AfBEWFNftz6E7NyygKpCbjJeL2hSdVjU4jQQJ6MjGO1NoQ&oe=641CCE3D' alt='Logo' />
        <p>Almost Messenger</p>
      </nav>
      <LoginPage />
      <img src='https://scontent.fmnl25-2.fna.fbcdn.net/v/t39.8562-6/120973513_338186077283942_8148888802958728934_n.png?_nc_cat=102&ccb=1-7&_nc_sid=6825c5&_nc_ohc=u8ETh_dkhsoAX-vbPzp&_nc_ht=scontent.fmnl25-2.fna&oh=00_AfDC3f7v0XOn8CLfTY5mYXUxF6x5IJACLEsaiUPTi3KHxg&oe=641C8767' alt='Photo' className={style.logInImg} />
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
