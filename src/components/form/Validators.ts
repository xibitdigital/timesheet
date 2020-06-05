import { isNil } from 'ramda'
import { isBoolean, isNumber, isString } from 'util'
import {
  Field,
  FieldConfigObject,
  ValidatorFn,
  ValidatorReturn,
} from './FormTypes'

export type CompareValidator<T> = (compareTo: string) => ValidatorFn<T>

enum ValidationMessage {
  REQUIRED = 'Required',
  MIN_LENGTH = 'Too short',
  MAX_LENGTH = 'Too long',
  MIN = 'Too small',
  MAX = 'Too big',
}

function returnSuccess(): ValidatorReturn {
  return { errorMessage: '', error: false }
}

function returnError(errorMessage: ValidationMessage): ValidatorReturn {
  return { errorMessage, error: true }
}

export function requiredValidator<T>(
  field: Field<T>,
  fields: FieldConfigObject<T>
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
  return (field: Field<T>, fields: FieldConfigObject<T>): ValidatorReturn =>
    field && field.value && field.value.toString().length >= comparator
      ? returnSuccess()
      : returnError(ValidationMessage.MIN_LENGTH)
}

export function maxLengthValidator<T>(comparator: number) {
  return (field: Field<T>, fields: FieldConfigObject<T>): ValidatorReturn =>
    field && field.value && field.value.toString().length <= comparator
      ? returnSuccess()
      : returnError(ValidationMessage.MAX_LENGTH)
}

export function numberValidator<T>(
  field: Field<T>,
  fields: FieldConfigObject<T>
): ValidatorReturn {
  return field && field.value && parseInt(field.value.toString(), 10) > 0
    ? returnSuccess()
    : returnError(ValidationMessage.REQUIRED)
}

export function minValidator<T>(comparator: number) {
  return (field: Field<T>): ValidatorReturn =>
    field && field.value && Number(field.value) >= comparator
      ? returnSuccess()
      : returnError(ValidationMessage.MIN)
}

export function maxValidator<T>(comparator: number) {
  return (field: Field<T>): ValidatorReturn =>
    field && field.value && Number(field.value) <= comparator
      ? returnSuccess()
      : returnError(ValidationMessage.MAX)
}

// export const minMaxValidator: CompareValidator = (compareWith: string): ValidatorFn =>
//     (field: Field<T>, fields: fields: FieldConfigObject<T>) => {
//        // code here
//     }
// }
