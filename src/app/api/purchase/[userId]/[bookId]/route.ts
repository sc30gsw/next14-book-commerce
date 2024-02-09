import { prisma } from '@/libs/db'
import { handleError } from '@/libs/utils'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (
  req: NextRequest,
  { params }: { params: { userId: string; bookId: string } },
) => {
  try {
    if (req.method !== 'GET') {
      return NextResponse.json({ status: 400, message: 'Bad Request' })
    }

    const query = {
      userId: '',
      bookId: '',
    } satisfies Record<'userId' | 'bookId', string>

    const { userId, bookId } = params

    if (!(userId && bookId)) {
      return NextResponse.json({ status: 400, message: 'Bad Request' })
    }

    query.userId = userId
    query.bookId = bookId

    const purchase = await prisma.purchase.findUnique({
      // biome-ignore lint/style/useNamingConvention: For DB definition
      where: { userId_bookId: query },
    })

    return NextResponse.json({ status: 200, purchase })
  } catch (error) {
    handleError(error)
    return NextResponse.json({ status: 500, message: 'Something Went Wrong' })
  }
}
