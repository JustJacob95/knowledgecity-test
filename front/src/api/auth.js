import axios from 'axios';
import serverUrl from '../services/serverUrl';

export function login(credentials){
  return axios.post(serverUrl + '/auth/', credentials).then(response => response)
    .catch(e => e.response);
}
