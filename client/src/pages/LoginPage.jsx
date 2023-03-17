import React from 'react'
import style from '../style/logIn.module.css'

const LoginPage = () => {

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const username = e.target[0].value

      const response = await fetch('http://localhost:3500/users/logIn',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({username})
      }).then((res)=>res.json())
      window.location.replace('/home')
  }

  return (
    <div>
      <h1 className={style.logInHeader}>ChatApp</h1>
      <form onSubmit={handleSubmit} className={style.logInForm}>
      <label htmlFor="username">Username:</label>
      <input type="username" id='username' name='username' placeholder='Username'/>
      <button type='submit'>Log In</button>
      </form>
    </div>
  )
}

export default LoginPage