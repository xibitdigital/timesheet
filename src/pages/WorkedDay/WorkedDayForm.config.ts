import { FieldConfigObject, FieldType } from '../../components/form/FormTypes'
import { requiredValidator } from '../../components/form/Validators'
import { WorkedDay } from '../../shared/collections'

export const DefaultFormValues: WorkedDay = {
  day: '',
  time: 1,
}

export const WorkedDayFormConfig: FieldConfigObject<WorkedDay> = {
  day: {
    fieldType: FieldType.NONE, // READ ONLY, days are calculated automatically using an API
    label: 'Day',
    validators: [],
  },
  time: {
    fieldType: FieldType.NUMBER,
    label: 'Time',
    validators: [requiredValidator],
  },
}
