import { useMachine } from '@xstate/react';
import { useRef } from 'react';
import { Machine, State } from 'xstate';
import { initialFieldsContext, transferData } from './FormHelpers';
import { FormStateChart, FormStateSchema } from './FormStateChart';
import { FieldValue, FormActions, FormContext, FormInitialContext, FormMachineEvents, FormService, SubmitProcess, UpdateField } from './FormTypes';


export interface UseFormApi {
    state: State<FormContext, FormMachineEvents, FormStateSchema>;
    submit: () => void;
    reset: () => void;
    updateField: UpdateField;
}

export function UseForm<T>(submitProcess: SubmitProcess, initialValue: Record<keyof T, FieldValue>): UseFormApi {

    const ref = useRef<any>(); // execute only once, please assign type !!!!!
    if (!ref.current) {
        // Do something that you only want to do once...
        const machine = Machine<FormContext, FormMachineEvents>(FormStateChart,
            {
                services: {
                    [FormService.SUBMIT_SERVICE]: (ctx) => submitProcess(transferData(ctx))
                }
            },
            {
                ...FormInitialContext,
                fields: initialFieldsContext(initialValue)
            });
        ref.current = machine;
    }

    const [state, send] = useMachine<FormContext, FormMachineEvents>(ref.current);


    const submit = () => {
        send({ type: FormActions.SUBMIT });
    }

    const reset = () => {
        send({ type: FormActions.RESET });
    }

    const updateField = (id: string, value: FieldValue) => {
        send({ type: FormActions.UPDATE_FIELD, id, value });
    }

    return { state, submit, reset, updateField };
}