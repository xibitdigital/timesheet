import { assign, Machine, MachineConfig } from 'xstate';
import { FormActions, FormContext, FormMachineEvents, FormMachineEventUpdate, FormService, FormStates } from './FormTypes';
import { updateField } from './FormHelpers';

export interface FormStateSchema {
    states: {
        [FormStates.INIT]: {};
        [FormStates.SUBMITTING]: {};
        [FormStates.DISABLED]: {};
    }
}

export const FormStateChart: MachineConfig<FormContext, FormStateSchema, FormMachineEvents> = {
    initial: FormStates.INIT,
    states: {
        [FormStates.INIT]: { // change this for initial phase
            on: {
                [FormActions.INJECT_FIELD]: {

                },
                [FormActions.UPDATE_FIELD]: {
                    actions: assign((ctx, event) => updateField(ctx, event))
                }
            }
        },
        [FormStates.SUBMITTING]: {
            invoke: {
                src : FormService.SUBMIT_SERVICE,
                onDone : {
                    target: FormStates.INIT
                },
                onError: {
                    target: FormStates.INIT // handle error
                }
            }
        },
        [FormStates.DISABLED]: {}
    }
};


export const FormStateMachine = Machine(FormStateChart);
