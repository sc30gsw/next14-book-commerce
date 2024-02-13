'use client'

import React, { FC, ReactNode } from 'react'

import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { tv } from 'tailwind-variants'

const navigation = tv({
  slots: {
    base: 'justify-between p-4',
    title: 'text-xl font-bold',
    linkWrapper: 'gap-1',
    link: 'text-gray-300 px-3 py-2 rounded-md text-sm font-medium hover:text-white',
  },
  compoundSlots: [
    {
      slots: ['base', 'linkWrapper'],
      class: 'flex items-center',
    },
  ],
})

type NavigationProps = Readonly<{
  session?: Session | null
  children?: ReactNode
}>

export const Navigation: FC<NavigationProps> = ({ session, children }) => {
  const { base, title, linkWrapper, link } = navigation()

  return (
    <nav className={base()}>
      <Link href={'/'} className={title()}>
        Book Commerce
      </Link>
      <div className={linkWrapper()}>
        <Link href={session?.user ? '/profile' : '/'} className={link()}>
          {session?.user?.name || 'ホーム'}
        </Link>
        {session?.user ? (
          <button
            type="button"
            className={link()}
            onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
          >
            ログアウト
          </button>
        ) : (
          <Link href={'/login'} className={link()}>
            ログイン
          </Link>
        )}
        <Link href={'/profile'}>{children}</Link>
      </div>
    </nav>
  )
}
