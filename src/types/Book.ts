import type { MicroCMSDate } from 'microcms-js-sdk'

export type BookType = Readonly<{
  id: string
  title: string
  content: string
  price: number
  thumbnail?: {
    url: string
    height: number
    width: number
  }
}> &
  Readonly<MicroCMSDate>
