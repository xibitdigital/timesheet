import React, { useState, useEffect, useContext } from 'react'
import createAuth0Client from '@auth0/auth0-spa-js'
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client'
import {
  Auth0ClientOptions,
  RedirectLoginOptions,
  PopupLoginOptions,
  GetIdTokenClaimsOptions,
  RedirectLoginResult,
  GetTokenSilentlyOptions,
  GetTokenWithPopupOptions,
  LogoutOptions,
  IdToken,
} from '@auth0/auth0-spa-js/dist/typings'

export interface Auth0RedirectState {
  targetUrl?: string
}

export interface Auth0User extends Omit<IdToken, '__raw'> {}

interface Auth0Context {
  user?: Auth0User
  isAuthenticated: boolean
  loading: boolean
  popupOpen: boolean
  loginWithPopup(o?: PopupLoginOptions): Promise<void>
  handleRedirectCallback(): void
  getIdTokenClaims(o?: GetIdTokenClaimsOptions): Promise<IdToken>
  loginWithRedirect(o?: RedirectLoginOptions): Promise<void>
  getTokenSilently(o?: GetTokenSilentlyOptions): Promise<string | undefined>
  getTokenWithPopup(o?: GetTokenWithPopupOptions): Promise<string | undefined>
  logout(o?: LogoutOptions): void
}
interface Auth0ProviderOptions {
  children: React.ReactElement
  onRedirectCallback(result: RedirectLoginResult): void
}

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname)

export const Auth0Context = React.createContext<Auth0Context | null>(null)
export const useAuth0 = () => useContext(Auth0Context)!
export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}: Auth0ProviderOptions & Auth0ClientOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<Auth0User>()
  const [auth0Client, setAuth0] = useState<Auth0Client>()
  const [loading, setLoading] = useState(true)
  const [popupOpen, setPopupOpen] = useState(false)

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions)
      setAuth0(auth0FromHook)

      if (
        window.location.search.includes('code=') &&
        window.location.search.includes('state=')
      ) {
        const res = await auth0FromHook.handleRedirectCallback()
        onRedirectCallback(res)
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated()

      setIsAuthenticated(isAuthenticated)

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser()
        setUser(user)
      }

      setLoading(false)
    }
    initAuth0()
    // eslint-disable-next-line
  }, []) // TODO do we need deps ? [initOptions, onRedirectCallback]

  const loginWithPopup = async (options?: PopupLoginOptions) => {
    setPopupOpen(true)

    try {
      await auth0Client!.loginWithPopup(options)
    } catch (error) {
      console.error(error)
    } finally {
      setPopupOpen(false)
    }

    const user = await auth0Client!.getUser()
    setUser(user)
    setIsAuthenticated(true)
  }

  const handleRedirectCallback = async () => {
    setLoading(true)
    await auth0Client!.handleRedirectCallback()
    const user = await auth0Client!.getUser()
    setLoading(false)
    setIsAuthenticated(true)
    setUser(user)
  }

  const loginWithRedirect = (options?: RedirectLoginOptions) =>
    auth0Client!.loginWithRedirect(options)

  const getTokenSilently = (options?: GetTokenSilentlyOptions) =>
    auth0Client!.getTokenSilently(options)

  const logout = (options?: LogoutOptions) => auth0Client!.logout(options)

  const getIdTokenClaims = (options?: GetIdTokenClaimsOptions) =>
    auth0Client!.getIdTokenClaims(options)

  const getTokenWithPopup = (options?: GetTokenWithPopupOptions) =>
    auth0Client!.getTokenWithPopup(options)

  return (
    <Auth0Context.Provider
      value={{
        user,
        isAuthenticated,
        popupOpen,
        loading,
        loginWithPopup,
        loginWithRedirect,
        logout,
        getTokenSilently,
        handleRedirectCallback,
        getIdTokenClaims,
        getTokenWithPopup,
      }}
    >
      {children}
    </Auth0Context.Provider>
  )
}
