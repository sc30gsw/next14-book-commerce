import { BookType } from '@/types/Book'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import { tv } from 'tailwind-variants'

const purchaseProduct = tv({
  slots: {
    link: 'cursor-pointer shadow-2xl',
    image: 'rounded-t-md',
    contents: 'px-4 py-4 bg-slate-100 rounded-b-md w-[450px]',
    title: 'text-lg font-semibold whitespace-normal',
    price: 'mt-2 text-md text-slate-700',
  },
})

type PurchaseProductProps = Readonly<{ book: BookType }>

export const PurchaseProduct: FC<PurchaseProductProps> = ({ book }) => {
  const { link, image, contents, title, price } = purchaseProduct()

  return (
    <Link href={`/book/${book.id}`} className={link()}>
      <Image
        priority={true}
        src={book.thumbnail?.url || ''}
        alt={book.title}
        width={450}
        height={350}
        className={image()}
      />
      <div className={contents()}>
        <h2 className={title()}>{book.title}</h2>
        <p className={price()}>値段：{book.price}円</p>
      </div>
    </Link>
  )
}
