'use server'

import { prisma } from '@/libs/db'
import { stripe } from '@/libs/stripe'

export const isExistingPurchase = async (
  sessionId: string,
): Promise<
  Readonly<
    | {
        isPurchase: true
        isSuccess: boolean
      }
    | {
        isPurchase: false
        isSuccess: boolean
      }
  >
> => {
  const session = await stripe.checkout.sessions.retrieve(sessionId)

  if (!session) {
    return {
      isPurchase: false,
      isSuccess: false,
    }
  }

  if (!(session.client_reference_id && session.metadata)) {
    return {
      isPurchase: false,
      isSuccess: false,
    }
  }

  const existingPurchase = await prisma.purchase.findUnique({
    where: {
      // biome-ignore lint/style/useNamingConvention: For DB definition
      userId_bookId: {
        userId: session.client_reference_id,
        bookId: session.metadata.bookId,
      },
    },
  })

  if (existingPurchase) {
    return {
      isPurchase: true,
      isSuccess: false,
    }
  }

  return { isPurchase: false, isSuccess: true }
}
