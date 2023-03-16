import React from 'react'
import LoginPage from '../pages/LoginPage'
import style from '../style/logIn.module.css'

const LoginLayout = () => {
  return (
    <div className={style.logInContainer}>
      <img src='https://images.unsplash.com/photo-1568712675977-a286276f4f44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1976&q=80' className={style.loginImg}/>
      <main className={style.logIn}>
      <LoginPage/>
      </main>
    </div>
  )
}

export default LoginLayout