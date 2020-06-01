import { IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import moment from 'moment'
import React, { useMemo } from 'react'
import {
  CalendarDayActions,
  CalendarDayForm,
  CalendarDayTitle,
} from '../../components/calendar/CalendarDay'
import { FieldFactory } from '../../components/form/FieldFactory'
import { UseForm } from '../../components/form/FormHook'
import { FetchProcess, SubmitProcess } from '../../components/form/FormTypes'
import { WorkedDay } from '../../shared/collections'
import { WorkedDayFormConfig } from './form'
import { UpdateWorkDayProcess } from './types'

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
  const { date } = workedDay
  const formattedDate = useMemo(() => moment(date).format('ddd D'), [date])

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
    context: { fields, dirty },
  } = state

  return (
    <React.Fragment>
      <CalendarDayTitle>{formattedDate}</CalendarDayTitle>
      <CalendarDayActions>
        <IconButton size="small" onClick={submit}>
          {dirty && <EditIcon />}
        </IconButton>
      </CalendarDayActions>
      <CalendarDayForm>
        <FieldFactory id="workedHours" fields={fields} onChange={updateField} />
      </CalendarDayForm>
    </React.Fragment>
  )
}
