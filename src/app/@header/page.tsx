import React from 'react'

import { authOptions } from '@/libs/authOptions'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { tv } from 'tailwind-variants'
import { Navigation } from '../../components/Navigation'

const header = tv({
  slots: {
    base: 'bg-slate-600 text-gray-100 shadow-lg',
    image: 'rounded-full',
  },
})

const Header = async () => {
  const { base, image } = header()
  const session = await getServerSession(authOptions)

  return (
    <header className={base()}>
      <Navigation session={session}>
        <Image
          width={50}
          height={50}
          className={image()}
          alt="profile_icon"
          src={session?.user?.image || '/default_icon.png'}
        />
      </Navigation>
    </header>
  )
}

export default Header
