import { BookType } from '@/types/Book'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

type PurchaseProductProps = Readonly<{ book: BookType }>

export const PurchaseProduct: FC<PurchaseProductProps> = ({ book }) => {
  return (
    <Link href={`/book/${book.id}`} className="cursor-pointer shadow-2xl">
      <Image
        priority={true}
        src={book.thumbnail?.url || ''}
        alt={book.title}
        width={450}
        height={350}
        className="rounded-t-md"
      />
      <div className="px-4 py-4 bg-slate-100 rounded-b-md w-[450px]">
        <h2 className="text-lg font-semibold whitespace-normal">
          {book.title}
        </h2>
        <p className="mt-2 text-md text-slate-700">値段：{book.price}円</p>
      </div>
    </Link>
  )
}
