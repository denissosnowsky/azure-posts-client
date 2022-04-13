export default abstract class ApiService {
  abstract get: <R = void>(
    url: string,
    query?: Record<string, string>,
  ) => Promise<R>

  abstract post: <R = void, B = unknown>(
    url: string,
    body?: B,
    query?: Record<string, string>,
  ) => Promise<R>

  abstract put: <R = void, B = unknown>(
    url: string,
    body?: B,
    query?: Record<string, string>,
  ) => Promise<R>

  abstract delete: <R = void>(
    url: string,
    query?: Record<string, string>,
  ) => Promise<R>
}

export type ArticleItem = {
  PartitionKey: string
  RowKey: string
  Timestamp: string
  title: string
  content: string
  userId: string
  userName: string
  userPhoto: string
}

export type UserItem = {
  PartitionKey: string
  RowKey: string
  Timestamp: string
  name: string
  photo: string
  email: string
}
