import React from 'react'

import { getAllBooks, getBook } from '@/libs/microcms'
import { BookType } from '@/types/Book'
import parser from 'html-react-parser'
import { MicroCMSListResponse } from 'microcms-js-sdk'
import Image from 'next/image'
import { tv } from 'tailwind-variants'

export const generateStaticParams = async () => {
  const { contents } =
    (await getAllBooks()) satisfies MicroCMSListResponse<BookType>

  const paths = contents.map((book) => {
    return {
      bookId: book.id,
    }
  })

  return [...paths]
}

const bookDetail = tv({
  slots: {
    container: 'container mx-auto',
    contents: 'bg-white shadow-lg rounded-lg overflow-hidden',
    image: 'w-full h-80 object-cover object-center',
    textContents: '',
    title: 'text-2xl font-bold',
    content: 'text-gray-700',
    dateWrapper: 'flex justify-between items-center',
    date: 'text-sm text-gray-500',
  },
  compoundSlots: [
    { slots: ['container', 'textContents'], class: 'p-4' },
    { slots: ['content', 'dateWrapper'], class: 'mt-2' },
  ],
})

const BookDetailPage = async ({
  params,
}: Readonly<{ params: { bookId: string } }>) => {
  const {
    container,
    contents,
    image,
    textContents,
    title,
    content,
    dateWrapper,
    date,
  } = bookDetail()

  const book = await getBook(params.bookId)

  return (
    <div className={container()}>
      <div className={contents()}>
        <Image
          className={image()}
          src={book.thumbnail?.url || ''}
          alt={book.title}
          width={700}
          height={700}
        />
        <div className={textContents()}>
          <h2 className={title()}>{book.title}</h2>
          <div className={content()}>{parser(book.content)}</div>
          <div className={dateWrapper()}>
            <span className={date()}>
              公開日: {new Date(book.createdAt).toLocaleString()}
            </span>
            <span className={date()}>
              最終更新: {new Date(book.updatedAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetailPage
