import React from 'react'

import { tv } from 'tailwind-variants'
import { SignUpForm } from '../../../components/form/SignUpForm'

const signUpPage = tv(
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

const SignUpPage = () => {
  const { base, contents, title } = signUpPage({ size: { sm: 'sm', lg: 'lg' } })

  return (
    <div className={base()}>
      <div className={contents()}>
        <div>
          <h2 className={title()}>新規登録</h2>
        </div>
        <SignUpForm />
      </div>
    </div>
  )
}

export default SignUpPage
