import { Button, Form, FormField, Box, TextInput } from 'grommet'
import React from 'react'
import { Client } from '../../shared/collections'
// import { useCollectionData } from 'react-firebase-hooks/firestore'
// import { Client } from '../../shared/collections'
// import { COLLECTIONS, FIRESTORE } from '../../shared/firebase.config'
// import { BackButton } from '../../components/BackButton'

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
}: ClientFormProps) => {
  const [formValues, setFormValues] = React.useState({})

  function handleFormChange(nextValue: React.FormEvent<Element>) {
    console.log('Change', nextValue)
    setFormValues(nextValue)
  }

  function handleFormSubmit(evt: React.FormEvent<Element>) {
    console.log('Submit')
    addClient(formValues)
    evt.preventDefault()
  }

  function handleFormReset(nextValue: React.FormEvent<Element>) {
    console.log('Reset', nextValue)
    setFormValues(defaultFormValues)
  }
  return (
    <Form
      value={formValues}
      onChange={handleFormChange}
      onReset={handleFormReset}
      onSubmit={handleFormSubmit}
    >
      <FormField name="name" label="Name">
        <TextInput name="name" />
      </FormField>
      <FormField name="fullAddress" label="Full Address">
        <TextInput name="fullAddress" />
      </FormField>
      <FormField name="postcode" label="Postcode">
        <TextInput name="postcode" />
      </FormField>
      <Box direction="row" gap="medium">
        <Button type="submit" primary label="Submit" />
        <Button type="reset" label="Reset" />
      </Box>
    </Form>
  )
}
