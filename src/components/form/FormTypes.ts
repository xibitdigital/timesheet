import { COLLECTIONS } from '../../shared/collections'

export interface ValidatorReturn {
  valid: boolean
  errorMessage: string
}
export type ValidatorFn<T> = (
  field: FieldContext,
  fields: FieldContextObject<T>
) => ValidatorReturn

export enum FieldValidationStatus {
  VALID = 'VALID',
  PENDING = 'PENDING',
  INVALID = 'INVALID',
}

export type FieldValue = string | boolean | number | undefined

export enum FormStates {
  ACTIVE = 'ACTIVE',
  VALID = 'VALID',
  INVALID = 'INVALID',
  VALIDATING = 'VALIDATING',
  VALIDATING_SUBMIT = 'VALIDATING_SUBMIT',
  SUBMITTING = 'SUBMITTING',
  FETCHING = 'FETCHING',
  DISABLED = 'DISABLED',
}

export enum FormExternalActions {
  UPDATE = 'UPDATE',
  UPDATE_ALL = 'UPDATE_ALL',
}

export enum FormExternalServices {
  HYDRATE = 'HYDRATE',
  SAVE = 'SAVE',
}

export enum FormActions {
  CHANGE = 'CHANGE',
  SUBMIT = 'SUBMIT',
  RESET = 'RESET',
  VALIDATE = 'VALIDATE',
  HYDRATE = 'HYDRATE',
  INJECT_FIELD = 'INJECT_FIELD',
  UPDATE_FIELD = 'UPDATE_FIELD',
}

export type FormMachineEventUpdate<T> = {
  type: FormActions.UPDATE_FIELD
  id: keyof T
  value: FieldValue
}

export type FormMachineEvents<T> =
  | { type: FormActions.HYDRATE; fields: Field<T>[] }
  | { type: FormActions.CHANGE; id: string; value: FieldValue }
  | { type: FormActions.VALIDATE }
  | { type: FormActions.SUBMIT }
  | { type: FormActions.RESET }
  | { type: FormActions.INJECT_FIELD; id: string; field: Field<T> }
  | FormMachineEventUpdate<T>

export interface FormContext<T> {
  fields: FieldContextObject<T>
  fieldConfigs: FieldConfigObject<T>
  fieldDefaults: T
  validity: boolean
}

export const FormInitialContext: FormContext<any> = {
  fields: {},
  fieldConfigs: {},
  fieldDefaults: {},
  validity: true,
}

export enum FormService {
  SUBMIT_SERVICE = 'SUBMIT_SERVICE',
  FETCHING_SERVICE = 'FETCHING_SERVICE',
}

// util types
export type FieldContextObject<T> = Record<keyof T, FieldContext>
export type FieldConfigObject<T> = Record<keyof T, Field<T>>
export type FieldValueObject<T> = Record<keyof T, FieldValue>
export type UpdateField<T> = (id: keyof T, value: FieldValue) => void
export type SubmitProcess<T> = (data: T) => Promise<any>
export type FetchProcess<T> = () => Promise<Partial<T>>

// fields
export enum FieldType {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  CHECKBOX = 'CHECKBOX',
  SELECT = 'SELECT',
  COLLECTION_SELECT = 'COLLECTION_SELECT',
  NONE = 'NONE',
}

export interface FieldBase<T> {
  label: string
  fieldType: FieldType
  validators: Array<ValidatorFn<T>>
  disabled?: boolean
  defaultValue?: FieldValue
  placeholder?: string
}

export interface FieldContext {
  id: string
  value: FieldValue | FieldContext[] // nested forms
  valid: boolean
  errorMessage: string
  disabled: boolean
}

export interface TextField<T> extends FieldBase<T> {
  fieldType: FieldType.TEXT
}

export interface NumericField<T> extends FieldBase<T> {
  fieldType: FieldType.NUMBER
}

export interface HiddenField<T> extends FieldBase<T> {
  fieldType: FieldType.NONE
}

export interface CheckboxField<T> extends FieldBase<T> {
  fieldType: FieldType.CHECKBOX
}

export interface SelectField<T> extends FieldBase<T> {
  fieldType: FieldType.SELECT
  options: { id: string; label: string }[]
}

export interface CollectionSelectField<T> extends FieldBase<T> {
  fieldType: FieldType.COLLECTION_SELECT
  collection: COLLECTIONS
}

// all fields
export type Field<T> =
  | TextField<T>
  | NumericField<T>
  | SelectField<T>
  | CollectionSelectField<T>
  | CheckboxField<T>
  | HiddenField<T>
