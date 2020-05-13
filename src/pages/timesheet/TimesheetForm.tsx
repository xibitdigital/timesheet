import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import React from 'react'
import { FieldFactory } from '../../components/form/FieldFactory'
import { UseForm } from '../../components/form/FormHook'
import { FetchProcess, SubmitProcess } from '../../components/form/FormTypes'
import { TimeSheet } from '../../shared/collections'
import { DefaultFormValues, TimesheetFormConfig } from './TimesheetForm.config'
interface TimesheetFormProps {
  loadData: FetchProcess<TimeSheet>
  saveData: SubmitProcess<TimeSheet>
}

export const TimesheetForm: React.FC<TimesheetFormProps> = ({
  loadData,
  saveData,
}: TimesheetFormProps): JSX.Element => {
  const { state, submit, reset, updateField } = UseForm<TimeSheet>(
    TimesheetFormConfig,
    DefaultFormValues,
    saveData,
    loadData
  )

  const {
    context: { fields },
  } = state

  return (
    <React.Fragment>
      <FieldFactory
        id="name"
        fields={fields}
        config={TimesheetFormConfig}
        onChange={updateField}
      />
      <FieldFactory
        id="clientId"
        fields={fields}
        config={TimesheetFormConfig}
        onChange={updateField}
      />
      <FieldFactory
        id="projectId"
        fields={fields}
        config={TimesheetFormConfig}
        onChange={updateField}
      />
      <FieldFactory
        id="month"
        fields={fields}
        config={TimesheetFormConfig}
        onChange={updateField}
      />
      <FieldFactory
        id="year"
        fields={fields}
        config={TimesheetFormConfig}
        onChange={updateField}
      />
      <Box>
        <Button type="submit" color="primary" onClick={submit}>
          Submit
        </Button>
        <Button type="reset" onClick={reset}>
          Reset
        </Button>
      </Box>
    </React.Fragment>
  )
}
