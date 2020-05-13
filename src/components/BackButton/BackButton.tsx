import Button from '@material-ui/core/Button'
import React from 'react'
import { useHistory } from 'react-router-dom'

interface BackButtonProps {
  to?: string
}

export const BackButton: React.FC<BackButtonProps> = ({
  to = '/',
}: BackButtonProps) => {
  const history = useHistory()
  const handleOnButtonClick = () => history.push(to)

  return (
    <Button type="button" onClick={handleOnButtonClick}>
      Go back
    </Button>
  )
}
