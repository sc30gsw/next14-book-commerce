import React, { ComponentProps, FC } from 'react'
import { IconType } from 'react-icons'
import { AiOutlineLoading } from 'react-icons/ai'
import { VariantProps, tv } from 'tailwind-variants'

const buttonStyles = tv({
  base: 'rounded flex items-center justify-center w-full font-bold',
  variants: {
    color: {
      primary: 'bg-blue-500 hover:bg-blue-700 text-white',
      secondary: 'bg-gray-900 hover:bg-gray-700 text-white',
    },
    disabled: {
      true: 'bg-gray-500 opacity-50 cursor-not-allowed',
    },
    size: {
      sm: 'py-2 px-4',
      md: 'py-4 px-8',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
})

const iconStyles = tv({
  variants: {
    m: {
      r: 'mr-2',
      l: 'ml-2',
    },
    loading: {
      true: 'animate-spin',
    },
  },
})

type ButtonProps = Readonly<{
  type: ComponentProps<'button'>['type']
  icon?: IconType
  submitIcon?: IconType
  text: string
  disabled?: boolean
  onClick?: ComponentProps<'button'>['onClick']
}> &
  Readonly<VariantProps<typeof buttonStyles>> &
  Readonly<VariantProps<typeof iconStyles>>

export const Button: FC<ButtonProps> = ({
  type,
  // biome-ignore lint/style/useNamingConvention: icon is a component
  icon: Icon,
  // biome-ignore lint/style/useNamingConvention: icon is a component
  submitIcon: SubmitIcon,
  text,
  disabled,
  onClick,
  color,
  size,
  m,
  loading,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={buttonStyles({ color, disabled, size })}
      onClick={onClick}
    >
      {Icon && <Icon size={24} className={iconStyles({ m })} />}
      <span>{text}</span>
      {SubmitIcon && <SubmitIcon size={24} className={iconStyles({ m })} />}
      {loading && (
        <AiOutlineLoading
          size={24}
          className={iconStyles({ m: 'l', loading })}
        />
      )}
    </button>
  )
}
