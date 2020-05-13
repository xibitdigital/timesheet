import { FieldType } from '../../components/Form/FormTypes'
import { requiredValidator } from '../../components/Form/Validators'
import { WorkedDay } from '../../shared/collections'
import { FormConfig } from '../../components/Form/FormTypes'

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
