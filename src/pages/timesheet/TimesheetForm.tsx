import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import React from 'react'
import { FieldFactory } from '../../components/Form/FieldFactory'
import { UseForm } from '../../components/Form/FormHook'
import { FetchProcess, SubmitProcess } from '../../components/Form/FormTypes'
import { TimeSheet } from '../../shared/collections'
import { TimesheetFormConfig } from './TimesheetForm.config'
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
      {/* <div>
        {fields.workedDays.map((workedDay)=> {
          <div>{workedDay.}</div>
        })}
      </div> */}
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
