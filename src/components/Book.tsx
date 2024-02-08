'use client'

import { FC, useState } from 'react'

import { BookType } from '@/types/Book'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { tv } from 'tailwind-variants'

const bookStyles = tv({
  slots: {
    base: 'flex-col m-4',
    contentWrapper:
      'shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none',
    image: 'rounded-t-md',
    content: 'py-4 w-[450px]',
    title: 'mt-2 text-lg font-semibold whitespace-normal',
    price: 'text-md text-slate-700',
    detailButton: 'w-full text-right p-4 border-t',
    modal: '',
    modalContent: 'hidden bg-white p-8 rounded-lg',
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
    modalOpen: {
      true: {
        modal:
          'absolute top-0 left-0 right-0 bottom-0 bg-slate-900 bg-opacity-50  justify-center modal animate-fadeIn',
        modalContent: 'block',
      },
    },
  },
  compoundSlots: [
    { slots: ['base', 'modal'], class: 'flex items-center' },
    { slots: ['content', 'purchaseButton', 'cancelButton'], class: 'px-4' },
    { slots: ['content', 'detailButton'], class: 'bg-slate-100 rounded-b-md' },
    {
      slots: ['purchaseButton', 'cancelButton'],
      class: 'text-white font-bold py-2 rounded',
    },
  ],
})

type BookProps = Readonly<{
  book: BookType
}>

export const Book: FC<BookProps> = ({ book }) => {
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
    purchaseButton,
    cancelButton,
  } = bookStyles()

  const router = useRouter()

  const { data: session } = useSession()

  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(true)
  }

  const handlePurchase = () => {
    if (session?.user) {
      // stripe決済
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
          今すぐ購入する
        </button>
      </div>

      <div className={modal({ modalOpen: isOpen })}>
        <div className={modalContent({ modalOpen: isOpen })}>
          <h3 className={modalTitle()}>本を購入しますか？</h3>
          <button
            type="button"
            className={purchaseButton({ color: 'primary' })}
            onClick={handlePurchase}
          >
            購入する
          </button>
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
  )
}
