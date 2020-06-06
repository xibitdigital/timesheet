import {
  createStyles,
  makeStyles,
  Modal,
  Theme,
  Typography,
  Box,
} from '@material-ui/core'
import React from 'react'

interface ModalPanelProps {
  open: boolean
  children: React.ReactElement
  title: string
  description: string
  onClose: () => void
}

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    maxWidth: '50vw',
    maxHeight: '50vh',
    transform: `translate(-${top}%, -${left}%)`,
    overflow: 'auto',
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
)

export const ModalPanel: React.FC<ModalPanelProps> = ({
  title,
  description,
  open = false,
  children,
  onClose,
}: ModalPanelProps) => {
  const classes = useStyles()
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle)

  const wrapper = (
    <Box style={modalStyle} className={classes.paper}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {description}
      </Typography>
      {children}
    </Box>
  )

  return (
    <Modal open={open} onClose={onClose}>
      {wrapper}
    </Modal>
  )
}
