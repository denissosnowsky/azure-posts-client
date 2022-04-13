import React, { useContext, useState, VFC } from 'react'
import { Avatar, TextareaAutosize, TextField } from '@mui/material'
import { NavLink } from 'react-router-dom'

import { StoreContext } from '../../context/storeProvider'
import { EditButtons } from './editButtons/editButtons'
import s from './article.module.css'
import { ArticleItem } from '../../types/api-service.abstract'
import { getImageUrlFromDB } from '../../utils/getImageUrlFromDB'

export const Article: VFC<Props> = ({
  article,
  isMyBlog,
  isBlogPageArticle,
  deleteHandler,
  updateHandler,
}) => {
  const { isEditBlogMode } = useContext(StoreContext)!
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(article.title)
  const [content, setContent] = useState(article.content)

  const deleteBlog = () => {
    if (deleteHandler) {
      deleteHandler(article.RowKey)
    }
  }

  const saveUpdateBlog = () => {
    if(updateHandler){
      updateHandler(article.RowKey, title, content)
    }
  }

  const cancelEditBlog = () => {
    setTitle(article.title);
    setContent(article.content);
  }

  return (
    <div className={s.wrapper}>
      {!isBlogPageArticle && (
        <NavLink to={`/blog/${article.userId}`}>
          <Avatar
            alt={article.userName}
            src={getImageUrlFromDB(article.userPhoto)}
            className={s.avatar}
            sx={{ width: 70, height: 70 }}
          />
        </NavLink>
      )}
      {isBlogPageArticle && isMyBlog && isEditBlogMode && (
        <EditButtons
          deleteHandler={deleteBlog}
          updateHandler={saveUpdateBlog}
          cancelHandler={cancelEditBlog}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      )}
      {!editMode ? (
        <div className={s.header}>{article.title}</div>
      ) : (
        <TextField
          variant="standard"
          placeholder='Enter title'
          value={title}
          className={s.header}
          onChange={(e) => setTitle(e.target.value)}
        />
      )}
      {!editMode ? (
        <div>{article.content}</div>
      ) : (
        <TextareaAutosize
          placeholder="Start writing the article..."
          className={s.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      )}
    </div>
  )
}

type Props = {
  article: ArticleItem
  isBlogPageArticle?: boolean
  isMyBlog: boolean
  deleteHandler?: (articleId: string) => void
  updateHandler?: (articleId: string, title: string, content: string) => void
}
