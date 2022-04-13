import React, { VFC } from 'react'

import loading from '../../assets/loading.gif'
import s from './loading.module.css'

export const Loading: VFC = () => {
  return (
    <div className={s.wrapper}>
      <img alt="loading" src={loading} className={s.loading} />
    </div>
  )
}
