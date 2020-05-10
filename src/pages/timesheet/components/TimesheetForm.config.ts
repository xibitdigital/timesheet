import {
  FieldConfigObject,
  FieldType,
} from '../../../components/form/FormTypes'
import { requiredValidator } from '../../../components/form/Validators'
import { TimeSheet, COLLECTIONS } from '../../../shared/collections'
import { FIRESTORE } from '../../../shared/firebase.config'

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
