import { prisma } from '@/libs/db'
import { handleError } from '@/libs/utils'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  try {
    if (req.method !== 'GET') {
      return NextResponse.json({ status: 400, message: 'Bad Request' })
    }

    const query = {
      userId: '',
      bookId: '',
    } satisfies Record<'userId' | 'bookId', string>

    const searchParam = req.nextUrl.searchParams

    const userId = searchParam.get('userId')
    const bookId = searchParam.get('bookId')

    if (!userId) {
      return NextResponse.json({ status: 400, message: 'Bad Request' })
    }

    query.userId = userId

    if (bookId) {
      query.bookId = bookId

      const purchase = await prisma.purchase.findUnique({
        // biome-ignore lint/style/useNamingConvention: For DB definition
        where: { userId_bookId: query },
      })

      return NextResponse.json({ status: 200, purchase })
    }

    const purchases = await prisma.purchase.findMany({
      where: { userId: query.userId },
      include: { user: true },
    })

    return NextResponse.json({ status: 200, purchases })
  } catch (error) {
    handleError(error)
    return NextResponse.json({ status: 500, message: 'Something Went Wrong' })
  }
}
