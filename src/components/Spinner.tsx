import React, { FC } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const spinner = tv({
  slots: {
    base: 'h-full py-16 flex justify-center',
    loader: 'h-14 w-14 animate-spin rounded-full border-4',
  },
  variants: {
    color: {
      primary: { loader: 'border-blue-500 border-t-transparent' },
      indigo: { loader: 'border-indigo-500 border-t-transparent' },
    },
  },
  defaultVariants: {
    color: 'primary',
  },
})

export const Spinner: FC<Readonly<VariantProps<typeof spinner>>> = ({
  color,
}) => {
  const { base, loader } = spinner({ color })

  return (
    <div className={base()}>
      <div className={loader()} />
    </div>
  )
}
