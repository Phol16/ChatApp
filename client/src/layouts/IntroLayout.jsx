import React from 'react'
import MainPage from '../pages/MainPage'
import style from '../style/introLayout.module.css'

const IntroLayout = () => {
  return (
    <div>
      <section className={style.mainContainer}>
      <MainPage/>
      </section>
    </div>
  )
}

export default IntroLayout