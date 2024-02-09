'use client'

import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import { tv } from 'tailwind-variants'

const header = tv({
  slots: {
    base: 'bg-slate-600 text-gray-100 shadow-lg',
    navigation: 'justify-between p-4',
    title: 'text-xl font-bold',
    linkWrapper: 'gap-1',
    link: 'text-gray-300 px-3 py-2 rounded-md text-sm font-medium hover:text-white',
    image: 'rounded-full',
  },
  compoundSlots: [
    {
      slots: ['navigation', 'linkWrapper'],
      class: 'flex items-center',
    },
  ],
})

type HeaderProps = Readonly<{ session?: Session | null }>

export const Header: FC<HeaderProps> = async ({ session }) => {
  const { base, navigation, title, linkWrapper, link, image } = header()

  return (
    <header className={base()}>
      <nav className={navigation()}>
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
          <Link href={'/profile'}>
            <Image
              width={50}
              height={50}
              className={image()}
              alt="profile_icon"
              src={session?.user?.image || '/default_icon.png'}
            />
          </Link>
        </div>
      </nav>
    </header>
  )
}
