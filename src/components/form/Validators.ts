import { FieldContext, ValidatorFn } from './FormTypes';

export type CompareValidator = (compareTo: string) => ValidatorFn;

export namespace Validators {

    export const requiredValidator: ValidatorFn = (field: FieldContext, fields: FieldContext[]) => {
        const valid = field && field.value && field.value.toString().length > 0;
        return valid ? Promise.resolve('') : Promise.reject('invalid');
    }

    export const numberValidator = (field: FieldContext, fields: FieldContext[]) => {
        const valid = field && field.value && parseInt(field.value.toString(), 10) > 0;
        return valid ? Promise.resolve('') : Promise.reject('invalid');
    }

    export const minMaxValidator: CompareValidator = (compareWith: string): ValidatorFn =>
        (field: FieldContext, fields: FieldContext[]) => {
            const comparator = fields.find((field) => field.id === compareWith);
            const valid = (field && field.value && comparator && comparator.value) && parseInt(field.value.toString(), 10) < parseInt(comparator.value.toString(), 10);
            return valid ? Promise.resolve('') : Promise.reject('invalid');
        }

    export const lazyValidator: ValidatorFn = (field: FieldContext, fields: FieldContext[]) => {
        return new Promise<string>((resolve, reject) => {
            window.setTimeout(() => resolve(''), 2000);
        })
    }

}