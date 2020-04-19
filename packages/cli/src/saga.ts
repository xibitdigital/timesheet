import { all, fork } from 'redux-saga/effects'

import clientsSaga from './features/client/sagas'

export function* rootSaga() {
  yield all([fork(clientsSaga)])
}
