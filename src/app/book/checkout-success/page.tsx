import React from 'react'

import { isExistingPurchase } from '@/actions/isExistingPurchase'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { tv } from 'tailwind-variants'

const checkoutSuccess = tv({
  slots: {
    base: 'flex items-center justify-center bg-gray-100 mt-20',
    container: 'bg-white p-6 rounded-lg shadow-lg',
    title: 'text-2xl font-bold text-gray-800 mb-4',
    message: 'text-gray-600',
    linkWrapper: 'mt-8',
    link: 'text-indigo-600 hover:text-indigo-800 transition duration-300',
  },
  compoundSlots: [
    { slots: ['title', 'message', 'linkWrapper'], class: 'text-center' },
  ],
})

const CheckoutSuccessPage = async ({
  searchParams,
}: Readonly<{ searchParams: { session_id: string } }>) => {
  const { base, container, title, message, linkWrapper, link } =
    checkoutSuccess()

  const sessionId = searchParams.session_id

  const result = await isExistingPurchase(sessionId)

  // stripeのsessionまたはsession.client_reference_id・session.metadataが存在しない場合

  // 購入済みの場合
  if (result.isPurchase) {
    return redirect('/')
  }

  const res = await fetch(`${process.env.APP_ORIGIN}/api/checkout/success`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId }),
  })

  const { purchase } = await res.json()

  return (
    <div className={base()}>
      <div className={container()}>
        <h1 className={title()}>購入ありがとうございます！</h1>
        <p className={message()}>
          ご購入いただいた内容の詳細は、登録されたメールアドレスに送信されます。
        </p>
        <div className={linkWrapper()}>
          <Link href={`/book/${purchase.bookId}`} className={link()}>
            購入した記事を読む
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSuccessPage
