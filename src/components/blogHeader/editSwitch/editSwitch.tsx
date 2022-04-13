import React, { ChangeEvent, VFC } from 'react'
import { Switch } from '@mui/material'

import s from './editSwitch.module.css'

export const EditSwitch: VFC<Props> = ({checked, handleChange}) => {
  return (
    <div className={s.switch}>
      <span>Edit mode:</span>
      <Switch checked={checked} onChange={handleChange} />
    </div>
  )
}

type Props = {
  checked: boolean
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}
