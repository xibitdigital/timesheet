export type ValidatorFn = (field: FieldContext, fields: FieldContext[]) => Promise<string>;

export enum FieldValidationStatus {
    VALID = 'VALID',
    PENDING = 'PENDING',
    INVALID = 'INVALID'
}

export type FieldValue = string | boolean | undefined;

export enum FieldType {
    TEXT = 'TEXT',
    DATE = 'DATE',
    CHECKBOX = 'CHECKBOX',
    SELECT = 'SELECT',
    NONE = 'NONE'
}

export interface FieldBase {
    id: string;
    label: string;
    type: FieldType;
    validators: Array<ValidatorFn>;
    disabled?: boolean;
    defaultValue?: FieldValue;
    placeholder?: string;
}

export interface FieldContext {
    id: string;
    value: FieldValue;
    valid: boolean;
    errorMessage: string;
    disable: boolean;
}

export interface TextField extends FieldBase {
    type: FieldType.TEXT;
}

export interface CheckboxField extends FieldBase {
    type: FieldType.CHECKBOX;
}

export interface SelectField extends FieldBase {
    type: FieldType.TEXT;
    collection: string;
}

// all fields
export type Field = TextField | SelectField |  CheckboxField;
export type FormConfig<T> = Record<keyof T, Field>;
export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export type Subtract<T, K> = Omit<T, keyof K>;

export enum FormStates {
    INIT = 'INIT',
    VALID = 'VALID',
    INVALID = 'INVALID',
    VALIDATING = 'VALIDATING',
    VALIDATING_SUBMIT = 'VALIDATING_SUBMIT',
    SUBMITTING = 'SUBMITTING',
    HYDRATING = 'HYDRATING',
    DISABLED = 'DISABLED'
}

export enum FormExternalActions {
    UPDATE = 'UPDATE',
    UPDATE_ALL = 'UPDATE_ALL'
}

export enum FormExternalServices {
    HYDRATE = 'HYDRATE',
    SAVE = 'SAVE'
}

export enum FormActions {
    CHANGE = 'CHANGE',
    SUBMIT = 'SUBMIT',
    RESET = 'RESET',
    VALIDATE = 'VALIDATE',
    HYDRATE = 'HYDRATE',
    INJECT_FIELD = 'INJECT_FIELD',
    UPDATE_FIELD = 'UPDATE_FIELD',
    FORCE_UPDATE = 'FORCE_UPDATE'
}

export type FormMachineEventUpdate = { type: FormActions.UPDATE_FIELD; id: string; value: FieldValue };
export type FormMachineEventForceUpdate = { type: FormActions.FORCE_UPDATE; id: string; value: FieldValue };

export type FormMachineEvents =
    | { type: FormActions.HYDRATE, fields: Field[] }
    | { type: FormActions.CHANGE, id: string; value: FieldValue }
    | { type: FormActions.VALIDATE }
    | { type: FormActions.SUBMIT }
    | { type: FormActions.RESET }
    | { type: FormActions.INJECT_FIELD; id: string; field: Field }
    | FormMachineEventUpdate
    | FormMachineEventForceUpdate
    ;

export interface FormContext {
    fields: Record<string, FieldContext>;
    validity: boolean;
    saved: boolean;
}

export const FormInitialContext: FormContext = {
    fields: {},
    validity: true,
    saved: false
}

export enum FormService {
    SUBMIT_SERVICE = 'SUBMIT_SERVICE'
}

export type UpdateField = (id: string, value: FieldValue) => void;
export type SubmitProcess = (data: Record<string, FieldValue>) => Promise<any>;