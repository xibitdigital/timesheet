import { FieldType } from '../../components/form/FormTypes'
import { requiredValidator } from '../../components/form/Validators'
import { WorkedDay } from '../../shared/collections'
import { FormConfig } from './../../components/form/FormTypes'

export const WorkedDayFormConfig: FormConfig<WorkedDay> = [
  {
    id: 'day',
    fieldType: FieldType.NONE, // READ ONLY, days are calculated automatically using an API
    label: 'Day',
    validators: [],
    value: '',
  },
  {
    id: 'time',
    fieldType: FieldType.NUMBER,
    label: 'Time',
    validators: [requiredValidator],
    value: 0,
  },
]
