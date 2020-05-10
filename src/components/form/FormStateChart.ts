import { assign, MachineConfig } from 'xstate'
import {
  updateField,
  validateFields,
  initialFieldsContext,
} from './FormHelpers'
import {
  FormActions,
  FormContext,
  FormMachineEvents,
  FormService,
  FormStates,
} from './FormTypes'

export interface FormStateSchema {
  states: {
    [FormStates.ACTIVE]: {}
    [FormStates.FETCHING]: {}
    [FormStates.VALIDATING_SUBMIT]: {}
    [FormStates.SUBMITTING]: {}
    [FormStates.DISABLED]: {}
  }
}

export function getStateChart<T>(): MachineConfig<
  FormContext<T>,
  FormStateSchema,
  FormMachineEvents<T>
> {
  return {
    initial: FormStates.FETCHING,
    states: {
      [FormStates.ACTIVE]: {
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
      [FormStates.FETCHING]: {
        invoke: {
          src: FormService.FETCHING_SERVICE,
          onDone: {
            actions: assign((ctx, event) => initialFieldsContext(event.data)),
            target: FormStates.ACTIVE,
          },
          onError: {
            target: FormStates.ACTIVE,
          },
        },
      },
      [FormStates.VALIDATING_SUBMIT]: {
        entry: assign((ctx: FormContext<T>) => validateFields(ctx)),
        on: {
          '': [
            {
              target: FormStates.SUBMITTING,
              cond: (ctx: FormContext<T>) => ctx.validity,
            },
            {
              target: FormStates.ACTIVE,
              cond: (ctx: FormContext<T>) => !ctx.validity,
            },
          ],
        },
      },
      [FormStates.SUBMITTING]: {
        invoke: {
          src: FormService.SUBMIT_SERVICE,
          onDone: {
            target: FormStates.ACTIVE,
          },
          onError: {
            target: FormStates.ACTIVE, // handle error
          },
        },
      },
      [FormStates.DISABLED]: {},
    },
  }
}
