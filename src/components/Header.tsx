import { authOptions } from '@/libs/authOptions'
import { getServerSession } from 'next-auth'
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
    image: 'rounded-full',
  },
  compoundSlots: [
    {
      slots: ['navigation', 'linkWrapper'],
      class: 'flex items-center',
    },
  ],
})

export const Header = async () => {
  const { base, navigation, title, linkWrapper, link, image } = header()

  const session = await getServerSession(authOptions)

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
          {session?.user ? (
            <Link href={'/profile'} className={link()}>
              {session.user.name}
            </Link>
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
