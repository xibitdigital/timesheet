import React from 'react'
import { Modal } from '@material-ui/core'

interface ModalPanelProps {
  isOpen: boolean
  body: React.ReactElement
}

export const ModalPanel: React.FC<ModalPanelProps> = ({
  isOpen = false,
  body,
}: ModalPanelProps) => {
  const [open, setOpen] = React.useState(isOpen)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Modal open={open} onClose={handleClose}>
      {body}
    </Modal>
  )
}
