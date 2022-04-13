import React, { VFC } from 'react'
import { Avatar } from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article'
import EmailIcon from '@mui/icons-material/Email'
import { NavLink } from 'react-router-dom'

import s from './author.module.css'
import { getImageUrlFromDB } from '../../utils/getImageUrlFromDB'

export const Author: VFC<Props> = ({ email, name, userId, photo }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.photo}>
        <Avatar alt={name} src={getImageUrlFromDB(photo)} sx={{ width: 100, height: 100 }} />
      </div>
      <div className={s.description}>
        <div className={s.name}>{name ?? 'Anonym'}</div>
        <div className={s.buttons}>
          {email && <a href={`mailto:${email}`}>
            <EmailIcon htmlColor="#fff173" className={s.articles} />
          </a>}
          <NavLink to={`/blog/${userId}`}>
            <ArticleIcon className={s.articles} />
          </NavLink>
        </div>
      </div>
    </div>
  )
}

type Props = {
  email: string
  name: string
  userId: string
  photo: string
}
