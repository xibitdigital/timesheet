import { Actions } from './actionTypes'

interface IncrementCounterAction {
  type: Actions.INCREMENT_COUNTER
}
interface DecrementCounterAction {
  type: Actions.DECREMENT_COUNTER
}
export type CounterActionTypes = IncrementCounterAction | DecrementCounterAction

export interface SystemState {
  count: {
    value: number
  }
}
