import {
  FieldContext,
  ValidatorFn,
  ValidatorReturn,
  FieldContextObject,
} from './FormTypes'

export type CompareValidator<T> = (compareTo: string) => ValidatorFn<T>

enum ValidationMessage {
  'REQUIRED' = 'Required',
}

function returnSuccess(): ValidatorReturn {
  return { errorMessage: '', valid: true }
}

function returnError(errorMessage: ValidationMessage): ValidatorReturn {
  return { errorMessage, valid: false }
}

export function requiredValidator<T>(
  field: FieldContext,
  fields: FieldContextObject<T>
): ValidatorReturn {
  return field && field.value && field.value.toString().length > 0
    ? returnSuccess()
    : returnError(ValidationMessage.REQUIRED)
}

export function numberValidator<T>(
  field: FieldContext,
  fields: FieldContextObject<T>
): ValidatorReturn {
  return field && field.value && parseInt(field.value.toString(), 10) > 0
    ? returnSuccess()
    : returnError(ValidationMessage.REQUIRED)
}

// export const minMaxValidator: CompareValidator = (compareWith: string): ValidatorFn =>
//     (field: FieldContext, fields: fields: FieldContextObject<T>) => {
//        // code here
//     }
// }
