import { useMachine } from '@xstate/react'
import { useRef } from 'react'
import { Machine, State } from 'xstate'
import { initialFieldsContext, transferData } from './FormHelpers'
import { FormStateSchema, getStateChart } from './FormStateChart'
import {
  FetchProcess,
  FieldConfigObject,
  FieldValue,
  FormActions,
  FormContext,
  FormInitialContext,
  FormMachineEvents,
  FormService,
  SubmitProcess,
  UpdateField,
} from './FormTypes'

export interface UseFormApi<T> {
  state: State<FormContext<T>, FormMachineEvents<T>, FormStateSchema>
  submit: () => void
  reset: () => void
  updateField: UpdateField<T>
}

export function UseForm<T>(
  fieldConfigs: FieldConfigObject<T>,
  initialValue: Record<keyof T, FieldValue>,
  submitProcess: SubmitProcess,
  fetchProcess: FetchProcess = () => Promise.resolve({})
): UseFormApi<T> {
  const ref = useRef<any>() // execute only once, please assign type !!!!!
  if (!ref.current) {
    // Do something that you only want to do once...
    const machine = Machine<FormContext<T>, FormMachineEvents<T>>(
      getStateChart<T>(),
      {
        services: {
          [FormService.SUBMIT_SERVICE]: (ctx) =>
            submitProcess(transferData(ctx)),
          [FormService.FETCHING_SERVICE]: (ctx) => fetchProcess(),
        },
      },
      {
        ...FormInitialContext,
        ...initialFieldsContext(initialValue),
        fieldConfigs,
      }
    )
    ref.current = machine
  }

  const [state, send] = useMachine<FormContext<T>, FormMachineEvents<T>>(
    ref.current
  )

  const submit = () => {
    send({ type: FormActions.SUBMIT })
  }

  const reset = () => {
    send({ type: FormActions.RESET })
  }

  const updateField = (id: keyof T, value: FieldValue) => {
    send({ type: FormActions.UPDATE_FIELD, id, value })
  }

  return { state, submit, reset, updateField }
}
