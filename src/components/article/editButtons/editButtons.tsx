import React, { useState, VFC } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'

import s from './editButtons.module.css'

export const EditButtons: VFC<Props> = ({
  editMode,
  setEditMode,
  cancelHandler,
  deleteHandler,
  updateHandler
}) => {
  const cancelBtnHandler = () => {
    cancelHandler()
    setEditMode(false)
  }

  const saveBtnHandler = () => {
    updateHandler()
    setEditMode(false)
  }

  return (
    <div className={s.editModeButtons}>
      {!editMode && (
        <DeleteIcon
          fontSize="large"
          htmlColor="#ff003c"
          className={s.editIcon}
          onClick={deleteHandler}
        />
      )}
      {!editMode && (
        <EditIcon
          fontSize="large"
          className={s.editIcon}
          onClick={() => setEditMode(true)}
        />
      )}
      {editMode && (
        <CloseIcon
          fontSize="large"
          htmlColor="#ff003c"
          className={s.editIcon}
          onClick={cancelBtnHandler}
        />
      )}
      {editMode && (
        <SaveIcon
          fontSize="large"
          htmlColor="#666bff"
          className={s.editIcon}
          onClick={saveBtnHandler}
        />
      )}
    </div>
  )
}

type Props = {
  editMode: boolean
  updateHandler: () => void
  deleteHandler: () => void
  setEditMode: (arg: boolean) => void
  cancelHandler: () => void
}
