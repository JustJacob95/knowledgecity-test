import { all, spawn } from 'redux-saga/effects';
import authSaga from './redux/auth/sagas'
import studentsSaga from './redux/students/sagas'


export default function* rootSaga() {
  yield all([
    spawn(authSaga),
    spawn(studentsSaga),
  ])
}