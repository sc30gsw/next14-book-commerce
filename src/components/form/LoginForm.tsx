'use client'

import React, { useTransition } from 'react'

import { useProviderSignIn } from '@/hooks/useProviderSignIn'
import { handleError } from '@/libs/utils'
import { LoginFormInput, loginFormSchema } from '@/types/schemas/LoginFormInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaGithub } from 'react-icons/fa'
import { IoMdSend } from 'react-icons/io'
import { tv } from 'tailwind-variants'
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

  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const { isLoading, providerSignIn } = useProviderSignIn()

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit: SubmitHandler<LoginFormInput> = (data) => {
    startTransition(async () => {
      const result = loginFormSchema.safeParse(data)

      if (!result.success) {
        toast.error(result.error.message)
        return
      }

      const { email, password } = data
      try {
        const res = await signIn('credentials', {
          email,
          password,
          redirect: false,
          callbackUrl: '/',
        })

        if (!res?.ok) {
          toast.error(res?.error || 'ログインに失敗しました')
          return
        }

        toast.success('ログインに成功しました')
        reset()
        router.push('/')
      } catch (error) {
        handleError(error)

        toast.error('ログインに失敗しました')
      }
    })
  }

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
          disabled={isPending || isLoading}
        />
        <Input
          id="password"
          type="password"
          name="password"
          control={control}
          error={errors.password?.message}
          label="パスワード"
          placeholder="Password"
          disabled={isPending || isLoading}
        />
        <div className="w-full mt-4 space-y-4">
          <Button
            type="submit"
            submitIcon={IoMdSend}
            text="ログイン"
            disabled={isPending || isLoading}
            m="l"
            loading={isPending || isLoading}
          />
          <Button
            type="button"
            icon={FaGithub}
            text="Githubでログイン"
            disabled={isPending || isLoading}
            onClick={() => providerSignIn('github')}
            color="secondary"
            m="r"
            loading={isPending || isLoading}
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
