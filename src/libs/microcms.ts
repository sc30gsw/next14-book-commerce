import { BookType } from '@/types/Book'
import { createClient } from 'microcms-js-sdk'

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || '',
  apiKey: process.env.MICROCMS_API_KEY || '',
})

export const getAllBooks = async () => {
  const allBooks = await client.getList<BookType>({
    endpoint: 'books',
  })

  return allBooks
}
