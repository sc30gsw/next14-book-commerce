import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z
    .string()
    .email('メールアドレスは必須入力です')
    .max(128, 'メールアドレスは128文字以下で入力してください'),
  password: z
    .string()
    .min(8, 'パスワードは8文字以上で入力してくだい')
    .max(128, 'パスワードは128文字以下で入力してください')
    .refine(
      (password: string) => /[A-Za-z]/.test(password) && /[0-9]/.test(password),
      'パスワードは半角英数字の両方を含めてください',
    ),
})

export type LoginFormInput = z.infer<typeof loginFormSchema>
