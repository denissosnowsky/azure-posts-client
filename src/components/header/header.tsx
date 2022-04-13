import React, { CSSProperties, VFC } from 'react'

import s from './header.module.css'

export const Header: VFC<Props> = ({isAnimation, style}) => {
  return (
    <div className={isAnimation ? s.textAnimation : s.text} style={style}>
      <span>C</span>
      <span>h</span>
      <span>i</span>
      <span>l</span>
      <span>l</span>
      <span>i</span>
      <span>n</span>
      <span>g&nbsp;</span>
      <span>B</span>
      <span>l</span>
      <span>o</span>
      <span>g</span>
    </div>
  )
}

type Props = {
  isAnimation?: boolean; 
  style?: CSSProperties;
}
