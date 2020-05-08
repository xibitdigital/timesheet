import { ReplaySubject } from 'rxjs';

export type ValidatorFn = (field: Field, fields: Field[]) => Promise<string>;

export enum FieldValidationStatus {
    VALID = 'VALID',
    PENDING = 'PENDING',
    INVALID = 'INVALID'
}

export type FieldValue = string | boolean;

export interface Field {
    id: string;
    label: string;
    value: FieldValue;
    type: FieldType;
    validators: Array<ValidatorFn>;
    validationStatus: FieldValidationStatus;
    errorMessage?: string;
    disabled?: boolean;
    defaultValue: FieldValue;
    placeholder: string;
}

export enum FieldType {
    TEXT = 'TEXT',
    DATE = 'DATE',
    CHECKBOX = 'CHECKBOX',
    NONE = 'NONE'
}

export type FormChannel = ReplaySubject<FormMachineEvents>;

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
    fields: Record<string, Field>;
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