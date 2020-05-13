import { FieldConfigObject } from '../../components/form/FormTypes'
import { Client } from '../../shared/collections'
import { FieldType } from '../../components/form/FormTypes'
import { requiredValidator } from '../../components/form/Validators'

export const DefaultFormValues: Client = {
  name: '',
  fullAddress: '',
  postcode: '',
}

export const ClientFormConfig: FieldConfigObject<Client> = {
  name: {
    fieldType: FieldType.TEXT,
    label: 'Name',
    validators: [requiredValidator],
  },
  fullAddress: {
    fieldType: FieldType.TEXT,
    label: 'Address',
    validators: [requiredValidator],
  },
  postcode: {
    fieldType: FieldType.TEXT,
    label: 'Post Code',
    validators: [requiredValidator],
  },
}
