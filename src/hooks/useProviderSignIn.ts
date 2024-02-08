import { OAuthProviderType } from 'next-auth/providers/oauth-types'
import { signIn } from 'next-auth/react'
import { useCallback, useState } from 'react'

export const useProviderSignIn = () => {
  const [isLoading, setIsLoading] = useState(false)
  const providerSignIn = useCallback(async (provider: OAuthProviderType) => {
    setIsLoading(true)
    const res = await signIn(provider, { redirect: true, callbackUrl: '/' })

    if (res?.ok) {
      setIsLoading(false)
    }
  }, [])

  return { isLoading, providerSignIn }
}
