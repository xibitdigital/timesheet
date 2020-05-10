import {
  FieldConfigObject,
  FieldType,
} from '../../../components/form/FormTypes'
import { requiredValidator } from '../../../components/form/Validators'
import { TimeSheet, COLLECTIONS } from '../../../shared/collections'
import { FIRESTORE } from '../../../shared/firebase.config'
import { range } from 'ramda'

export const DefaultFormValues: TimeSheet = {
  id: '',
  clientId: '',
  projectId: '',
  month: '',
  year: '',
}

export const TimesheetFormConfig: FieldConfigObject<TimeSheet> = {
  id: {
    // this should be removed
    fieldType: FieldType.NONE,
    label: '',
    id: 'id',
    validators: [],
  },
  clientId: {
    fieldType: FieldType.COLLECTION_SELECT,
    label: 'clientId',
    id: 'clientId',
    firestore: FIRESTORE,
    collection: COLLECTIONS.CLIENT,
    validators: [requiredValidator],
  },
  projectId: {
    fieldType: FieldType.COLLECTION_SELECT,
    label: 'projectId',
    id: 'projectId',
    firestore: FIRESTORE,
    collection: COLLECTIONS.PROJECT,
    validators: [requiredValidator],
  },
  month: {
    fieldType: FieldType.SELECT,
    label: 'Month',
    id: 'month',
    options: range(1, 12).map((i) => ({
      id: i.toString(),
      label: i.toString(),
    })), // move to utils
    validators: [requiredValidator],
  },
  year: {
    fieldType: FieldType.SELECT,
    label: 'Year',
    id: 'year',
    options: range(2019, 2050).map((i) => ({
      id: i.toString(),
      label: i.toString(),
    })), // move to utils
    validators: [requiredValidator],
  },
}
