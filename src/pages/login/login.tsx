import React, { VFC } from 'react'

import s from './login.module.css'
import windowsLogo from '../../assets/windows-logo.svg'
import { Header } from '../../components/header/header'
import { NavLink } from 'react-router-dom'

export const Login: VFC<Props> = ({ loginHandler }) => {
  return (
    <>
      <div className={s.logoWrapper}>
        <Header isAnimation />
      </div>
      <div className={s.wrapper}>
        {
          <div className={s.login} onClick={loginHandler}>
            <img src={windowsLogo} className={s.logo} alt="logo" />
            <div className={s.text}>Login with Windows</div>
          </div>
        }
      </div>
      <div className={s.footer}>
        <NavLink to="/articles">Wanna read without account</NavLink>
      </div>
    </>
  )
}

type Props = {
  loginHandler: () => void
}
