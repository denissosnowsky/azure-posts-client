import React, { VFC } from 'react'
import AddIcon from '@mui/icons-material/Add'

import s from './addButton.module.css'

export const AddButton: VFC<Props> = ({ onClick }) => {
  return (
    <div className={s.wrapper} onClick={onClick}>
      <AddIcon />
    </div>
  )
}

type Props = {
  onClick: () => void
}
