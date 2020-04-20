import { action } from 'typesafe-actions'
import { Client } from './types'
import { ActionsTypes } from './actionTypes'

export const fetchListRequest = () => action(ActionsTypes.FETCH_LIST_REQUEST)
export const fetchListSuccess = (data: Client[]) =>
  action(ActionsTypes.FETCH_LIST_SUCCESS, data)
export const fetchListError = (message: string) =>
  action(ActionsTypes.FETCH_LIST_ERROR, message)
