import React, { FC } from 'react'

import { authOptions } from '@/libs/authOptions'
import { BookType } from '@/types/Book'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { tv } from 'tailwind-variants'
import { BookClient } from './BookClient'

const bookStyles = tv({
  base: 'rounded-t-md',
})

type BookProps = Readonly<{
  book: BookType
}>

export const Book: FC<BookProps> = async ({ book }) => {
  const session = await getServerSession(authOptions)

  const res = await fetch(
    `${process.env.APP_ORIGIN}/api/purchase/${session?.user?.id}/${book.id}`,
    { cache: 'no-store' },
  )
  const { purchase } = await res.json()

  return (
    <BookClient book={book} session={session} isPurchase={!!purchase}>
      <Image
        priority={true}
        src={book.thumbnail?.url || ''}
        alt={book.title}
        width={450}
        height={350}
        className={bookStyles()}
      />
    </BookClient>
  )
}
