import {
  initialFieldsContext,
  resetContext,
  transferData,
  updateField,
  validateField,
  mergeFetchedData,
  validateFields,
  undo,
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
  interface Test {
    name: string
    surname: string
  }

  const formConfig: FormConfig<Test> = [
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

  const formContext: FormContext<Test> = {
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
    fieldsHistory: [],
    validity: true,
    dirty: false,
  }

  describe('resetContext()', () => {
    it('should return new fields', () => {
      const res = initialFieldsContext(formConfig)
      expect(res.fields?.name).toBeDefined()
      expect(res.fields?.surname).toBeDefined()
    })
  })

  describe('updateField()', () => {
    it('should update state machine context', () => {
      const event: FormMachineEventUpdate<Test> = {
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
      const event: FormMachineEventUpdate<Test> = {
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
      const event: FormMachineEventUpdate<Test> = {
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

  describe('validateFields()', () => {
    it('should run fields validators', () => {
      const event: FormMachineEventUpdate<Test> = {
        type: FormActions.UPDATE_FIELD,
        id: 'name',
        value: 'newValue',
      }
      const res = validateFields(formContext)
      expect(res.fields?.name.error).toBeFalsy()
      expect(res.fields?.surname.error).toBeTruthy()
    })
  })

  describe('resetContext()', () => {
    it('should return new fields', () => {
      const ctx = resetContext({ ...formContext })
      expect(ctx.fields?.name.value).toEqual('')
    })
  })

  describe('mergeFetchedData()', () => {
    it('should return new fields', () => {
      const fetchedData = { name: 'a', surname: 'b' }
      const ctx = mergeFetchedData({ ...formContext }, fetchedData)
      expect(ctx.fields?.name.value).toEqual('a')
      expect(ctx.fields?.surname.value).toEqual('b')
    })
  })

  describe('undo()', () => {
    const ctx: FormContext<Test> = {
      ...formContext,
      fieldsHistory: [
        {
          ...formContext.fields,
          name: { ...formContext.fields.name, value: '2' },
        },
        {
          ...formContext.fields,
          name: { ...formContext.fields.name, value: '23' },
        },
      ],
    }

    it('should return previous values', () => {
      expect(undo(ctx).fields?.name.value).toEqual('2')
      expect(undo(ctx).fields?.surname.value).toEqual('')
    })
  })
})
