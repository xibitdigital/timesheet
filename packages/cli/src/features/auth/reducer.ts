import { ActionsTypes, AuthActionTypes } from './actionTypes'
import { AuthState } from './types'

const initialState: AuthState = {
  data: { authenticated: false, idToken: -1, profile: {}, expiresAt: '' },
  errors: undefined,
  loading: false,
}

export default function toDoApp(state = initialState, action: AuthActionTypes) {
  switch (action.type) {
    case ActionsTypes.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ActionsTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case ActionsTypes.USER_LOGIN_ERROR:
      return {
        ...state,
        loading: false,
      }

    default:
      return state
  }
}
