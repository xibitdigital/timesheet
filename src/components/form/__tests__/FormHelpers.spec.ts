import {
  FormContext,
  FieldType,
  FormMachineEventUpdate,
  FormActions,
  ValidatorReturn,
} from './../FormTypes'
import { updateField, transferData, validateField } from '../FormHelpers'
import { requiredValidator } from '../Validators'
describe('FormHelpers', () => {
  interface Model {
    name: ''
    surname: ''
  }
  const formContext: FormContext<Model> = {
    fields: {
      name: {
        id: 'name',
        value: 'me',
        valid: true,
        errorMessage: '',
        disabled: false,
      },
      surname: {
        id: 'surname',
        value: '',
        valid: true,
        errorMessage: '',
        disabled: false,
      },
    },
    fieldConfigs: {
      name: {
        fieldType: FieldType.TEXT,
        id: 'name',
        label: '',
        validators: [requiredValidator],
      },
      surname: {
        fieldType: FieldType.TEXT,
        id: 'surname',
        label: '',
        validators: [],
      },
    },
    fieldDefaults: {
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
        formContext.fields.name,
        formContext
      )
      expect(res).toEqual({ errorMessage: '', valid: true })
    })
  })
})
