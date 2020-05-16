import { IconButton, TableCell, TableRow } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import React from 'react'
import { FieldFactory } from '../../components/form/FieldFactory'
import { UseForm } from '../../components/form/FormHook'
import { FetchProcess, SubmitProcess } from '../../components/form/FormTypes'
import { WorkedDay } from '../../shared/collections'
import { UpdateWorkDayProcess } from './workedDay.types'
import { WorkedDayFormConfig } from './WorkedDayForm.config'

interface WorkedDayFormProps {
  id: string
  workedDay: WorkedDay
  updateData: UpdateWorkDayProcess
}

export const WorkedDayForm: React.FC<WorkedDayFormProps> = ({
  id,
  workedDay,
  updateData,
}): JSX.Element => {
  const saveData: SubmitProcess<WorkedDay> = (data) => {
    return updateData(id, data)
  }

  const loadData: FetchProcess<WorkedDay> = () => {
    return Promise.resolve(workedDay)
  }

  const { state, submit, updateField } = UseForm<WorkedDay>(
    WorkedDayFormConfig,
    saveData,
    loadData
  )

  const {
    context: { fields },
  } = state

  return (
    <React.Fragment>
      <TableRow>
        <TableCell scope="row">
          <FieldFactory id="day" fields={fields} onChange={updateField} />
        </TableCell>
        <TableCell>
          <FieldFactory id="time" fields={fields} onChange={updateField} />
        </TableCell>
        <TableCell>
          <IconButton onClick={submit}>
            <EditIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}
