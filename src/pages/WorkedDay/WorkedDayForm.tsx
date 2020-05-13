import { Box, Button } from '@material-ui/core'
import React from 'react'
import { FieldFactory } from '../../components/Form/FieldFactory'
import { UseForm } from '../../components/Form/FormHook'
import { FetchProcess, SubmitProcess } from '../../components/Form/FormTypes'
import { WorkedDay } from '../../shared/collections'
import { WorkedDayFormConfig } from './WorkedDayForm.config'

interface WorkedDayFormProps {
  saveData: SubmitProcess<WorkedDay>
  loadData: FetchProcess<WorkedDay>
}

export const WorkedDayForm: React.FC<WorkedDayFormProps> = ({
  saveData,
  loadData,
}: WorkedDayFormProps): JSX.Element => {
  const { state, submit, reset, updateField } = UseForm<WorkedDay>(
    WorkedDayFormConfig,
    saveData,
    loadData
  )

  const {
    context: { fields },
  } = state

  return (
    <React.Fragment>
      <FieldFactory id="day" fields={fields} onChange={updateField} />
      <FieldFactory id="time" fields={fields} onChange={updateField} />
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
