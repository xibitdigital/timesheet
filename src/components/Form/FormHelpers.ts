import {
  Field,
  FieldConfigObject,
  FormContext,
  FormMachineEventUpdate,
  ValidatorReturn,
  FormConfig,
  FieldValueObject,
} from './FormTypes'

export function updateField<T>(
  ctx: FormContext<T>,
  event: FormMachineEventUpdate<T>
): Partial<FormContext<T>> {
  const {
    fields: fieldsCurrent,
    fieldsHistory: fieldsHistoryCurrent = [],
  } = ctx
  const { id, value } = event
  const kId = id as keyof T
  const field = fieldsCurrent[kId]
  // assign new value
  const newField: any = { ...field, value } // TODO fix type here
  // running validations
  const { error, errorMessage } = validateField(ctx, newField)
  // update just value, we should set dirty status as well

  const fields = {
    ...fieldsCurrent,
    [id]: { ...newField, error, errorMessage },
  }

  const fieldsHistory = [...fieldsHistoryCurrent, fields]

  return {
    fields,
    fieldsHistory,
    dirty: true,
  }
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

export function undo<T>(ctx: FormContext<T>): Partial<FormContext<T>> {
  const { fieldsHistory: currentFieldsHistory = [] } = ctx
  const historyLength = currentFieldsHistory.length

  if (historyLength > 1) {
    const fields = { ...currentFieldsHistory[historyLength - 2] }
    const fieldsHistory = currentFieldsHistory.slice(0, -1)
    return { fields, fieldsHistory }
  }
  return {}
}

export function validateFields<T>(
  ctx: FormContext<T>
): Partial<FormContext<T>> {
  const { fields } = ctx
  let validity: boolean = true
  let newFields: FieldConfigObject<T> = {} as any

  Object.keys(fields).forEach((id) => {
    const kId = id as keyof T
    const field = fields[kId]
    // after model change or upgrade we should prevent checking extraneous fields
    if (field) {
      const { error, errorMessage } = validateField(ctx, field)
      if (error) {
        validity = false
      }

      newFields = { ...newFields, [id]: { ...field, error, errorMessage } }
    }
  })

  return { validity, fields: newFields }
}

export function postSubmit<T>(ctx: FormContext<T>): Partial<FormContext<T>> {
  return { dirty: false }
}

export function validateField<T>(
  ctx: FormContext<T>,
  field: Field<T>
): ValidatorReturn {
  const { fields } = ctx
  const { validators = [] } = field
  let res: ValidatorReturn = { error: false, errorMessage: '' }

  validators.some((validator) => {
    const { error, errorMessage } = validator(field, fields)
    if (error) {
      res = { error, errorMessage }
      return true
    }
    return false
  })

  return res
}

export function initialFieldsContext<T extends {}>(
  formConfig: FormConfig<T>
): Partial<FormContext<T>> {
  let fields: FieldConfigObject<T> = {} as any
  let fieldsDefaults: FieldValueObject<T> = {} as any

  formConfig.forEach((fieldConfig) => {
    const { id, value } = fieldConfig
    fields = { ...fields, [id]: { ...fieldConfig, error: false } }
    fieldsDefaults = { ...fieldsDefaults, [id]: value }
  })

  return { fields, fieldsDefaults, dirty: false }
}

export function mergeFetchedData<T extends {}>(
  ctx: FormContext<T>,
  data: T
): Partial<FormContext<T>> {
  const { fields: currentFields } = ctx
  let fields: FieldConfigObject<T> = {} as any

  Object.keys(currentFields).forEach((id) => {
    const kId = id as keyof T
    const value = data[kId]
    fields = { ...fields, [id]: { ...currentFields[kId], value } }
  })
  return { fields, fieldsHistory: [fields], dirty: false }
}

export function resetContext<T>(ctx: FormContext<T>): Partial<FormContext<T>> {
  const { fields, fieldsDefaults } = ctx
  let newFields: FieldConfigObject<T> = {} as any

  Object.keys(fields).forEach((id) => {
    const kId = id as keyof T
    const value = fieldsDefaults[kId]
    newFields = { ...newFields, [id]: { ...fields[kId], value } }
  })
  return { fields: newFields, dirty: true }
}
