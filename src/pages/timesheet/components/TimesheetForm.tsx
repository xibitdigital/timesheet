import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import React from 'react'
import {
  FieldConfigObject,
  FieldType,
  SubmitProcess,
} from '../../../components/form/FormTypes'
import { requiredValidator } from '../../../components/form/Validators'
import { TimeSheet } from '../../../shared/collections'
import { COLLECTIONS, FIRESTORE } from '../../../shared/firebase.config'

const defaultFormValues: TimeSheet = {
  clientId: '',
  projectId: '',
  month: '',
  year: '',
  workedDays: [],
}
interface ClientFormProps {
  addClient: SubmitProcess
}

const ClientFormConfig: FieldConfigObject<Omit<TimeSheet, 'workedDays'>> = {
  id: {
    // this should be removed
    fieldType: FieldType.NONE,
    label: '',
    id: 'id',
    validators: [],
  },
  clientId: {
    fieldType: FieldType.SELECT,
    label: 'clientId',
    id: 'clientId',
    firestore: FIRESTORE,
    collection: COLLECTIONS.CLIENT,
    validators: [requiredValidator],
  },
  projectId: {
    fieldType: FieldType.SELECT,
    label: 'projectId',
    id: 'projectId',
    firestore: FIRESTORE,
    collection: COLLECTIONS.PROJECT,
    validators: [requiredValidator],
  },
  month: {
    fieldType: FieldType.TEXT,
    label: 'Month',
    id: 'month',
    validators: [requiredValidator],
  },
  year: {
    fieldType: FieldType.TEXT,
    label: 'Post Code',
    id: 'year',
    validators: [requiredValidator],
  },
}

interface TimesheetFormProps {
  AddTimesheet: (newTimesheet: Partial<TimeSheet>) => void
}

export const TimesheetForm: React.FC<TimesheetFormProps> = ({
  AddTimesheet,
}: TimesheetFormProps): JSX.Element => {
  const [formValues, setFormValues] = React.useState({})

  return (
    <form>
      <Box>
        <Button type="submit">Submit</Button>
        <Button type="reset">Reset</Button>
      </Box>
    </form>
  )
}
