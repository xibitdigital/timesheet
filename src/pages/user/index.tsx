import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core'
import { Email, PermIdentity, Fingerprint } from '@material-ui/icons'
import { User } from 'firebase'
import React from 'react'

interface UserPageProps {
  user: User | undefined
}

export const UserPage: React.FC<UserPageProps> = ({
  user = null,
}): JSX.Element => {
  return user ? (
    <List>
      <ListItem>
        <ListItemIcon>
          <PermIdentity />
        </ListItemIcon>
        <ListItemText primary={user.displayName} />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Email />
        </ListItemIcon>
        <ListItemText primary={user.email} />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Fingerprint />
        </ListItemIcon>
        <ListItemText primary={user.uid} />
      </ListItem>
    </List>
  ) : (
    <Typography>Please login first</Typography>
  )
}
