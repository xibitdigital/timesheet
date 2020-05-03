import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { ActionsTypes } from './actionTypes'
import { fetchListError, fetchListSuccess } from './actions'
import { getList } from './api'

function* handleClientsFetchList(action: any) {
  try {
    const res = yield call(getList, action)
    const payload = res ? res.data : {}

    yield put(fetchListSuccess(payload))
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchListError(err.stack!))
    } else {
      yield put(fetchListError('An unknown error occurred.'))
    }
  }
}

function* watchFetchListRequest() {
  yield takeEvery(ActionsTypes.FETCH_LIST_REQUEST, handleClientsFetchList)
}

function* clientsSaga() {
  yield all([fork(watchFetchListRequest)])
}

export default clientsSaga