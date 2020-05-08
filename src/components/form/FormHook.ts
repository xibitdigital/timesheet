import { useMachine } from '@xstate/react';
import { State } from 'xstate';
import { transferData } from './FormHelpers';
import { FormStateMachine, FormStateSchema } from './FormStateChart';
import { FieldValue, FormActions, FormContext, FormMachineEvents, FormService } from './FormTypes';


export interface UseMQTTReturnType {
    state: State<FormContext, FormMachineEvents, FormStateSchema>;
    submit: () => void;
    reset: () => void;
}

export function UseForm(submitService: (data: Record<string, FieldValue>)=> Promise<void>): UseMQTTReturnType {

    const [state, send] = useMachine<FormContext, FormMachineEvents>(FormStateMachine,
        {
            services: {
                [FormService.SUBMIT_SERVICE]: (ctx) => submitService(transferData(ctx))
            }
        });

    const submit = () => {
        send({type: FormActions.SUBMIT});
    }

    const reset = () => {
        send({type: FormActions.RESET});
    }

    return {state, submit, reset};
}