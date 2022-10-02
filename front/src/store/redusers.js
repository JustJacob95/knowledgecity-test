import { combineReducers } from 'redux';
import students from './redux/students/slice'
import auth from './redux/auth/slice'
const reducers = combineReducers({
  students,
  auth,
});

export default reducers