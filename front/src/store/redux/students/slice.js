import { createSlice } from '@reduxjs/toolkit'


const getCurrentPage = () => {
  const hash = window.location.hash.split('=');
  if (hash[0] === 'page') {
    return hash[1]
  }
  return 1;
}

const initialBrandsState = {
  loading: false,
  items: [],
  errors: [],
  currentPage: getCurrentPage(),
  totalCount: 0,
  limit: 10,
};

export const students = createSlice({
  name: 'students',
  initialState: initialBrandsState,
  reducers: {
    setStudentsAction: (state, action) => ({...action.payload, loading: false, currentPage: state.currentPage}),
    changePageAction: (state, action) => ({...action.payload, loading: true}),
    errorFetchStudentsAction: (state, action) => ({...action.payload, loading: false}),
    fetchStudentsAction: (state) => ({...state, loading: true}),
  }
});

export const { setStudentsAction, errorFetchStudentsAction, fetchStudentsAction, changePageAction } = students.actions;

export default students.reducer;

