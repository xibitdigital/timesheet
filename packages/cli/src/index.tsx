import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { RedirectLoginResult } from '@auth0/auth0-spa-js'
import store from './store'
import './index.css'
import App from './App'
import { Auth0Provider } from './shared/auth-spa'
import history from './shared/history'

// A function that routes the user to the right place
// after login
const onRedirectCallback = (results: RedirectLoginResult) => {
  const { appState } = results
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  )
}

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN || ''}
    client_id={process.env.REACT_APP_CLIENT_ID || ''}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>,
  document.getElementById('root')
)
