import React, { Fragment } from 'react'
import { compose } from 'ramda'
import { IconButton, Menu, MenuItem } from '@material-ui/core'

interface NavBarMenuProps {
  menuId: string
  icon: React.ReactNode
  menus: {
    title: string
    action: () => void
  }[]
}

const NavBarMenu: React.FC<NavBarMenuProps> = ({
  menuId,
  menus,
  icon,
}: NavBarMenuProps): JSX.Element => {
  const [
    anchorMenuEl,
    setAnchorMenuEl,
  ] = React.useState<null | HTMLButtonElement>(null)
  const handleMenu = (
    event:
      | React.FormEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => setAnchorMenuEl(event.currentTarget)
  const openNavigationMenu = Boolean(anchorMenuEl)
  const handleMenuClose = () => setAnchorMenuEl(null)

  return (
    <Fragment>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleMenu}
      >
        {icon}
      </IconButton>
      <Menu
        id={menuId}
        anchorEl={anchorMenuEl}
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
        onClose={handleMenuClose}
      >
        {menus.map(({ title, action }) => (
          <MenuItem onClick={compose(action, handleMenuClose)}>
            {title}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  )
}

export default NavBarMenu
