import { FormContext, FormMachineEventUpdate, FieldValue } from "./FormTypes";

export function updateField(ctx: FormContext, event: FormMachineEventUpdate): Partial<FormContext> {
    const { fields } = ctx;
    const { id, value } = event;
    return { ...fields, [id]: value };

}

export function transferData(ctx: FormContext): Record<string, FieldValue {
    const {fields} = ctx;
    let result = {};
    Object.keys(fields).forEach((id: string) => {
        const value = fields[id].value;
        result = {...result, [id]: value};
    });
    return result;
}