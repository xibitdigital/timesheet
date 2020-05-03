import { RedirectLoginResult } from '@auth0/auth0-spa-js'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
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
      <App />,
  document.getElementById('root')
)
