import {
  FieldContext,
  FieldContextObject,
  FieldValueObject,
  FormContext,
  FormMachineEventUpdate,
  ValidatorReturn,
} from './FormTypes'

export function updateField(
  ctx: FormContext,
  event: FormMachineEventUpdate
): Partial<FormContext> {
  const { fields } = ctx
  const { id, value } = event
  const field = fields[id]
  // assign new value
  const newField = { ...field, value }
  // running validations
  const { valid, errorMessage } = validateField(newField, ctx)
  // update just value, we should set dirty status as well
  return { fields: { ...fields, [id]: { ...newField, valid, errorMessage } } }
}

export function transferData(ctx: FormContext): FieldValueObject {
  const { fields } = ctx
  let result = {}
  Object.keys(fields).forEach((id: string) => {
    const { value } = fields[id]
    result = { ...result, [id]: value }
  })
  return result
}

// to be implemented
export function validateFields(ctx: FormContext): Partial<FormContext> {
  const { fields } = ctx
  let validity: boolean = true
  let newFields: FieldContextObject = {}

  Object.keys(fields).forEach((id: string) => {
    const field = fields[id]
    const { valid, errorMessage } = validateField(field, ctx)
    if (!valid) {
      validity = false
    }
    newFields[id] = { ...field, valid, errorMessage }
  })

  return { validity, fields: newFields }
}

export function validateField(
  fieldContext: FieldContext,
  ctx: FormContext
): ValidatorReturn {
  const { fieldConfigs, fields } = ctx
  const { id } = fieldContext
  const fieldConfig = fieldConfigs[id]
  const { validators = [] } = fieldConfig

  let res: ValidatorReturn = { valid: true, errorMessage: '' }

  validators.some((validator) => {
    const { valid, errorMessage } = validator(fieldContext, fields)
    if (!valid) {
      res = { valid, errorMessage }
      return true
    }
    return false
  })

  return res
}

export function initialFieldsContext(
  values: FieldValueObject
): Partial<FormContext> {
  debugger
  let fields: FieldContextObject = {}
  Object.keys(values).forEach((id) => {
    const value = values[id]
    const context: FieldContext = {
      id,
      value,
      valid: true,
      errorMessage: '',
      disable: false,
    }
    fields = { ...fields, [id]: context }
  })
  return { fields }
}
