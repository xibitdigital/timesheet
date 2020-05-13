import { transferData, updateField, validateField } from '../FormHelpers'
import { requiredValidator } from '../Validators'
import {
  FieldType,
  FormActions,
  FormContext,
  FormMachineEventUpdate,
  ValidatorReturn,
} from './../FormTypes'
describe('FormHelpers', () => {
  interface Model {
    name: ''
    surname: ''
  }
  const formContext: FormContext<Model> = {
    fields: {
      name: {
        fieldType: FieldType.TEXT,
        label: 'Name',
        id: 'name',
        value: 'me',
        error: false,
        errorMessage: '',
        disabled: false,
        validators: [requiredValidator],
      },
      surname: {
        fieldType: FieldType.TEXT,
        label: 'Surname',
        id: 'surname',
        value: '',
        error: false,
        errorMessage: '',
        disabled: false,
        validators: [requiredValidator],
      },
    },
    fieldsDefaults: {
      name: '',
      surname: '',
    },
    validity: true,
  }
  describe('updateField()', () => {
    it('should update state machine context', () => {
      const event: FormMachineEventUpdate<Model> = {
        type: FormActions.UPDATE_FIELD,
        id: 'name',
        value: 'newValue',
      }
      const newContext = updateField(formContext, event)
      expect(newContext.fields?.name.value).toEqual('newValue')
    })
  })

  describe('transferData()', () => {
    it('should preapare data for Firebase', () => {
      const event: FormMachineEventUpdate<Model> = {
        type: FormActions.UPDATE_FIELD,
        id: 'name',
        value: 'newValue',
      }
      const data = transferData(formContext)
      expect(data.name).toEqual('me')
      expect(data.surname).toEqual('')
    })
  })

  describe('validateField()', () => {
    it('should run field validators', () => {
      const event: FormMachineEventUpdate<Model> = {
        type: FormActions.UPDATE_FIELD,
        id: 'name',
        value: 'newValue',
      }
      const res: ValidatorReturn = validateField(
        formContext,
        formContext.fields.name
      )
      expect(res).toEqual({ errorMessage: '', error: false })
    })
  })
})
