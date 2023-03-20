import React, { useMemo, useState } from 'react'
import style from '../style/logIn.module.css'
import {useNavigate} from 'react-router-dom'

const LoginPage = () => {
  const[keepmelogin, setKeepmelogin] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const username = e.target[0].value
    console.log(username)
    try {
      if(username){
      const response = await fetch('http://localhost:3500/users/logIn',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({username})
      }).then((res)=>res.json())
      localStorage.setItem('User', response.data._id)
      navigate('/home')
    }
    } catch (error) {
      console.log(error)
    }
    }
    
    return (
      <div className={style.logInBox}>
      <h1 className={style.logInHeader}>Hang out <br/> anytime, anywhere</h1>
      <h3>Messenger makes it easy and fun to stay close to your favorite people.</h3>
      <form onSubmit={handleSubmit} className={style.logInForm}>
      <input type="username" id='username' name='username' placeholder='Username'/>
      <button type='submit'>Enter</button>
      <label htmlFor="keepmelogin" className={style.label} onClick={()=>{setKeepmelogin(!keepmelogin)}}>
      <input type="radio" name='keepmelogin' username='keepmelogin' id='keepmelogin' checked={keepmelogin} onChange={()=>{setKeepmelogin(!keepmelogin)}}/> 
        <p>Keep me login</p>
      </label>
      </form>
    </div>
  )
}

export default LoginPage