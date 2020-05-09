import { FieldContext, ValidatorFn, ValidatorReturn, FieldContextObject } from './FormTypes';

export type CompareValidator = (compareTo: string) => ValidatorFn;


enum ValidationMessage {
    'REQUIRED' = 'Required'
}

function returnSuccess(): ValidatorReturn {
    return { errorMessage: '', valid: true };
}

function returnError(errorMessage: ValidationMessage): ValidatorReturn {
    return { errorMessage, valid: false }
}


export const requiredValidator: ValidatorFn = (field: FieldContext, fields: FieldContextObject) => {
    return field && field.value && field.value.toString().length > 0 ? returnSuccess() : returnError(ValidationMessage.REQUIRED);
}

export const numberValidator = (field: FieldContext, fields: FieldContextObject) => {
    return field && field.value && parseInt(field.value.toString(), 10) > 0 ? returnSuccess() : returnError(ValidationMessage.REQUIRED);
}

// export const minMaxValidator: CompareValidator = (compareWith: string): ValidatorFn =>
//     (field: FieldContext, fields: fields: FieldContextObject) => {
//        // code here
//     }
// }

