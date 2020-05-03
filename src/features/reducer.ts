import { combineReducers } from 'redux'

import { clientsReducer } from './client'
import { ClientState } from './client/types'

export type StoreState = {
  clients: ClientState
}

export const rootReducer = combineReducers({
  clients: clientsReducer,
})
