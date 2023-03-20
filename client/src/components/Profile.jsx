import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../style/profile.module.css'

const Profile = ({profile,socket}) => {
  const navigate = useNavigate()

  const handleLogout = ()=>{
    localStorage.removeItem('User')
    socket.current.disconnect()
    navigate('/')
  }

  return (
    <div>
      {profile ? (
        <div className={style.profileBox}>
          <img src='https://images.unsplash.com/photo-1678962304218-d4aea8fa7d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' alt='' className={style.photo} />
          <h2>{profile.fullName}</h2>
          <h2>{profile.username}</h2>
          <button className={style.logoutButton} onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
