import { prisma } from '@/libs/db'
import { handleError } from '@/libs/utils'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (
  req: NextRequest,
  { params }: { params: { userId: string } },
) => {
  try {
    if (req.method !== 'GET') {
      return NextResponse.json({ status: 400, message: 'Bad Request' })
    }

    if (!params.userId) {
      return NextResponse.json({ status: 400, message: 'Bad Request' })
    }

    const purchases = await prisma.purchase.findMany({
      where: { userId: params.userId },
      include: { user: true },
    })

    return NextResponse.json({ status: 200, purchases })
  } catch (error) {
    handleError(error)
    return NextResponse.json({ status: 500, message: 'Something Went Wrong' })
  }
}
