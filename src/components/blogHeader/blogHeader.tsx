import React, { ChangeEvent, useContext, VFC } from 'react'
import { Avatar } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'

import { StoreContext } from '../../context/storeProvider'
import s from './blogHeader.module.css'
import { EditSwitch } from './editSwitch/editSwitch'
import { AddButton } from './addButton/addButton'

export const BlogHeader: VFC<Props> = ({ isMyBlog, photo, name, email }) => {
  const { isEditBlogMode, setIsEditBlogMode, setIsOpenAddModal } = useContext(
    StoreContext,
  )!

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsEditBlogMode(event.target.checked)
  }

  const handleOpenAddModal = () => {
    setIsOpenAddModal(true)
  }

  return (
    <div className={s.wrapper}>
      <Avatar alt={name} src={photo} sx={{ width: 100, height: 100 }} />
      <div className={s.name}>{name ?? 'Anonym'}</div>
      <a href={`mailto:${email}`}>
        {email && <EmailIcon htmlColor="#fff173" className={s.letter} />}
      </a>
      {isMyBlog && (
        <EditSwitch checked={isEditBlogMode} handleChange={handleChange} />
      )}
      {isMyBlog && isEditBlogMode && <AddButton onClick={handleOpenAddModal} />}
    </div>
  )
}

type Props = {
  isMyBlog: boolean
  photo: string
  name: string
  email: string
}
