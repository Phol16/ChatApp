import React from 'react'
import MainPage from '../pages/MainPage'
import style from '../style/mainLayout.module.css'

const  MainPageLayout = () => {
  return (
    <div>
      <section className={style.mainContainer}>
      <MainPage/>
      </section>
    </div>
  )
}

export default MainPageLayout