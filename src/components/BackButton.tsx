import { Button } from 'grommet'
import React from 'react'
import { useHistory } from 'react-router-dom'

export const BackButton: React.FC = () => {
  const history = useHistory()

  return (
    <Button type="button" label="Go back" onClick={() => history.push('/')} />
  )
}
