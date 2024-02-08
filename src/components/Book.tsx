'use client'

import { FC } from 'react'

import { TBook } from '@/app/page'
import Image from 'next/image'
import Link from 'next/link'
import { tv } from 'tailwind-variants'

const bookStyles = tv({
  slots: {
    base: 'flex-col m-4',
    link: 'cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none',
    image: 'rounded-t-md',
    content: 'py-4 bg-slate-100 rounded-b-md',
    title: 'text-lg font-semibold',
    description: 'text-lg text-slate-600',
    price: 'text-md text-slate-700',
    modal:
      'absolute top-0 left-0 right-0 bottom-0 bg-slate-900 bg-opacity-50  justify-center modal animate-fadeIn',
    modalContent: 'bg-white p-8 rounded-lg',
    modalTitle: 'text-xl mb-4',
    purchaseButton: 'mr-4',
    cancelButton: '',
  },
  variants: {
    color: {
      primary: {
        purchaseButton: 'bg-blue-500 hover:bg-blue-700',
        cancelButton: 'bg-blue-500 hover:bg-blue-700',
      },
      secondary: {
        purchaseButton: 'bg-gray-500 hover:bg-gray-700',
        cancelButton: 'bg-gray-500 hover:bg-gray-700',
      },
    },
  },
  compoundSlots: [
    { slots: ['base', 'modal'], class: 'flex items-center' },
    { slots: ['title', 'description'], class: 'mt-2' },
    { slots: ['content', 'purchaseButton', 'cancelButton'], class: 'px-4' },
    {
      slots: ['purchaseButton', 'cancelButton'],
      class: 'text-white font-bold py-2 rounded',
    },
  ],
})

type BookProps = {
  book: TBook
}

export const Book: FC<BookProps> = ({ book }) => {
  const {
    base,
    link,
    image,
    content,
    title,
    description,
    price,
    modal,
    modalContent,
    modalTitle,
    purchaseButton,
    cancelButton,
  } = bookStyles()

  return (
    <div className={base()}>
      <Link href={'/'} className={link()}>
        <Image
          priority={true}
          src={book.thumbnail}
          alt={book.title}
          width={450}
          height={350}
          className={image()}
        />
        <div className={content()}>
          <h2 className={title()}>{book.title}</h2>
          <p className={description()}>{book.content}</p>
          <p className={price()}>値段：{book.price}円</p>
        </div>
      </Link>

      {/* <div className={modal()}>
        <div className={modalContent()}>
          <h3 className={modalTitle()}>本を購入しますか？</h3>
          <button
            type="button"
            className={purchaseButton({ color: 'primary' })}
          >
            購入する
          </button>
          <button
            type="button"
            className={cancelButton({ color: 'secondary' })}
          >
            キャンセル
          </button>
        </div>
      </div> */}
    </div>
  )
}
