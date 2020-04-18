import { combineReducers } from 'redux'

import { authReducer } from './features/auth'

import { clientsReducer } from './features/clients'

export const rootReducer = combineReducers({
  auth: authReducer,
  clients: clientsReducer,
})
