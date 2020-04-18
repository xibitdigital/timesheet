import { Client } from './types'

export enum ActionsTypes {
  FETCH_LIST_REQUEST = 'FETCH_LIST_REQUEST',
  FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS',
  FETCH_LIST_ERROR = 'FETCH_LIST_ERROR',
}

type FetchClientsRequestAction = {
  type: ActionsTypes.FETCH_LIST_REQUEST
}

type FetchClientsSuccessAction = {
  type: ActionsTypes.FETCH_LIST_SUCCESS
  payload: Client[]
}

type FetchClientsErrorAction = {
  type: ActionsTypes.FETCH_LIST_ERROR
  payload: string
}

export type ClientActionTypes =
  | FetchClientsRequestAction
  | FetchClientsSuccessAction
  | FetchClientsErrorAction
