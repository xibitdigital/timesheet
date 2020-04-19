import { combineReducers } from 'redux'

import { clientsReducer } from './features/client'
import { ClientState } from './features/client/types'

export type StoreState = {
  clients: ClientState
}

export const rootReducer = combineReducers({
  clients: clientsReducer,
})
