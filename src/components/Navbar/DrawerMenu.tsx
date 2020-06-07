import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import React, { Fragment } from 'react'
import { NavBarMenuItem, RouteAction } from './types'

interface DrawerMenuProps {
  menuId: string
  icon: React.ReactNode
  menus: NavBarMenuItem[]
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({
  menuId,
  menus,
  icon,
}: DrawerMenuProps): JSX.Element => {
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const handleGoTo = (action: RouteAction) => () => {
    action()
    toggleDrawer()
  }

  return (
    <Fragment>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer}
      >
        {icon}
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <List>
          {menus.map(({ title, action, icon: listIcon }) => (
            <ListItem key={title} onClick={handleGoTo(action)} button>
              <ListItemIcon>{listIcon}</ListItemIcon>
              <ListItemText primary={title} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Fragment>
  )
}

export default DrawerMenu
