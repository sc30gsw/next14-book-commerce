import React, { ComponentProps, FC } from 'react'
import { IconType } from 'react-icons'
import { VariantProps, tv } from 'tailwind-variants'

const buttonStyles = tv({
  base: 'rounded flex items-center justify-center w-full font-bold py-4 px-8',
  variants: {
    color: {
      primary: 'bg-blue-500 hover:bg-blue-700 text-white',
      secondary: 'bg-gray-900 hover:bg-gray-700 text-white',
    },
    disabled: {
      true: 'bg-gray-500 opacity-50 cursor-not-allowed',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
})

type ButtonProps = {
  type: ComponentProps<'button'>['type']
  icon?: IconType
  text: string
  disabled?: boolean
} & VariantProps<typeof buttonStyles>

export const Button: FC<ButtonProps> = ({
  type,
  // biome-ignore lint/style/useNamingConvention: icon is a component
  icon: Icon,
  text,
  disabled,
  color,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={buttonStyles({ color, disabled })}
    >
      {Icon && <Icon size={24} className="mr-2" />}
      <span>{text}</span>
    </button>
  )
}
