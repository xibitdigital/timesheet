import { action } from 'typesafe-actions'
import { ActionsTypes } from './actionTypes'

export const handleAuthenticationCallback = (data: any) =>
  action(ActionsTypes.HANDLE_AUTHENTICATION_CALLBACK, data)
