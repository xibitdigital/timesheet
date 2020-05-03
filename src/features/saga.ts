import { all, fork } from 'redux-saga/effects'

import clientSaga from './client/saga'

export function* rootSaga() {
  yield all([fork(clientSaga)])
}
