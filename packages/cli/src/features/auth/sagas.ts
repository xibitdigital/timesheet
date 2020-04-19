import { all, put, call, takeLatest } from 'redux-saga/effects'
import { ActionsTypes } from './actionTypes'
import { handleAuthentication } from './api'

export function* parseHash() {
  const user = yield call(handleAuthentication)
  yield put({ type: ActionsTypes.USER_LOGIN_SUCCESS, payload: user })
}

export function* handleAuthenticationCallback() {
  yield takeLatest(ActionsTypes.HANDLE_AUTHENTICATION_CALLBACK, parseHash)
}

function* authSaga() {
  yield all([handleAuthenticationCallback()])
}

export default authSaga
