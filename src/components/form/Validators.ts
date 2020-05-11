import {
  FieldContext,
  ValidatorFn,
  ValidatorReturn,
  FieldContextObject,
} from './FormTypes'
import { isNil } from 'ramda'
import { isBoolean, isString, isNumber } from 'util'

export type CompareValidator<T> = (compareTo: string) => ValidatorFn<T>

enum ValidationMessage {
  'REQUIRED' = 'Required',
  'MIN_LENGTH' = 'Too short',
  'MAX_LENGTH' = 'Too long',
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
  if (field && !isNil(field.value)) {
    if (isString(field.value) && field.value.length > 0) {
      return returnSuccess()
    } else if (isNumber(field.value) || isBoolean(field.value)) {
      return returnSuccess()
    }
  }
  return returnError(ValidationMessage.REQUIRED)
}

export function minLengthValidator<T>(comparator: number) {
  return (
    field: FieldContext,
    fields: FieldContextObject<T>
  ): ValidatorReturn =>
    field && field.value && field.value.toString().length >= comparator
      ? returnSuccess()
      : returnError(ValidationMessage.MIN_LENGTH)
}

export function maxLengthValidator<T>(comparator: number) {
  return (
    field: FieldContext,
    fields: FieldContextObject<T>
  ): ValidatorReturn =>
    field && field.value && field.value.toString().length <= comparator
      ? returnSuccess()
      : returnError(ValidationMessage.MAX_LENGTH)
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
