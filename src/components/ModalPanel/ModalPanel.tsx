import { createStyles, makeStyles, Modal, Theme } from '@material-ui/core'
import React from 'react'

interface ModalPanelProps {
  open: boolean
  body: React.ReactElement
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
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
)

export const ModalPanel: React.FC<ModalPanelProps> = ({
  title,
  description,
  open = false,
  body,
  onClose,
}: ModalPanelProps) => {
  const classes = useStyles()
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle)

  const wrapper = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{title}</h2>
      <p id="simple-modal-description">{description}</p>
      {body}
    </div>
  )

  return (
    <Modal open={open} onClose={onClose}>
      {wrapper}
    </Modal>
  )
}
