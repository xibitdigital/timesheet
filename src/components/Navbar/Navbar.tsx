import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useHistory } from 'react-router-dom'
import { Box, AppBar, Toolbar, Typography, FormGroup } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import MenuIcon from '@material-ui/icons/Menu'

import Button from '@material-ui/core/Button'
import { DEFAULT_PROVIDER, FIREBASE } from '../../shared/firebase.config'
import NavBarMenu from './NavBarMenu'

interface NavbarProps {
  title: string
}

export const Navbar: React.FC<NavbarProps> = ({
  title,
}: NavbarProps): JSX.Element => {
  const history = useHistory()
  const [user, initialising, error] = useAuthState(FIREBASE.auth())

  const login = () => {
    history.push('/')
    FIREBASE.auth().signInWithPopup(DEFAULT_PROVIDER)
  }
  const logout = () => {
    FIREBASE.auth().signOut()
  }

  const goToHomePage = () => history.push('/')
  const goToClientPage = () => history.push('/client')
  const goToTimesheetPage = () => history.push('/timesheet')

  const navigationMenu = [
    { title: 'Home', action: goToHomePage },
    { title: 'Clients', action: goToClientPage },
    { title: 'Timesheets', action: goToTimesheetPage },
  ]

  const userMenu = [
    { title: 'Profile', action: () => {} },
    { title: 'My account', action: () => {} },
    { title: 'Logout', action: logout },
  ]

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
    <Box flexGrow={1}>
      <AppBar position="static">
        <Toolbar>
          <NavBarMenu
            menuId="menu-app-navigation"
            menus={navigationMenu}
            icon={<MenuIcon />}
          />
          <Box flexGrow={1}>
            <Typography variant="h6">{title}</Typography>
          </Box>
          {user && (
            <Box>
              <NavBarMenu
                menuId="menu-app-user"
                menus={userMenu}
                icon={<AccountCircle />}
              />
            </Box>
          )}
          <FormGroup>
            {!user && <Button onClick={login}>Log in</Button>}
          </FormGroup>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
