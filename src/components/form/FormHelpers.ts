import {
  FieldContext,
  FieldContextObject,
  FormContext,
  FormMachineEventUpdate,
  ValidatorReturn,
} from './FormTypes'

export function updateField<T>(
  ctx: FormContext<T>,
  event: FormMachineEventUpdate<T>
): Partial<FormContext<T>> {
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

export function transferData<T>(ctx: FormContext<T>): T {
  const { fields } = ctx
  let result = {}
  Object.keys(fields).forEach((id) => {
    const kId = id as keyof T
    const { value } = fields[kId]
    result = { ...result, [id]: value }
  })
  return result as T
}

// to be implemented
export function validateFields<T>(
  ctx: FormContext<T>
): Partial<FormContext<T>> {
  const { fields, fieldConfigs } = ctx
  let validity: boolean = true
  let newFields: FieldContextObject<T> = {} as any

  Object.keys(fields).forEach((id) => {
    const kId = id as keyof T
    const field = fields[kId]
    const fieldConfig = fieldConfigs[kId]
    // after model change or upgrade we should prevent checking extraneous fields
    if (field && fieldConfig) {
      const { valid, errorMessage } = validateField(field, ctx)
      if (!valid) {
        validity = false
      }
      newFields[kId] = { ...field, valid, errorMessage }
    }
  })

  return { validity, fields: newFields }
}

export function validateField<T>(
  fieldContext: FieldContext,
  ctx: FormContext<T>
): ValidatorReturn {
  const { fieldConfigs, fields } = ctx
  const { id } = fieldContext
  const kId = id as keyof T
  const fieldConfig = fieldConfigs[kId]
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

export function initialFieldsContext<T extends {}>(
  fieldDefaults: T
): Partial<FormContext<T>> {
  let fields: FieldContextObject<T> = {} as any

  Object.keys(fieldDefaults).forEach((id) => {
    const value = (fieldDefaults as any)[id] // TODO fix this one
    const context: FieldContext = {
      id,
      value,
      valid: true,
      errorMessage: '',
      disabled: false,
    }
    fields = { ...fields, [id]: context }
  })
  return { fields, fieldDefaults }
}
