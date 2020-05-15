import { range } from 'ramda'
import { FieldType } from '../../components/form/FormTypes'
import { requiredValidator } from '../../components/form/Validators'
import { COLLECTIONS, TimeSheet } from '../../shared/collections'
import { FormConfig } from '../../components/form/FormTypes'

export const TimesheetFormConfig: FormConfig<TimeSheet> = [
  {
    id: 'name',
    fieldType: FieldType.TEXT,
    label: 'Name',
    validators: [requiredValidator],
    value: '',
  },
  {
    id: 'clientId',
    fieldType: FieldType.COLLECTION_SELECT,
    label: 'clientId',
    collection: COLLECTIONS.CLIENT,
    validators: [requiredValidator],
    value: '',
  },
  {
    id: 'projectId',
    fieldType: FieldType.COLLECTION_SELECT,
    label: 'projectId',
    collection: COLLECTIONS.PROJECT,
    validators: [requiredValidator],
    value: '',
  },
  {
    id: 'month',
    fieldType: FieldType.SELECT,
    label: 'Month',
    options: range(1, 12).map((i) => ({
      id: i.toString(),
      label: i.toString(),
    })), // move to utils
    validators: [requiredValidator],
    value: '',
  },
  {
    id: 'year',
    fieldType: FieldType.SELECT,
    label: 'Year',
    options: range(2019, 2050).map((i) => ({
      id: i.toString(),
      label: i.toString(),
    })), // move to utils
    validators: [requiredValidator],
    value: '',
  },
  {
    id: 'workedDays',
    fieldType: FieldType.NONE,
    label: 'Worked Days',
    validators: [],
    value: [],
  },
]
