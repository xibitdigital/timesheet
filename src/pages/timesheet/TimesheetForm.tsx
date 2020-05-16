import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import React from 'react'
import { FieldFactory } from '../../components/form/FieldFactory'
import { UseForm } from '../../components/form/FormHook'
import { FetchProcess, SubmitProcess } from '../../components/form/FormTypes'
import { TimeSheet } from '../../shared/collections'
import { TimesheetFormConfig } from './TimesheetForm.config'
import { WorkedDayPage } from '../workedday'
import Divider from '@material-ui/core/Divider'
interface TimesheetFormProps {
  documentId: string
  loadData: FetchProcess<TimeSheet>
  saveData: SubmitProcess<TimeSheet>
}

export const TimesheetForm: React.FC<TimesheetFormProps> = ({
  documentId,
  loadData,
  saveData,
}: TimesheetFormProps): JSX.Element => {
  const { state, submit, reset, updateField } = UseForm<TimeSheet>(
    TimesheetFormConfig,
    saveData,
    loadData
  )

  const {
    context: { fields },
  } = state

  return (
    <React.Fragment>
      <FieldFactory id="name" fields={fields} onChange={updateField} />
      <FieldFactory id="clientId" fields={fields} onChange={updateField} />
      <FieldFactory id="projectId" fields={fields} onChange={updateField} />
      <FieldFactory id="month" fields={fields} onChange={updateField} />
      <FieldFactory id="year" fields={fields} onChange={updateField} />
      <Box>
        <Button type="submit" color="primary" onClick={submit}>
          Submit
        </Button>
        <Button type="reset" onClick={reset}>
          Reset
        </Button>
      </Box>
      <Divider light />
      <WorkedDayPage timesheetId={documentId}></WorkedDayPage>
    </React.Fragment>
  )
}
