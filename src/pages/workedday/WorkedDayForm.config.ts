import { FieldType, FormConfig } from '../../components/form/FormTypes'
import { requiredValidator } from '../../components/form/Validators'
import { WorkedDay } from '../../shared/collections'

export const WorkedDayFormConfig: FormConfig<WorkedDay> = [
  {
    id: 'date',
    fieldType: FieldType.TEXT, // READ ONLY, days are calculated automatically using an API
    label: 'Day',
    validators: [],
    value: '',
    readonly: true,
  },
  {
    id: 'workedHours',
    fieldType: FieldType.NUMBER,
    label: 'Time',
    validators: [requiredValidator],
    value: 0,
  },
]
