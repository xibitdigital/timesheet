import { AppBar, Box, FormGroup, Toolbar, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import {
  AccountCircle,
  DateRange,
  ExitToApp,
  Home,
  Menu,
  Person,
  Style,
} from '@material-ui/icons'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useHistory } from 'react-router-dom'
import { UserPage } from '../../pages/user'
import { DEFAULT_PROVIDER, FIREBASE } from '../../shared/firebase.config'
import { Routes } from '../../shared/routes'
import { ModalPanel } from '../ModalPanel'
import DrawerMenu from './DrawerMenu'
import NavBarMenu from './NavBarMenu'
import { NavBarMenuItem } from './types'

interface NavbarProps {
  title: string
}

export const Navbar: React.FC<NavbarProps> = ({
  title,
}: NavbarProps): JSX.Element => {
  const history = useHistory()
  const [user, initialising, error] = useAuthState(FIREBASE.auth())
  const [userInfoVisible, setUserInfoVisible] = useState(false)

  const login = () => {
    history.push(Routes.HOME)
    FIREBASE.auth().signInWithPopup(DEFAULT_PROVIDER)
  }
  const logout = () => {
    FIREBASE.auth().signOut()
  }

  const goToPage = (page: Routes) => () => history.push(page)

  const showModal = () => {
    setUserInfoVisible(true)
  }

  const hideModal = () => {
    setUserInfoVisible(false)
  }

  const navigationMenu: NavBarMenuItem[] = [
    { title: 'Home', action: goToPage(Routes.HOME), icon: <Home /> },
    { title: 'Clients', action: goToPage(Routes.CLIENT), icon: <Person /> },
    { title: 'Projects', action: goToPage(Routes.PROJECT), icon: <Style /> },
    {
      title: 'Timesheets',
      action: goToPage(Routes.TIMESHEET),
      icon: <DateRange />,
    },
  ]

  const userMenu: NavBarMenuItem[] = [
    { title: 'Profile', action: showModal, icon: <Person /> },
    { title: 'Logout', action: logout, icon: <ExitToApp /> },
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
        <ModalPanel
          open={userInfoVisible}
          title="User"
          description=""
          onClose={hideModal}
        >
          <UserPage user={user} />
        </ModalPanel>
        <Toolbar>
          <DrawerMenu
            menuId="menu-app-navigation"
            menus={navigationMenu}
            icon={<Menu />}
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
