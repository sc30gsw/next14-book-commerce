import React, { FC } from 'react'

import { authOptions } from '@/libs/authOptions'
import { BookType } from '@/types/Book'
import { Purchase } from '@prisma/client'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { tv } from 'tailwind-variants'
import { Modal } from './Modal'

const bookStyles = tv({
  slots: {
    base: 'flex items-center flex-col m-4',
    contentWrapper: 'shadow-2xl',
    image: 'rounded-t-md',
    content: 'p-4 w-[450px] bg-slate-100 rounded-b-md',
    title: 'my-2 text-lg font-semibold whitespace-normal h-20',
    price: 'text-md text-slate-700',
  },
})

type BookProps = Readonly<{
  book: BookType
}>

export const Book: FC<BookProps> = async ({ book }) => {
  const { base, contentWrapper, image, content, title, price } = bookStyles()

  const session = await getServerSession(authOptions)

  const res = await fetch(
    `${process.env.APP_ORIGIN}/api/purchase/${session?.user?.id}/${book.id}`,
    { cache: 'no-store' },
  )

  const { purchase }: Record<'purchase', Purchase | null> = await res.json()

  return (
    <div className={base()}>
      <div className={contentWrapper()}>
        <Link href={'/'}>
          <Image
            priority={true}
            src={book.thumbnail?.url || ''}
            alt={book.title}
            width={450}
            height={350}
            className={image()}
          />
          <div className={content()}>
            <h2 className={title()}>{book.title}</h2>
            <p className={price()}>値段：{book.price}円</p>
          </div>
        </Link>
        <Modal book={book} session={session} isPurchase={!!purchase} />
      </div>
    </div>
  )
}
