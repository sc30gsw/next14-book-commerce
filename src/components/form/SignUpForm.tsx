'use client'

import React, { useTransition } from 'react'

import { signUp } from '@/actions/signUp'
import { useProviderSignIn } from '@/hooks/useProviderSignIn'
import {
  SignUpFormInput,
  signUpFromSchema,
} from '@/types/schemas/SignUpFormInput'
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

const signUpForm = tv({
  slots: {
    base: 'flex flex-col gap-4 justify-center items-center',
    linkWrapper: 'text-right',
    link: 'text-blue-500 hover:underline hover:brightness-125',
  },
})

export const SignUpForm = () => {
  const { base, linkWrapper, link } = signUpForm()

  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const { isLoading, providerSignIn } = useProviderSignIn()

  const {
    handleSubmit,
    control,
    formState: { errors },
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

  const onSubmit: SubmitHandler<SignUpFormInput> = (data) => {
    startTransition(async () => {
      const result = await signUp(data)

      if (!result.isSuccess) {
        toast.error(result.error.message)
        return
      }

      toast.success(result.message)

      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: '/',
      })

      reset()
      router.refresh()
    })
  }

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
          disabled={isPending || isLoading}
        />
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
        <Input
          id="passwordConfirmation"
          type="password"
          name="passwordConfirmation"
          control={control}
          error={errors.passwordConfirmation?.message}
          label="確認用パスワード"
          placeholder="PasswordConfirmation"
          disabled={isPending || isLoading}
        />
        <div className="w-full mt-4 space-y-4">
          <Button
            type="submit"
            submitIcon={IoMdSend}
            text="新規登録"
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
        <Link href="/login" className={link()}>
          既にアカウントをお持ちの方はこちら
        </Link>
      </div>
    </>
  )
}
