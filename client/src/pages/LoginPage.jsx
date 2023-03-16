import React from 'react'
import style from '../style/logIn.module.css'

const LoginPage = () => {
  return (
    <div>
      <h1 className={style.logInHeader}>ChatApp</h1>
      <form className={style.logInForm}>
      <label htmlFor="username">Username:</label>
      <input type="username" id='username' name='username' placeholder='Username'/>
      <label htmlFor="RoomId">Room ID:</label>
      <input type="text" id='roomId' name='roomId' placeholder='Room Id'/>
      <button>Log In</button>
      </form>
    </div>
  )
}

export default LoginPage