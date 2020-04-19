export enum ActionsTypes {
  USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST',
  USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
  USER_LOGIN_ERROR = 'USER_LOGIN_ERROR',
  USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST',
  HANDLE_AUTHENTICATION_CALLBACK = 'HANDLE_AUTHENTICATION_CALLBACK',
}

type UserLoginRequestAction = {
  type: ActionsTypes.USER_LOGIN_REQUEST
}

type UserLoginSuccessAction = {
  type: ActionsTypes.USER_LOGIN_SUCCESS
  payload: any
}

type UserLoginError = {
  type: ActionsTypes.USER_LOGIN_ERROR
}

type UserLogoutRequestAction = {
  type: ActionsTypes.USER_LOGOUT_REQUEST
}

type HandleAuthenticationCallbackAction = {
  type: ActionsTypes.HANDLE_AUTHENTICATION_CALLBACK
}

export type AuthActionTypes =
  | UserLoginRequestAction
  | UserLoginSuccessAction
  | UserLoginError
  | UserLogoutRequestAction
  | HandleAuthenticationCallbackAction
