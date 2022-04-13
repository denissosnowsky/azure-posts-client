import React, { useEffect, useState, VFC } from 'react'
import { Container } from '@mui/material'

import s from './articles.module.css'
import { Article } from '../../components/article/article'
import { ArticleItem } from '../../types/api-service.abstract'
import apiService from '../../service/api.service'
import { Loading } from '../../components/loading/loading'

export const Articles: VFC = () => {
  const [list, setList] = useState<ArticleItem[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchList = async () => {
      try {
        setIsLoading(true)
        const res = await apiService.get<{ value: ArticleItem[] }>(
          '/blog-posts/MarsWhiteHacker',
        )
        setList(res.value.sort((a,b) => Number(b.RowKey) - Number(a.RowKey)))
      } catch (e) {
        const error = e as Error
        console.log(e)
        alert(error.message)
      }
      setIsLoading(false)
    }
    fetchList()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <Container className={s.container}>
      <div className={s.wrapper}>
        {list.map((article, i) => (
          <Article
            key={i}
            isMyBlog={false}
            article={article}
          />
        ))}
      </div>
    </Container>
  )
}
