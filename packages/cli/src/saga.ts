import { all, fork } from 'redux-saga/effects'

import authSaga from './features/auth/sagas'
import clientsSaga from './features/clients/sagas'

export function* rootSaga() {
  yield all([fork(authSaga), fork(clientsSaga)])
}
