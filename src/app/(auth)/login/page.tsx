import React from 'react'

import { LoginForm } from '@/components/form/LoginForm'
import { tv } from 'tailwind-variants'

const loginPage = tv(
  {
    slots: {
      base: 'flex items-center justify-center py-16 px-4',
      contents: 'max-w-[400px] w-full space-y-8',
      title: 'mt-6 text-center text-3xl font-extrabold text-gray-900',
    },
    variants: {
      size: {
        sm: { base: 'px-6' },
        lg: { base: 'px-8' },
      },
    },
  },
  { responsiveVariants: ['sm', 'lg'] },
)

const LoginPage = () => {
  const { base, contents, title } = loginPage({ size: { sm: 'sm', lg: 'lg' } })

  return (
    <div className={base()}>
      <div className={contents()}>
        <div>
          <h2 className={title()}>アカウントにログイン</h2>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage
