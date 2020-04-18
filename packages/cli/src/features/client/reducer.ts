import { ClientState } from './types'
import { ActionsTypes, ClientsActionTypes } from './actionTypes'

const initialState: ClientState = {
  data: [],
  errors: undefined,
  loading: false,
  updating: false,
}

export default (state = initialState, action: ClientsActionTypes) => {
  switch (action.type) {
    case ActionsTypes.FETCH_LIST_REQUEST:
      return { ...state, loading: true }

    case ActionsTypes.FETCH_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: { ...state.data, ...action.payload },
      }
    }
    case ActionsTypes.FETCH_LIST_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    default:
      return state
  }
}
