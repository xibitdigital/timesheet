import { combineReducers } from 'redux'

import { authReducer } from './features/auth'

import { clientsReducer } from './features/client'
import { AuthState } from './features/auth/types'
import { ClientState } from './features/client/types'

export type StoreState = {
  auth: AuthState
  clients: ClientState
}

export const rootReducer = combineReducers({
  auth: authReducer,
  clients: clientsReducer,
})
