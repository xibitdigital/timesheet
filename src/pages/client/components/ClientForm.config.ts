import { FieldConfigObject } from '../../../components/form/FormTypes'
import { Client } from '../../../shared/collections'
import { FieldType } from '../../../components/form/FormTypes'
import { requiredValidator } from '../../../components/form/Validators'

export const DefaultFormValues: Client = {
  name: '',
  fullAddress: '',
  postcode: '',
}

export const ClientFormConfig: FieldConfigObject<Client> = {
  name: {
    fieldType: FieldType.TEXT,
    label: 'Name',
    id: 'name',
    validators: [requiredValidator],
  },
  fullAddress: {
    fieldType: FieldType.TEXT,
    label: 'Address',
    id: 'fullAddress',
    validators: [requiredValidator],
  },
  postcode: {
    fieldType: FieldType.TEXT,
    label: 'Post Code',
    id: 'postcode',
    validators: [requiredValidator],
  },
}
