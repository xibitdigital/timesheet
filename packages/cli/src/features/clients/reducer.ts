import { ClientsActionTypes, ClientsState, Actions } from './types'

const initialState: ClientsState = {
  data: [],
  errors: undefined,
  loading: false,
  updating: false,
}

export default (state = initialState, action: ClientsActionTypes) => {
  switch (action.type) {
    case Actions.FETCH_LIST_REQUEST:
      return { ...state, loading: true }

    case Actions.FETCH_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: { ...state.data, ...action.payload },
      }
    }
    case Actions.FETCH_LIST_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    default:
      return state
  }
}
