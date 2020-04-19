import { auth0Client, auth0Env } from './config'

export const handleAuthentication = () =>
  new Promise((resolve, reject) => {
    // eslint-disable-next-line consistent-return
    auth0Client.parseHash((err: any, authResult: any) => {
      if (err) return reject(err)
      if (!authResult || !authResult.idToken) {
        return reject(err)
      }
      const { idToken } = authResult
      const profile = authResult.idTokenPayload
      // set the time that the id token will expire at
      const expiresAt = authResult.idTokenPayload.exp * 1000
      resolve({
        authenticated: true,
        idToken,
        profile,
        expiresAt,
      })
    })
  })

export const signIn = () => auth0Client.authorize()

export const signOut = () =>
  auth0Client.logout({
    returnTo: 'http://localhost:3000',
    clientID: auth0Env.clientID,
  })
