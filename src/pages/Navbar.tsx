import { Anchor, Box, Button, Header, Text } from 'grommet'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link } from 'react-router-dom'
import { DEFAULT_PROVIDER, FIREBASE } from '../shared/firebase.config'

export const Navbar = () => {
  const [user, initialising, error] = useAuthState(FIREBASE.auth())
  const login = () => {
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
    <Header background="brand">
      <Box direction="row" align="center" gap="small">
        {user ? <Text>Current User: {user.email}</Text> : null}
      </Box>
      <Box direction="row"  gap="medium" align="center" pad="medium">
        <Anchor><Link to="/">Home</Link></Anchor>
        <Anchor><Link to="/about">About</Link></Anchor>
        {user ? (
          <Button onClick={logout} label="Log out" />
        ) : (
          <Button onClick={login} label="Log In" />
        )}
      </Box>
    </Header>
  )
}
