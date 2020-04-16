import { Actions } from './actionTypes'
import counterReducer from './counterReducer'
import { CounterActionTypes } from './types'

describe('features > counter > counterReducer', () => {
  it(`increments value, if ${Actions.INCREMENT_COUNTER} action is provided`, () => {
    const initialState = {
      value: 0,
    }

    const expectedState = {
      value: 1,
    }

    const action: CounterActionTypes = {
      type: Actions.INCREMENT_COUNTER,
    }

    expect(counterReducer(initialState, action)).toEqual(expectedState)
  })

  it(`increments value, if ${Actions.DECREMENT_COUNTER} action is provided`, () => {
    const initialState = {
      value: 0,
    }

    const expectedState = {
      value: -1,
    }

    const action: CounterActionTypes = {
      type: Actions.DECREMENT_COUNTER,
    }

    expect(counterReducer(initialState, action)).toEqual(expectedState)
  })
})
