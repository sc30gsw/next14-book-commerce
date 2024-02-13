'use client'

import { FC, useEffect } from 'react'

import { ErrorState } from '@/components/ErrorState'
import { authRoutes } from '@/constants/route'
import { redirect, usePathname } from 'next/navigation'

interface ErrorStateProps {
  error: Error
  reset: () => void
}

const ErrorPage: FC<ErrorStateProps> = ({ error, reset }) => {
  const pathname = usePathname()
  const isAuthRoute = authRoutes.includes(pathname)

  useEffect(() => {
    console.error(error)
  }, [error])

  if (isAuthRoute) {
    return redirect('/login')
  }

  return <ErrorState showReset={true} onClick={reset} />
}

export default ErrorPage
