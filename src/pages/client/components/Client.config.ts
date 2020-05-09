import { Client } from '../../../shared/collections'
import { FormConfig, FieldType } from '../../../components/form/FormTypes'
import { requiredValidator } from '../../../components/form/Validators'

export const DefaultFormValues: Client = {
  id: '',
  name: '',
  fullAddress: '',
  postcode: '',
}

export const ClientFormConfig: FormConfig<Client> = {
  id: {
    // this should be removed
    fieldType: FieldType.TEXT,
    label: '',
    id: 'id',
    validators: [],
  },
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
