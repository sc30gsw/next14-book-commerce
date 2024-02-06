'use client'

import React, { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { FaGithub } from 'react-icons/fa'
import { tv } from 'tailwind-variants'
import {
  SignUpFormInput,
  signUpFromSchema,
} from '../../schemas/SignUpFormInput'
import { Button } from '../Button'
import { Input } from '../Input'

const signUpForm = tv({
  slots: {
    base: 'flex flex-col gap-4 justify-center items-center',
    linkWrapper: 'text-right',
    link: 'text-blue-500 hover:underline hover:brightness-125',
  },
})

export const SignUpForm = () => {
  const { base, linkWrapper, link } = signUpForm()

  const [isLoading, setIsLoading] = useState(false)

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<SignUpFormInput>({
    resolver: zodResolver(signUpFromSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  const onSubmit = () => {}
  return (
    <>
      <form className={base()} onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="name"
          type="text"
          name="name"
          control={control}
          error={errors.name?.message}
          label="ユーザー名"
          placeholder="Name"
          disabled={isSubmitting}
        />
        <Input
          id="email"
          type="email"
          name="email"
          control={control}
          error={errors.email?.message}
          label="メールアドレス"
          placeholder="Email"
          disabled={isSubmitting}
        />
        <Input
          id="password"
          type="password"
          name="password"
          control={control}
          error={errors.password?.message}
          label="パスワード"
          placeholder="Password"
          disabled={isSubmitting}
        />
        <Input
          id="passwordConfirmation"
          type="password"
          name="passwordConfirmation"
          control={control}
          error={errors.passwordConfirmation?.message}
          label="確認用パスワード"
          placeholder="PasswordConfirmation"
          disabled={isSubmitting}
        />
        <div className="w-full mt-4 space-y-4">
          <Button type="submit" text="新規登録" disabled={isSubmitting} />
          <Button
            type="button"
            icon={FaGithub}
            text="Githubでログイン"
            disabled={isLoading}
            color="secondary"
          />
        </div>
      </form>
      <div className={linkWrapper()}>
        <Link href="/login" className={link()}>
          既にアカウントをお持ちの方はこちら
        </Link>
      </div>
    </>
  )
}
