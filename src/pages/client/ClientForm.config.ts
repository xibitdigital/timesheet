import { FieldConfigObject, FormConfig } from '../../components/form/FormTypes'
import { Client } from '../../shared/collections'
import { FieldType } from '../../components/form/FormTypes'
import { requiredValidator } from '../../components/form/Validators'

export const ClientFormConfig: FormConfig<Client> = [
  {
    id: 'name',
    fieldType: FieldType.TEXT,
    label: 'Name',
    validators: [requiredValidator],
    value: '',
  },
  {
    id: 'fullAddress',
    fieldType: FieldType.TEXT,
    label: 'Address',
    validators: [requiredValidator],
    value: '',
  },
  {
    id: 'postcode',
    fieldType: FieldType.TEXT,
    label: 'Post Code',
    validators: [requiredValidator],
    value: '',
  },
]
