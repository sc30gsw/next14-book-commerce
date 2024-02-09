'use client'

import React, { FC, useState, useTransition } from 'react'

import { handleError } from '@/libs/utils'
import { BookType } from '@/types/Book'
import { Session } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { AiOutlineLoading } from 'react-icons/ai'
import { tv } from 'tailwind-variants'

const bookStyles = tv({
  slots: {
    base: 'flex-col m-4',
    contentWrapper: 'shadow-2xl',
    image: 'rounded-t-md',
    content: 'py-4 w-[450px]',
    title: 'mt-2 text-lg font-semibold whitespace-normal h-20 mb-2',
    price: 'text-md text-slate-700',
    detailButton: 'w-full text-right p-4 border-t hover:underline',
    modal: '',
    modalContent: 'hidden bg-white p-8 rounded-lg',
    modalTitle: 'text-xl mb-4',
    buttonWrapper: 'flex',
    purchaseButton: 'mr-4',
    cancelButton: '',
    icon: '',
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
    disabled: {
      true: {
        purchaseButton: 'disabled:cursor-not-allowed disabled:bg-slate-500',
        cancelButton: 'disabled:cursor-not-allowed disabled:bg-slate-500',
      },
    },
    modalOpen: {
      true: {
        modal:
          'absolute top-0 left-0 right-0 bottom-0 bg-slate-900 bg-opacity-50  justify-center modal animate-fadeIn',
        modalContent: 'block',
      },
    },
    m: {
      r: { icon: 'mr-2' },
      l: { icon: 'ml-2' },
    },
    loading: {
      true: { icon: 'animate-spin' },
    },
  },
  compoundSlots: [
    { slots: ['base', 'modal', 'purchaseButton'], class: 'flex items-center' },
    { slots: ['content', 'purchaseButton', 'cancelButton'], class: 'px-4' },
    { slots: ['content', 'detailButton'], class: 'bg-slate-100 rounded-b-md' },
    {
      slots: ['purchaseButton', 'cancelButton'],
      class: 'text-white font-bold py-2 rounded',
    },
  ],
})

type BookClientProps = Readonly<{
  book: BookType
  session?: Session | null
  isPurchase?: boolean
}>

export const BookClient: FC<BookClientProps> = ({
  book,
  session,
  isPurchase,
}) => {
  const {
    base,
    contentWrapper,
    image,
    content,
    title,
    price,
    detailButton,
    modal,
    modalContent,
    modalTitle,
    buttonWrapper,
    purchaseButton,
    cancelButton,
    icon,
  } = bookStyles()

  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    setIsOpen(true)
  }

  const handlePurchase = (book: BookType) => {
    if (session?.user) {
      // stripe決済
      startTransition(async () => {
        try {
          const { title, price, id } = book
          const res = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title,
              price,
              bookId: id,
              userId: session.user?.id,
            }),
          })

          const json = await res.json()

          if (json.checkoutUrl) {
            toast.success('購入に成功しました')
            router.push(json.checkoutUrl)
          }
        } catch (error) {
          handleError(error)
          toast.error('購入に失敗しました')
        }
      })
    } else {
      setIsOpen(false)
      router.push('/login')
    }
  }

  const handleCancel = () => {
    setIsOpen(false)
  }

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
        <button type="button" onClick={handleClick} className={detailButton()}>
          {isPurchase ? '詳細ページへ' : '今すぐ購入する'}
        </button>
      </div>

      <div className={modal({ modalOpen: isOpen })}>
        <div className={modalContent({ modalOpen: isOpen })}>
          <h3 className={modalTitle()}>
            {isPurchase ? '書籍の詳細を閲覧しますか？' : '本を購入しますか？'}
          </h3>
          <div className={buttonWrapper()}>
            {isPurchase ? (
              <button
                type="button"
                className={purchaseButton({
                  color: 'primary',
                })}
                onClick={() => router.push(`/book/${book.id}`)}
              >
                詳細ページへ
              </button>
            ) : (
              <button
                type="button"
                disabled={isPending}
                className={purchaseButton({
                  color: 'primary',
                  disabled: isPending,
                })}
                onClick={() => handlePurchase(book)}
              >
                購入する
                {isPending && (
                  <AiOutlineLoading
                    size={20}
                    className={icon({ m: 'l', loading: isPending })}
                  />
                )}
              </button>
            )}
            <button
              type="button"
              className={cancelButton({ color: 'secondary' })}
              onClick={handleCancel}
            >
              キャンセル
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
