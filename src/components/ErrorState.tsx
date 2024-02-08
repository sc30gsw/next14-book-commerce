import React, { FC } from 'react'

import { tv } from 'tailwind-variants'
import { Button } from './Button'

const errorState = tv({
  slots: {
    base: 'flex h-[60vh] flex-col items-center justify-center gap-2',
    contents: 'text-center',
    heading: 'text-5xl font-bold',
    text: 'mt-2 font-light text-neutral-500',
    buttonWrapper: 'mt-4 w-48',
  },
})

type ErrorStateProps = {
  title?: string
  subtitle?: string
  showReset?: boolean
  onClick: () => void
}

export const ErrorState: FC<ErrorStateProps> = ({
  title = 'Something Went Wrong',
  subtitle = 'Please try again click the button',
  showReset,
  onClick,
}) => {
  const { base, contents, heading, text, buttonWrapper } = errorState()

  return (
    <div className={base()}>
      <div className={contents()}>
        <div className={heading()}>{title}</div>
        <div className={text()}>{subtitle}</div>
      </div>
      <div className={buttonWrapper()}>
        <Button
          type="button"
          text={showReset ? 'リトライする' : 'Topへ戻る'}
          onClick={onClick}
          size="sm"
        />
      </div>
    </div>
  )
}
