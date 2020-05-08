import { FormContext, FormMachineEventUpdate, FieldValue, FieldContext } from "./FormTypes"

export function updateField(ctx: FormContext, event: FormMachineEventUpdate): Partial<FormContext> {
    const { fields } = ctx;
    const { id, value } = event;
    const field = fields[id];
    // update just value, we should set dirty status as well
    return { fields: { ...fields, [id]: { ...field, value, id } } };
}

export function transferData(ctx: FormContext): Record<string, FieldValue> {
    const { fields } = ctx
    let result = {}
    Object.keys(fields).forEach((id: string) => {
        const { value } = fields[id];
        result = { ...result, [id]: value }
    })
    return result
}

// to be implemented
export function validateFields(ctx: FormContext): Partial<FormContext> {
    return {};
}

export function initialFieldsContext(values: Record<string, FieldValue>): Record<string, FieldContext> {
    let fields: Record<string, FieldContext> = {};
    Object.keys(values).forEach((id) => {
        const value = values[id];
        const context: FieldContext = {
            id,
            value,
            valid: true,
            errorMessage: '',
            disable: false
        };
        fields = { ...fields, [id]: context };
    });
    return fields;
}