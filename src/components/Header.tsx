import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { tv } from 'tailwind-variants'

const header = tv({
  slots: {
    base: 'bg-slate-600 text-gray-100 shadow-lg',
    navigation: 'justify-between p-4',
    title: 'text-xl font-bold',
    linkWrapper: 'gap-1',
    link: 'text-gray-300 px-3 py-2 rounded-md text-sm font-medium hover:text-white',
  },
  compoundSlots: [
    {
      slots: ['navigation', 'linkWrapper'],
      class: 'flex items-center',
    },
  ],
})

export const Header = () => {
  const { base, navigation, title, linkWrapper, link } = header()

  return (
    <header className={base()}>
      <nav className={navigation()}>
        <Link href={'/'} className={title()}>
          Book Commerce
        </Link>
        <div className={linkWrapper()}>
          <Link href="/" className={link()}>
            ホーム
          </Link>
          <Link href={'/profile'} className={link()}>
            ログイン
          </Link>

          {/* <Link
            href={'/api/auth/signout?callbackUrl=/'}
            className={link()}
          >
            ログアウト
          </Link> */}
          <Link href={'/profile'}>
            <Image
              width={50}
              height={50}
              alt="profile_icon"
              src={'/default_icon.png'}
            />
          </Link>
        </div>
      </nav>
    </header>
  )
}
