import { BookType } from '@/types/Book'
import { createClient } from 'microcms-js-sdk'

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || '',
  apiKey: process.env.MICROCMS_API_KEY || '',
})

export const getAllBooks = async () => {
  const allBooks = await client.getList<BookType>({
    endpoint: 'books',
    customRequestInit: {
      next: { revalidate: 3600 },
    },
  })

  return allBooks
}

export const getBook = async (contentId: string) => {
  const detailBook = await client.getListDetail<BookType>({
    endpoint: 'books',
    customRequestInit: {
      cache: 'no-store',
    },
    contentId,
  })

  return detailBook
}
