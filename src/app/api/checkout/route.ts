import { stripe } from '@/libs/stripe'
import { handleError } from '@/libs/utils'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  try {
    if (req.method !== 'POST') {
      return NextResponse.json({ status: 400, message: 'Bad Request' })
    }

    const { title, price, bookId, userId } = await req.json()

    if (!(title && price && bookId && userId)) {
      return NextResponse.json({
        status: 404,
        message: 'Invalid Request Body',
      })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      // biome-ignore lint/style/useNamingConvention: For library type definition
      payment_method_types: ['card'],
      // biome-ignore lint/style/useNamingConvention: For library type definition
      line_items: [
        {
          // biome-ignore lint/style/useNamingConvention: For library type definition
          price_data: {
            currency: 'jpy',
            // biome-ignore lint/style/useNamingConvention: For library type definition
            product_data: { name: title },
            // biome-ignore lint/style/useNamingConvention: For library type definition
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      metadata: {
        bookId,
      },
      // biome-ignore lint/style/useNamingConvention: For library type definition
      client_reference_id: userId,
      // biome-ignore lint/style/useNamingConvention: For library type definition
      success_url: `${process.env.APP_ORIGIN}/book/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      // biome-ignore lint/style/useNamingConvention: For library type definition
      cancel_url: `${process.env.APP_ORIGIN}`,
    })

    return NextResponse.json({ status: 200, checkoutUrl: session.url })
  } catch (error) {
    handleError(error)
    return NextResponse.json({ status: 500, message: '購入に失敗しました' })
  }
}
