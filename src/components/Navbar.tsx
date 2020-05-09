import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useHistory } from 'react-router-dom'
import { compose } from 'ramda'
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  FormGroup,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import MenuIcon from '@material-ui/icons/Menu'

import Button from '@material-ui/core/Button'
import { DEFAULT_PROVIDER, FIREBASE } from '../shared/firebase.config'

interface NavbarProps {
  title: string
}

export const Navbar: React.FC<NavbarProps> = ({
  title,
}: NavbarProps): JSX.Element => {
  const history = useHistory()
  const [user, initialising, error] = useAuthState(FIREBASE.auth())
  console.log('==========>', user)
  const [
    anchorUserMenuEl,
    setAnchorUserMenuEl,
  ] = React.useState<null | HTMLButtonElement>(null)
  const [
    anchorNavigationMenuEl,
    setAnchorNavigationMenuEl,
  ] = React.useState<null | HTMLButtonElement>(null)

  const openUserMenu = Boolean(anchorUserMenuEl)
  const openNavigationMenu = Boolean(anchorNavigationMenuEl)

  const login = () => {
    history.push('/')
    FIREBASE.auth().signInWithPopup(DEFAULT_PROVIDER)
  }
  const logout = () => {
    FIREBASE.auth().signOut()
  }

  const handleUserMenu = (
    event:
      | React.FormEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => setAnchorUserMenuEl(event.currentTarget)

  const handleNavigationMenu = (
    event:
      | React.FormEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => setAnchorNavigationMenuEl(event.currentTarget)

  const handleUserMenuClose = () => setAnchorUserMenuEl(null)
  const handleNavigationMenuClose = () => setAnchorNavigationMenuEl(null)

  const goToHome = () => history.push('/')
  const goToClientPage = () => history.push('/client')
  const goToTimesheetPage = () => history.push('/timesheet')

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
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleNavigationMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorNavigationMenuEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={openNavigationMenu}
            onClose={handleNavigationMenuClose}
          >
            <MenuItem onClick={compose(goToHome, handleNavigationMenuClose)}>
              Home
            </MenuItem>
            <MenuItem
              onClick={compose(goToClientPage, handleNavigationMenuClose)}
            >
              Clients
            </MenuItem>
            <MenuItem
              onClick={compose(goToTimesheetPage, handleNavigationMenuClose)}
            >
              Timesheets
            </MenuItem>
          </Menu>
          <Box flexGrow={1}>
            <Typography variant="h6">{title}</Typography>
          </Box>
          {user && (
            <Box>
              <Button onClick={handleUserMenu}>
                <AccountCircle />
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorUserMenuEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openUserMenu}
                onClose={handleUserMenuClose}
              >
                <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleUserMenuClose}>My account</MenuItem>
                <MenuItem onClick={compose(logout, handleNavigationMenuClose)}>
                  Log out
                </MenuItem>
              </Menu>
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
