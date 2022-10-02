import { all, spawn, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import JwtService from '../../../services/jwtService';
import { authLoginAction, authErrorAction, setUserAction, authLogoutAction } from './slice';
import api from "../../../api";


//workers
function* loginWorker(dispatch){
  try {
    const response = yield call(api.auth.login, dispatch.payload);
    if (response.status === 200) {
      JwtService.setSession(response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      if (dispatch.payload.remember_me !== undefined) {
        localStorage.setItem('remember_me', 1)
      }
      yield put({
        type: setUserAction.type,
        payload: {user: response.data}
      });
    }
    else{
      yield put({
        type: authErrorAction.type,
        payload: {errors: [response.data.message]}
      });
      toast.error(response.data.message);
    }
  }
  catch (e) {
    yield put({
      type: authErrorAction.type,
      payload: {errors: [e]}
    });
    toast.error(e);
  }
}

function* logoutWorker() {
  JwtService.setSession(null);
  localStorage.removeItem('user');
  localStorage.removeItem('remember_me');
  yield put({
    type: setUserAction.type,
    payload: {user: {}}
  });
}

//watchers

function* loginWatcher() {
  yield takeLatest(authLoginAction.type, loginWorker)
}

function* logoutWatcher() {
  yield takeLatest(authLogoutAction.type, logoutWorker)
}

export default function* authSaga() {
  yield all([
    spawn(loginWatcher),
    spawn(logoutWatcher),
  ])
}