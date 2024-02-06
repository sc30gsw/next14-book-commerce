'use client'

import React, { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { FaGithub } from 'react-icons/fa'
import { tv } from 'tailwind-variants'
import { LoginFormInput, loginFormSchema } from '../../schemas/LoginFormInput'
import { Button } from '../Button'
import { Input } from '../Input'

const loginForm = tv({
  slots: {
    base: 'flex flex-col gap-4 justify-center items-center',
    linkWrapper: 'text-right',
    link: 'text-blue-500 hover:underline hover:brightness-125',
  },
})

export const LoginForm = () => {
  const { base, linkWrapper, link } = loginForm()

  const [isLoading, setIsLoading] = useState(false)

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = () => {}

  return (
    <>
      <form className={base()} onSubmit={handleSubmit(onSubmit)}>
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
        <div className="w-full mt-4 space-y-4">
          <Button type="submit" text="ログイン" disabled={isSubmitting} />
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
        <Link href="/signUp" className={link()}>
          アカウントをお持ちでない方はこちら
        </Link>
      </div>
    </>
  )
}
