import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, useHistory } from 'react-router-dom'
import { DEFAULT_PROVIDER, FIREBASE } from '../shared/firebase.config'
import { Box } from '@material-ui/core'
import Button from '@material-ui/core/Button'

export const Navbar: React.FC = () => {
  const history = useHistory()
  const [user, initialising, error] = useAuthState(FIREBASE.auth())
  const login = () => {
    history.push('/')
    FIREBASE.auth().signInWithPopup(DEFAULT_PROVIDER)
  }
  const logout = () => {
    FIREBASE.auth().signOut()
  }

  if (initialising) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    )
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    )
  }
  return (
    <div >
      <Box>
        {user ? <span>Current User: {user.email}</span> : null}
      </Box>
      <Box>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/client">Client</Link>
        <Link to="/timesheet">Timesheet</Link>
        {user ? (
          <Button onClick={logout}>Log out</Button>
        ) : (
          <Button onClick={login}>Log in</Button>
        )}
      </Box>
    </div>
  )
}
