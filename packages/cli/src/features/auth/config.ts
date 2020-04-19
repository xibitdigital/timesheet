import auth0 from 'auth0-js'

export const auth0Env = {
  domain: `${process.env.AUTH0_ISSUER}`,
  clientID: `${process.env.AUTH0_AUDIENCE}`,
}

export const auth0Client = new auth0.WebAuth({
  // the following three lines MUST be updated
  domain: auth0Env.domain,
  audience: `https://${auth0Env.domain}/userinfo`,
  clientID: `${auth0Env.clientID}`,
  redirectUri: 'http://localhost:3000/callback',
  responseType: 'id_token',
  scope: 'openid profile email',
})
