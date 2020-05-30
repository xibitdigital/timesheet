import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import moment from 'moment'
import React, { useMemo } from 'react'
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

const useStyles = makeStyles({
  root: {},
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

export const WorkedDayForm: React.FC<WorkedDayFormProps> = ({
  id,
  workedDay,
  updateData,
}): JSX.Element => {
  const classes = useStyles()
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
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {formattedDate}
        </Typography>
        <FieldFactory id="workedHours" fields={fields} onChange={updateField} />
        <CardActions>
          <IconButton onClick={submit}>{dirty && <EditIcon />}</IconButton>
        </CardActions>
      </CardContent>
    </Card>
  )
}
