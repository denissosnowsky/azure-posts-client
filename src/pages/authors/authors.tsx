import React, { useEffect, useState, VFC } from 'react'
import { Container } from '@mui/material'

import s from './authors.module.css'
import { Author } from '../../components/author/author'
import apiService from '../../service/api.service'
import { UserItem } from '../../types/api-service.abstract'
import { Loading } from '../../components/loading/loading'

export const Authors: VFC = () => {
  const [list, setList] = useState<UserItem[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchList = async () => {
      try {
        setIsLoading(true)
        const res = await apiService.get<{ value: UserItem[] }>('/authors')
        setList(res.value)
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
        {list.map((user) => (
          <Author
            name={user.name}
            email={user.email}
            key={user.PartitionKey}
            userId={user.PartitionKey}
            photo={user.photo}
          />
        ))}
      </div>
    </Container>
  )
}
