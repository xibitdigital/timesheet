import { Box, Button, Form, FormField, TextInput } from 'grommet'
import React from 'react'
import { TimeSheet } from '../../../shared/collections'

const defaultFormValues: TimeSheet = {
  clientId: '',
  projectId: '',
  month: '',
  year: '',
  workedDays: []
}

interface TimesheetFormProps {
  AddTimesheet: (newTimesheet: Partial<TimeSheet>) => void
}

export const TimesheetForm: React.FC<TimesheetFormProps> = ({
  AddTimesheet,
}: TimesheetFormProps) => {
  const [formValues, setFormValues] = React.useState({})

  function handleFormChange(nextValue: React.FormEvent<Element>) {
    console.log('Change', nextValue)
    setFormValues(nextValue)
  }

  function handleFormSubmit(evt: React.FormEvent<Element>) {
    console.log('Submit')
    AddTimesheet(formValues)
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
