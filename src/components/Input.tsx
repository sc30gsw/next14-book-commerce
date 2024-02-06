import React, { ComponentProps } from 'react'

import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { tv } from 'tailwind-variants'

const input = tv({
  slots: {
    base: 'flex flex-col w-full',
    labelText: 'cursor-pointer mb-1',
    textArea:
      'border border-zinc-400 rounded-md p-4 outline-none focus:border-zinc-600',
    errorText: 'text-red-500',
  },
  variants: {
    error: {
      true: { labelText: 'text-red-500', textArea: 'border-red-500' },
    },
  },
  compoundSlots: [{ slots: ['labelText', 'errorText'], class: 'text-left' }],
})

type InputProps<T extends FieldValues> = {
  id: string
  type: ComponentProps<'input'>['type']
  name: Path<T>
  control: Control<T>
  error?: string
  label: string
  placeholder: string
  disabled?: boolean
}

export const Input = <T extends FieldValues>({
  id,
  type,
  name,
  control,
  error,
  label,
  placeholder,
  disabled,
}: InputProps<T>) => {
  const { base, labelText, textArea, errorText } = input()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={base()}>
          <label htmlFor={id} className={labelText({ error: !!error })}>
            {label}
          </label>
          <input
            {...field}
            id={id}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            className={textArea({ error: !!error })}
          />
          {error && <span className={errorText()}>{error}</span>}
        </div>
      )}
    />
  )
}
