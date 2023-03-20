import React, { useMemo, useState } from 'react'
import style from '../style/logIn.module.css'
import {useNavigate} from 'react-router-dom'

const LoginPage = () => {
  const[keepmelogin, setKeepmelogin] = useState(false)
  const[error, setError] = useState('')
  const[load, setLoad] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const username = e.target[0].value
    setLoad(true)
    try {
      if(username){
      const response = await fetch('https://minimessengerserver.onrender.com/users/logIn',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({username})
      }).then((res)=>res.json())
      localStorage.setItem('User', response.data._id)
      navigate('/home')
      setLoad(false)
    }else{setError('Input a username')}
    } catch (error) {
      setError(error)
    }
    }
    
    return (
      <div className={style.logInBox}>
      <h1 className={style.logInHeader}>Hang out <br/> anytime, anywhere</h1>
      <h3>Messenger makes it easy and fun to stay close to your favorite people.</h3>
      <form onSubmit={handleSubmit} className={style.logInForm}>
        {error && <p className={style.error}>{error}</p>}
      <input type="username" id='username' name='username' placeholder='Username' onChange={()=>{setError(''),setLoad(false)}}/>
      <button type='submit'>
      <i className="fa fa-spinner fa-spin" style={{marginRight: '10px', display:`${load ? 'inline-block' : 'none'}`}}></i>
        Enter
        </button>
      <label htmlFor="keepmelogin" className={style.label} onClick={()=>{setKeepmelogin(!keepmelogin)}}>
      <input type="radio" name='keepmelogin' username='keepmelogin' id='keepmelogin' checked={keepmelogin} onChange={()=>{setKeepmelogin(!keepmelogin)}}/> 
        <p>Keep me login</p>
      </label>
      </form>
    </div>
  )
}

export default LoginPage