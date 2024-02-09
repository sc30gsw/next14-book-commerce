import React, { FC } from 'react'

import { authOptions } from '@/libs/authOptions'
import { BookType } from '@/types/Book'
import { getServerSession } from 'next-auth'
import { BookClient } from './BookClient'

type BookProps = Readonly<{
  book: BookType
}>

export const Book: FC<BookProps> = async ({ book }) => {
  const session = await getServerSession(authOptions)

  const res = await fetch(
    `${process.env.APP_ORIGIN}/api/purchase?userId=${session?.user?.id}&bookId=${book.id}`,
    { cache: 'no-store' },
  )
  const { purchase } = await res.json()

  return <BookClient book={book} session={session} isPurchase={!!purchase} />
}
