import { Box, Button } from '@material-ui/core'
import React from 'react'
import { FieldFactory } from '../../components/form/FieldFactory'
import { UseForm } from '../../components/form/FormHook'
import { FetchProcess, SubmitProcess } from '../../components/form/FormTypes'
import { WorkedDay } from '../../shared/collections'
import { WorkedDayFormConfig, DefaultFormValues } from './WorkedDayForm.config'

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
        id="day"
        fields={fields}
        config={WorkedDayFormConfig}
        onChange={updateField}
      />
      <FieldFactory
        id="time"
        fields={fields}
        config={WorkedDayFormConfig}
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
