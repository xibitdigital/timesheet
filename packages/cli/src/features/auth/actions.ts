import { action } from 'typesafe-actions'
import { ActionsTypes } from './actionTypes'
import { Profile } from './types'

export const handleAuthenticationCallback = () =>
  action(ActionsTypes.HANDLE_AUTHENTICATION_CALLBACK)

export const loginRequest = () => action(ActionsTypes.USER_LOGIN_REQUEST)
export const loginSuccess = (data: Profile) =>
  action(ActionsTypes.USER_LOGIN_SUCCESS, data)
export const loginError = (message: string) =>
  action(ActionsTypes.USER_LOGIN_ERROR, message)
