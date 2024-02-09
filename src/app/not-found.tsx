'use client'

import React from 'react'

import { ErrorState } from '@/components/ErrorState'
import { useRouter } from 'next/navigation'

const NotFound = () => {
  const router = useRouter()

  return (
    <ErrorState
      title="404"
      subtitle="This page doesn't found"
      onClick={() => router.push('/')}
    />
  )
}

export default NotFound
