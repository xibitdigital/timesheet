export interface ValidatorReturn {
  valid: boolean
  errorMessage: string
}
export type ValidatorFn = (
  field: FieldContext,
  fields: FieldContextObject
) => ValidatorReturn

export enum FieldValidationStatus {
  VALID = 'VALID',
  PENDING = 'PENDING',
  INVALID = 'INVALID',
}

export type FieldValue = string | boolean | undefined

export enum FieldType {
  TEXT = 'TEXT',
  DATE = 'DATE',
  CHECKBOX = 'CHECKBOX',
  SELECT = 'SELECT',
  NONE = 'NONE',
}

export interface FieldBase {
  id: string
  label: string
  type: FieldType
  validators: Array<ValidatorFn>
  disabled?: boolean
  defaultValue?: FieldValue
  placeholder?: string
}

export interface FieldContext {
  id: string
  value: FieldValue
  valid: boolean
  errorMessage: string
  disable: boolean
}

export interface TextField extends FieldBase {
  type: FieldType.TEXT
}

export interface CheckboxField extends FieldBase {
  type: FieldType.CHECKBOX
}

export interface SelectField extends FieldBase {
  type: FieldType.TEXT
  collection: string
}

// all fields
export type Field = TextField | SelectField | CheckboxField
export type FormConfig<T> = Record<keyof T, Field>
export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
export type Subtract<T, K> = Omit<T, keyof K>

export enum FormStates {
  INIT = 'INIT',
  VALID = 'VALID',
  INVALID = 'INVALID',
  VALIDATING = 'VALIDATING',
  VALIDATING_SUBMIT = 'VALIDATING_SUBMIT',
  SUBMITTING = 'SUBMITTING',
  HYDRATING = 'HYDRATING',
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

export type FormMachineEventUpdate = {
  type: FormActions.UPDATE_FIELD
  id: string
  value: FieldValue
}

export type FormMachineEvents =
  | { type: FormActions.HYDRATE; fields: Field[] }
  | { type: FormActions.CHANGE; id: string; value: FieldValue }
  | { type: FormActions.VALIDATE }
  | { type: FormActions.SUBMIT }
  | { type: FormActions.RESET }
  | { type: FormActions.INJECT_FIELD; id: string; field: Field }
  | FormMachineEventUpdate

export interface FormContext {
  fields: FieldContextObject
  fieldConfigs: FieldConfigObject
  validity: boolean
  saved: boolean
}

export const FormInitialContext: FormContext = {
  fields: {},
  fieldConfigs: {},
  validity: true,
  saved: false,
}

export enum FormService {
  SUBMIT_SERVICE = 'SUBMIT_SERVICE',
}

// util types
export type FieldContextObject = Record<string, FieldContext>
export type FieldConfigObject = Record<string, Field>
export type FieldValueObject = Record<string, FieldValue>
export type UpdateField = (id: string, value: FieldValue) => void
export type SubmitProcess = (data: FieldValueObject) => Promise<any>
