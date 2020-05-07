import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import React from 'react'
import { TimeSheet } from '../../../shared/collections'
import { ClientSelect } from '../../client/components/ClientSelect'

const defaultFormValues: TimeSheet = {
  clientId: '',
  projectId: '',
  month: '',
  year: '',
  workedDays: [],
}

interface TimesheetFormProps {
  AddTimesheet: (newTimesheet: Partial<TimeSheet>) => void
}

export const TimesheetForm: React.FC<TimesheetFormProps> = ({
  AddTimesheet,
}: TimesheetFormProps) => {
  const [formValues, setFormValues] = React.useState({})

  function handleFormChange(evt: React.FormEvent<HTMLFormElement>) {
    const { name, value } = evt.target as any
    setFormValues({ ...formValues, [name]: value })
  }

  function handleFormSubmit(evt: React.FormEvent<HTMLFormElement>) {
    console.log('Submit')
    AddTimesheet(formValues)
    evt.preventDefault()
  }

  function handleFormReset(nextValue: React.FormEvent<HTMLFormElement>) {
    console.log('Reset', nextValue)
    setFormValues(defaultFormValues)
  }

  function handleSelectChange(value: string) {
    setFormValues({ ...formValues, clientId: value })
  }

  return (
    <form
      onChange={handleFormChange}
      onReset={handleFormReset}
      onSubmit={handleFormSubmit}
    >
      <ClientSelect onChange={handleSelectChange} />

      <Box>
        <Button type="submit">Submit</Button>
        <Button type="reset">Reset</Button>
      </Box>
    </form>
  )
}
