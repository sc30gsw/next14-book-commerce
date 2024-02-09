import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextRequest } from 'next/server'
import { apiAuthPrefix, authRoutes, publicRoutes } from './constants/route'

const options = {
  callbacks: {
    authorized: async ({ req }: { req: NextRequest }) => {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_JWT_SECRET,
      })
      const { pathname } = req.nextUrl

      const isApiAuthRoutes = pathname.startsWith(apiAuthPrefix)
      const isAuthRoute = authRoutes.includes(pathname)
      const isPublicRoute = publicRoutes.includes(pathname)

      if (isApiAuthRoutes) {
        return true
      }

      // トークンが存在し、認証が必要なルートにいる場合
      if (token || isAuthRoute) {
        return true
      }

      // トークンが存在しない場合、ログインページにリダイレクト
      if (!(token || isPublicRoute)) {
        return false
      }

      // その他のケースではリクエストをそのまま進める
      return true
    },
  },
  pages: {
    signIn: '/login', // 未認証時にリダイレクトするページ
  },
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}

export default withAuth(options)
