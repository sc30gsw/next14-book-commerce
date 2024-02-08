'use client'

import { FC, useEffect } from 'react'

import { ErrorState } from '@/components/ErrorState'

interface ErrorStateProps {
  error: Error
  reset: () => void
}

const ErrorPage: FC<ErrorStateProps> = ({ error, reset }) => {
  useEffect(() => {
    console.error(error)
  }, [error])

  return <ErrorState showReset={true} onClick={reset} />
}

export default ErrorPage
