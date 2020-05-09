import { assign, Machine, MachineConfig } from 'xstate'
import {
  FormActions,
  FormContext,
  FormMachineEvents,
  FormService,
  FormStates,
} from './FormTypes'
import { updateField, validateFields } from './FormHelpers'

export interface FormStateSchema {
  states: {
    [FormStates.INIT]: {}
    [FormStates.VALIDATING_SUBMIT]: {}
    [FormStates.SUBMITTING]: {}
    [FormStates.DISABLED]: {}
  }
}

export const FormStateChart: MachineConfig<
  FormContext,
  FormStateSchema,
  FormMachineEvents
> = {
  initial: FormStates.INIT,
  states: {
    [FormStates.INIT]: {
      // change this for initial phase
      on: {
        [FormActions.INJECT_FIELD]: {},
        [FormActions.UPDATE_FIELD]: {
          actions: assign((ctx, event) => updateField(ctx, event)),
        },
        [FormActions.SUBMIT]: {
          target: FormStates.VALIDATING_SUBMIT,
        },
      },
    },
    [FormStates.VALIDATING_SUBMIT]: {
      entry: assign((ctx: FormContext) => validateFields(ctx)),
      on: {
        '': [
          {
            target: FormStates.SUBMITTING,
            cond: (ctx: FormContext) => ctx.validity,
          },
          {
            target: FormStates.INIT,
            cond: (ctx: FormContext) => !ctx.validity,
          },
        ],
      },
    },
    [FormStates.SUBMITTING]: {
      invoke: {
        src: FormService.SUBMIT_SERVICE,
        onDone: {
          target: FormStates.INIT,
        },
        onError: {
          target: FormStates.INIT, // handle error
        },
      },
    },
    [FormStates.DISABLED]: {},
  },
}
