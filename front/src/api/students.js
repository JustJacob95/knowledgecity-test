import axios from 'axios';
import serverUrl from '../services/serverUrl';

export function getStudents(page = null){
  let url = '/users';
  if (page !== null) {
    url += '?page=' + page;
  }
  return axios.get(serverUrl + url).then(response => response)
    .catch(e => e.response);
}
