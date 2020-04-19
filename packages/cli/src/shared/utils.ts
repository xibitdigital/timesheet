import * as R from 'ramda'
import atob from 'atob'

export const objectToQuerystring = R.compose<
  Record<string, string>,
  Array<[string, string]>,
  Array<string>,
  string
>(R.join('&'), R.map(R.join('=')), R.toPairs)

export const getIdToken = () => {
  const idToken = localStorage.getItem('id_token')
  if (!idToken) {
    throw new Error('No id token found')
  }
  return idToken
}

export const getAccessToken = () => {
  const accessToken = localStorage.getItem('access_token')
  if (!accessToken) {
    throw new Error('No access token found')
  }
  return accessToken
}

export const getClaimFromToken = (token: string, claim: any) => {
  const payload = token.split('.')[1]
  const bin = atob(payload)
  const obj = JSON.parse(bin)
  return obj[claim]
}
