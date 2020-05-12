import {
  FieldConfigObject,
  FieldType,
} from '../../../components/form/FormTypes'
import { requiredValidator } from '../../../components/form/Validators'
import { TimeSheet, COLLECTIONS } from '../../../shared/collections'
import { FIRESTORE } from '../../../shared/firebase.config'
import { range } from 'ramda'

export const DefaultFormValues: TimeSheet = {
  name: '',
  clientId: '',
  projectId: '',
  month: '',
  year: '',
}

export const TimesheetFormConfig: FieldConfigObject<TimeSheet> = {
  name: {
    fieldType: FieldType.TEXT,
    label: 'Name',
    validators: [requiredValidator],
  },
  clientId: {
    fieldType: FieldType.COLLECTION_SELECT,
    label: 'clientId',
    collection: COLLECTIONS.CLIENT,
    validators: [requiredValidator],
  },
  projectId: {
    fieldType: FieldType.COLLECTION_SELECT,
    label: 'projectId',
    collection: COLLECTIONS.PROJECT,
    validators: [requiredValidator],
  },
  month: {
    fieldType: FieldType.SELECT,
    label: 'Month',
    options: range(1, 12).map((i) => ({
      id: i.toString(),
      label: i.toString(),
    })), // move to utils
    validators: [requiredValidator],
  },
  year: {
    fieldType: FieldType.SELECT,
    label: 'Year',
    options: range(2019, 2050).map((i) => ({
      id: i.toString(),
      label: i.toString(),
    })), // move to utils
    validators: [requiredValidator],
  },
}
