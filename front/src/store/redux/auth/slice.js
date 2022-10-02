


import { createSlice } from '@reduxjs/toolkit'

const initialBrandsState = {
  loading: false,
  user: {},
  errors: []
};

if (localStorage.getItem('user') !== null) {
  initialBrandsState.user = JSON.parse(localStorage.getItem('user'));
}
export const auth = createSlice({
  name: 'auth',
  initialState: initialBrandsState,
  reducers: {
    setUserAction: (state, action) => ({...action.payload, errors: [], loading: false}),
    authErrorAction: (state, action) => ({...action.payload, loading: false, user: {}}),
    authLoginAction: (state) => ({...state, loading: true}),
    authLogoutAction: (state) => ({...state, loading: true}),
  }
});

export const { setUserAction, authLoginAction, authErrorAction, authLogoutAction } = auth.actions;

export default auth.reducer;

