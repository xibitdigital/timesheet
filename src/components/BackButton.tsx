import Button from '@material-ui/core/Button'
import React from 'react'
import { useHistory } from 'react-router-dom'

export const BackButton: React.FC = () => {
  const history = useHistory()

  return (
    <Button type="button"  onClick={() => history.push('/')}>Go back</Button>
  )
}
