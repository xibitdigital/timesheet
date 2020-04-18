export enum ActionsTypes {
  USER_PROFILE_LOADED = 'USER_PROFILE_LOADED',
  HANDLE_AUTHENTICATION_CALLBACK = 'HANDLE_AUTHENTICATION_CALLBACK',
}

type UserProfileLoadedAction = {
  type: ActionsTypes.USER_PROFILE_LOADED
  payload: any
}

type HandleAuthenticationCallbackAction = {
  type: ActionsTypes.HANDLE_AUTHENTICATION_CALLBACK
}

export type AuthActionTypes =
  | UserProfileLoadedAction
  | HandleAuthenticationCallbackAction
