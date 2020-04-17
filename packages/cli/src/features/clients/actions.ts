import { action } from 'typesafe-actions'

import { Actions, Client } from './types'

export const fetchListRequest = () => action(Actions.FETCH_LIST_REQUEST)
export const fetchListSuccess = (data: Client[]) =>
  action(Actions.FETCH_LIST_SUCCESS, data)
export const fetchListError = (message: string) =>
  action(Actions.FETCH_LIST_ERROR, message)
