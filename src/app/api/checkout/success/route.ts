import { prisma } from '@/libs/db'
import { stripe } from '@/libs/stripe'
import { handleError } from '@/libs/utils'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  try {
    if (req.method !== 'POST') {
      return NextResponse.json({ status: 400, message: 'Bad Request' })
    }

    const { sessionId } = await req.json()

    if (!sessionId) {
      return NextResponse.json({ status: 404, message: 'Invalid ID' })
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (!session) {
      return NextResponse.json({ status: 400, message: 'Session not found' })
    }

    if (!(session.client_reference_id && session.metadata)) {
      return NextResponse.json({ status: 400, message: 'Session not found' })
    }

    const newPurchase = await prisma.purchase.create({
      data: {
        userId: session.client_reference_id,
        bookId: session.metadata.bookId,
      },
    })

    return NextResponse.json({ status: 201, purchase: newPurchase })
  } catch (error) {
    handleError(error)
    return NextResponse.json({ status: 500, message: 'Something Went Wrong' })
  }
}
