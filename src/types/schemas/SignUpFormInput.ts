import { z } from 'zod'

export const signUpFromSchema = z
  .object({
    name: z
      .string()
      .min(1, 'ユーザー名は必須入力です')
      .max(128, 'ユーザー名は128文字以下で入力してください'),
    email: z
      .string()
      .email('メールアドレスは必須入力です')
      .max(128, 'メールアドレスは128文字以下で入力してください'),
    password: z
      .string()
      .min(8, 'パスワードは8文字以上で入力してくだい')
      .max(128, 'パスワードは128文字以下で入力してください')
      .refine(
        (password: string) =>
          /[A-Za-z]/.test(password) && /[0-9]/.test(password),
        'パスワードは半角英数字の両方を含めてください',
      ),
    passwordConfirmation: z
      .string()
      .min(8, '確認用パスワードは8文字以上で入力してくだい')
      .max(128, '確認用パスワードは128文字以下で入力してください')
      .refine(
        (passwordConfirmation: string) =>
          /[A-Za-z]/.test(passwordConfirmation) &&
          /[0-9]/.test(passwordConfirmation),
        '確認用パスワードは半角英数字の両方を含めてください',
      ),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'パスワードが一致しません',
    path: ['passwordConfirmation'],
  })

export type SignUpFormInput = z.infer<typeof signUpFromSchema>
