import React from 'react'

import { PurchaseProduct } from '@/components/PurchaseProduct'
import { authOptions } from '@/libs/authOptions'
import { getBook } from '@/libs/microcms'
import { BookType } from '@/types/Book'
import { Purchase } from '@prisma/client'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { tv } from 'tailwind-variants'

const profilePage = tv({
  slots: {
    container: 'container mx-auto',
    title: 'text-xl font-bold',
    info: 'bg-white shadow-md rounded',
    imageWrapper: '',
    image: 'rounded-t-md',
    username: 'ml-4 font-semibold',
    purchaseTitle: 'font-medium mt-4 block',
    books: 'gap-6',
  },
  compoundSlots: [
    { slots: ['container', 'info'], class: 'p-4' },
    { slots: ['title', 'purchaseTitle'], class: 'mb-4' },
    { slots: ['username', 'purchaseTitle'], class: 'text-lg' },
    { slots: ['imageWrapper', 'books'], class: 'flex items-center' },
  ],
})

const ProfilePage = async () => {
  const {
    container,
    title,
    info,
    imageWrapper,
    image,
    username,
    purchaseTitle,
    books,
  } = profilePage()

  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return redirect('/login')
  }

  const user = session.user

  const res = await fetch(`${process.env.APP_ORIGIN}/api/purchase/${user.id}`, {
    cache: 'no-store',
  })
  const { purchases } = await res.json()

  const purchaseDetailBook: BookType[] = await Promise.all(
    purchases.map(async (purchase: Purchase) => {
      return await getBook(purchase.bookId)
    }),
  )

  return (
    <div className={container()}>
      <h1 className={title()}>プロフィール</h1>
      <div className={info()}>
        <div className={imageWrapper()}>
          <Image
            priority={true}
            src={user.image || '/default_icon.png'}
            alt="user profile_icon"
            width={60}
            height={60}
            className={image()}
          />
          <h2 className={username()}>お名前：{user.name}</h2>
        </div>
      </div>
      <span className={purchaseTitle()}>購入した記事</span>
      <div className={books()}>
        {purchaseDetailBook.map((book: BookType) => (
          <PurchaseProduct key={book.id} book={book} />
        ))}
      </div>
    </div>
  )
}

export default ProfilePage
