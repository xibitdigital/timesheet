import { Project } from '../../shared/collections'
import { FieldType, FormConfig } from '../../components/Form/FormTypes'
import { requiredValidator } from '../../components/Form/Validators'

export const ProjectFormConfig: FormConfig<Project> = [
  {
    id: 'name',
    fieldType: FieldType.TEXT,
    label: 'Name',
    validators: [requiredValidator],
    value: '',
  },
  {
    id: 'description',
    fieldType: FieldType.TEXT,
    label: 'Description',
    validators: [requiredValidator],
    value: '',
  },
]
