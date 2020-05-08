import { Field, ValidatorFn } from './FormTypes';

export type CompareValidator = (compareTo: string) => ValidatorFn;

export namespace Validators {

    export const requiredValidator: ValidatorFn = (field: Field, fields: Field[]) => {
        const valid = field && field.value.toString().length > 0;
        return valid ? Promise.resolve('') : Promise.reject('invalid');
    }

    export const numberValidator = (field: Field, fields: Field[]) => {
        const valid = field && parseInt(field.value.toString(), 10) > 0;
        return valid ? Promise.resolve('') : Promise.reject('invalid');
    }

    export const minMaxValidator: CompareValidator = (compareWith: string): ValidatorFn =>
        (field: Field, fields: Field[]) => {
            const comparator = fields.find((field) => field.id === compareWith);
            const valid = (field && comparator) && parseInt(field.value.toString(), 10) < parseInt(comparator.value.toString(), 10);
            return valid ? Promise.resolve('') : Promise.reject('invalid');
        }

    export const lazyValidator: ValidatorFn = (field: Field, fields: Field[]) => {
        return new Promise<string>((resolve, reject) => {
            window.setTimeout(() => resolve(''), 2000);
        })
    }

}