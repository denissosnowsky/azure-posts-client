import React, { useContext, useEffect, useState, VFC } from 'react'
import { Container } from '@mui/material'

import { Article } from '../../components/article/article'
import { BlogHeader } from '../../components/blogHeader/blogHeader'
import { AddModal } from './addModal/addModal'
import { StoreContext } from '../../context/storeProvider'
import s from './blog.module.css'
import { useLocation } from 'react-router-dom'
import { Loading } from '../../components/loading/loading'
import apiService from '../../service/api.service'
import { ArticleItem, UserItem } from '../../types/api-service.abstract'
import { getImageUrlFromDB } from '../../utils/getImageUrlFromDB'

export const Blog: VFC = () => {
  const [list, setList] = useState<ArticleItem[]>([])
  const [blogUser, setBlogUser] = useState<UserItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { isOpenAddModal, setIsOpenAddModal, userId, userData, userPhoto } = useContext(
    StoreContext,
  )!

  let location = useLocation()
  const currentBlogUserId = location.pathname.split('blog/')[1]
  const isMyBlog = currentBlogUserId === userId

  const fetchList = async (currentBlogUserId: string) => {
    try {
      const res = await apiService.get<{ value: ArticleItem[] }>(
        `/blog-posts/MarsWhiteHacker/${currentBlogUserId}`,
      )
      setList(res.value.sort((a, b) => Number(b.RowKey) - Number(a.RowKey)))
    } catch (e) {
      const error = e as Error
      console.log(e)
      alert(error.message)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiService.get<{ value: UserItem[] }>(
          `/author/${currentBlogUserId}`,
        )
        setBlogUser(res.value[0])
      } catch (e) {
        const error = e as Error
        console.log(e)
        alert(error.message)
      }
    }
    fetchUser()
    fetchList(currentBlogUserId)
  }, [currentBlogUserId])

  const handleCloseAddModal = () => {
    setIsOpenAddModal(false)
  }

  const handleSaveAddModal = async (title: string, content: string) => {
    setIsLoading(true)
    try {
      await apiService.post<{ post: ArticleItem; user: UserItem }>(
        '/blog-post',
        {
          blog: 'MarsWhiteHacker',
          title,
          content,
          userId: `${localStorage.getItem('azure-userId')}`,
          accessToken: `${localStorage.getItem('azure-access-token')}`,
        },
      )
      await fetchList(currentBlogUserId)
    } catch (e) {
      const error = e as Error
      console.log(e)
      alert(error.message)
    }
    setIsLoading(false)
  }

  const handleDeletePost = async (articleId: string) => {
    setIsLoading(true)
    try {
      await apiService.delete<unknown>(
        `/blog-post/MarsWhiteHacker/${articleId}`,
      )
      await fetchList(currentBlogUserId)
    } catch (e) {
      const error = e as Error
      console.log(e)
      alert(error.message)
    }
    setIsLoading(false)
  }

  const handleUpdatePost = async (
    articleId: string,
    title: string,
    content: string,
  ) => {
    setIsLoading(true)
    try {
      await apiService.put<unknown>(`/blog-post/MarsWhiteHacker/${articleId}`, {
        title,
        content,
      })
      await fetchList(currentBlogUserId)
    } catch (e) {
      const error = e as Error
      console.log(e)
      alert(error.message)
    }
    setIsLoading(false)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <Container className={s.container}>
      <BlogHeader
        isMyBlog={isMyBlog}
        name={isMyBlog ? userData.displayName : blogUser?.name}
        email={isMyBlog ? userData.userPrincipalName : blogUser?.email ?? ''}
        photo={isMyBlog ? userPhoto : getImageUrlFromDB(blogUser?.photo ?? '')}
      />
      {list.map((article, i) => (
        <Article
          key={i}
          article={article}
          isBlogPageArticle
          isMyBlog={isMyBlog}
          deleteHandler={handleDeletePost}
          updateHandler={handleUpdatePost}
        />
      ))}
      <AddModal
        isOpen={isOpenAddModal}
        handleClose={handleCloseAddModal}
        handleSaveAddModal={handleSaveAddModal}
      />
    </Container>
  )
}
