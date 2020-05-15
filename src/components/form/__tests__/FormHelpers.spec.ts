import {
  initialFieldsContext,
  resetContext,
  transferData,
  updateField,
  validateField,
} from '../FormHelpers'
import {
  FieldType,
  FormActions,
  FormMachineEventUpdate,
  ValidatorReturn,
} from '../FormTypes'
import { requiredValidator } from '../Validators'
import { FormConfig, FormContext } from './../FormTypes'
describe('FormHelpers', () => {
  interface Model {
    name: ''
    surname: ''
  }

  const formConfig: FormConfig<Model> = [
    {
      fieldType: FieldType.TEXT,
      label: 'Name',
      id: 'name',
      value: 'me',
      validators: [requiredValidator],
    },
    {
      fieldType: FieldType.TEXT,
      label: 'Surname',
      id: 'surname',
      value: '',
      validators: [requiredValidator],
    },
  ]

  const formContext: FormContext<Model> = {
    fields: {
      name: {
        fieldType: FieldType.TEXT,
        label: 'Name',
        id: 'name',
        value: 'me',
        error: false,
        errorMessage: '',
        validators: [requiredValidator],
      },
      surname: {
        fieldType: FieldType.TEXT,
        label: 'Surname',
        id: 'surname',
        value: '',
        error: false,
        errorMessage: '',
        validators: [requiredValidator],
      },
    },
    fieldsDefaults: {
      name: '',
      surname: '',
    },
    validity: true,
  }

  describe('resetContext()', () => {
    it('should return new fields', () => {
      const res: Partial<FormContext<Model>> = initialFieldsContext(formConfig)
      expect(res.fields?.name).toBeDefined()
      expect(res.fields?.surname).toBeDefined()
    })
  })

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

  describe('resetContext()', () => {
    it('should return new fields', () => {
      const ctx: any = resetContext({ ...formContext })
      expect(ctx.fields.name.value).toEqual('')
    })
  })
})
