import React from 'react'
import { Box, InputLabel, Button, FormControl, Input } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { Client } from '../../../shared/collections'

const StyledFormControl = withStyles({
  root: {
    margin: 1,
    minWidth: 120,
  },
})(FormControl)

const defaultFormValues: Client = {
  name: '',
  fullAddress: '',
  postcode: '',
}

interface ClientFormProps {
  addClient: (newClient: Partial<Client>) => void
}

export const ClientForm: React.FC<ClientFormProps> = ({
  addClient,
}: ClientFormProps): JSX.Element => {
  const [formValues, setFormValues] = React.useState(defaultFormValues)

  function handleFormChange(evt: React.FormEvent<HTMLFormElement>): void {
    const { name, value } = evt.target as any
    setFormValues({ ...formValues, [name]: value })
  }

  function handleFormSubmit(evt: React.FormEvent<HTMLFormElement>): void {
    addClient(formValues)
    evt.preventDefault()
  }

  function handleFormReset(): void {
    setFormValues(defaultFormValues)
  }

  return (
    <form
      noValidate
      autoComplete="off"
      onChange={handleFormChange}
      onReset={handleFormReset}
      onSubmit={handleFormSubmit}
    >
      <StyledFormControl>
        <InputLabel htmlFor="name">Name</InputLabel>
        <Input
          id="name"
          name="name"
          aria-describedby="Insert client name"
          defaultValue={formValues.name}
        />
      </StyledFormControl>
      <StyledFormControl>
        <InputLabel htmlFor="fullAddress">Full Address</InputLabel>
        <Input
          id="fullAddress"
          name="fullAddress"
          aria-describedby="Insert client full address"
          defaultValue={formValues.fullAddress}
        />
      </StyledFormControl>
      <StyledFormControl>
        <InputLabel htmlFor="postcode">Postcode</InputLabel>
        <Input
          id="postcode"
          name="postcode"
          aria-describedby="Insert client postcode"
          defaultValue={formValues.postcode}
        />
      </StyledFormControl>
      <Box>
        <Button type="submit" color="primary">
          Submit
        </Button>
        <Button type="reset">Reset</Button>
      </Box>
    </form>
  )
}
