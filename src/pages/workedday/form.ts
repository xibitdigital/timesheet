import { FieldType, FormConfig } from '../../components/Form/FormTypes'
import { requiredValidator } from '../../components/Form/Validators'
import { WorkedDay } from '../../shared/collections'
import { maxValidator } from '../../components/Form/Validators'

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
    validators: [requiredValidator, maxValidator(8)],
    value: 0,
  },
]
