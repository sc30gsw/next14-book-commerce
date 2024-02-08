'use server'

import { prisma } from '@/libs/db'
import { handleError } from '@/libs/utils'
import { ActionsResult } from '@/types/ActionResult'
import {
  SignUpFormInput,
  signUpFromSchema,
} from '@/types/schemas/SignUpFormInput'
import bcrypt from 'bcryptjs'

export const signUp = async (data: SignUpFormInput): Promise<ActionsResult> => {
  const result = signUpFromSchema.safeParse(data)

  if (!result.success) {
    return {
      isSuccess: false,
      error: {
        message: result.error.message,
      },
    }
  }

  const { name, email, password } = data

  try {
    const hashedPassword = await bcrypt.hash(password, 12)

    const existsUser = await prisma.user.findUnique({ where: { email } })

    if (existsUser) {
      return {
        isSuccess: false,
        error: {
          message: 'このメールアドレスは既に登録されています',
        },
      }
    }

    await prisma.user.create({
      data: { name, email, hashedPassword, emailVerified: new Date() },
    })

    return {
      isSuccess: true,
      message: '登録に成功しました',
    }
  } catch (error) {
    handleError(error)

    return {
      isSuccess: false,
      error: {
        message: '登録に失敗しました',
      },
    }
  }
}
