import { all, spawn, call, put, takeEvery, select } from 'redux-saga/effects';
import { fetchStudentsAction, errorFetchStudentsAction, setStudentsAction, changePageAction } from './slice';
import api from "../../../api";
import {toast} from "react-toastify";

//workers
function* getStudentsWorker() {
  try {
    const state = yield select();
    const response = yield call(api.students.getStudents, state.students.currentPage);
    if (response.status === 200) {
      yield put({
        type: setStudentsAction.type,
        payload: {items: response.data.items, totalCount: response.data.totalCount, limit: response.data.limit}
      });
    }
    else{
      yield put({
        type: errorFetchStudentsAction.type,
        payload: {errors: [response.data.message]}
      });
      toast.error(response.data.message);
    }
  }
  catch (e) {
    yield put({
      type: errorFetchStudentsAction.type,
      payload: {errors: [e]}
    });
    toast.error(e);
  }
}

function* changePageWorker() {
  const state = yield select();
  window.location.hash = "page="+state.students.currentPage;
  yield put({
    type: fetchStudentsAction.type,
  });
}


//watchers

function* getStudentsWatcher() {
  yield takeEvery(fetchStudentsAction.type, getStudentsWorker)
}

function* changePageWatcher() {
  yield takeEvery(changePageAction.type, changePageWorker)
}

export default function* studentsSaga() {
  yield all([
    spawn(getStudentsWatcher),
    spawn(changePageWatcher),
  ])
}