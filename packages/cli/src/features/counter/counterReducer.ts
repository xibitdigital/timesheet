import { Actions} from './actionTypes'
import { CounterActionTypes } from './types'

const initialState = {
  value: 0,
}

export default (state = initialState, action: CounterActionTypes) => {
  switch (action.type) {
    case Actions.INCREMENT_COUNTER:
      return { ...state, value: state.value + 1 }
    case Actions.DECREMENT_COUNTER:
      return { ...state, value: state.value - 1 }
    default:
      return state
  }
}
