// ... other imports ...
import { ActionsTypes, AuthActionTypes } from './actionTypes'
import { AuthState } from './types'

const initialState: AuthState = {
  data: [],
  errors: undefined,
  loading: false,
  updating: false,
}

export default function toDoApp(state = initialState, action: AuthActionTypes) {
  switch (action.type) {
    case ActionsTypes.USER_PROFILE_LOADED:
      return {
        ...state,
        user: action.payload,
      }
    default:
      return state
  }
}
