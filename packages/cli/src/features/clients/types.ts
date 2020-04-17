// TYPES
export type Client = {
  name: string
  address: string
  postcode: string
  vat: string
}

// ACTION TYPES
export enum Actions {
  FETCH_LIST_REQUEST = 'FETCH_LIST_REQUEST',
  FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS',
  FETCH_LIST_ERROR = 'FETCH_LIST_ERROR',
}

type FetchClientsRequestAction = {
  type: Actions.FETCH_LIST_REQUEST
}

type FetchClientsSuccessAction = {
  type: Actions.FETCH_LIST_SUCCESS
  payload: Client[]
}

type FetchClientsErrorAction = {
  type: Actions.FETCH_LIST_ERROR
  payload: string
}

export type ClientsActionTypes =
  | FetchClientsRequestAction
  | FetchClientsSuccessAction
  | FetchClientsErrorAction

// STATE
export type ClientsState = {
  readonly data: Client[]
  readonly loading: boolean
  readonly updating: boolean
  readonly errors?: string
}
