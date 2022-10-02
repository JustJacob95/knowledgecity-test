import React, { useEffect } from 'react';
import Pagination from './Pagination';
import { fetchStudentsAction, changePageAction } from "../store/redux/students/slice";
import { authLogoutAction } from "../store/redux/auth/slice";
import '../styles/user-list.css'
import {useDispatch, useSelector} from "react-redux";

function UserList(){
  const dispatch = useDispatch();
  const students  = useSelector((state) => state.students);
  useEffect(() => {
    dispatch(fetchStudentsAction());
  }, []);

  const logout = () => {
      dispatch(authLogoutAction());
  }

  const changePage = (page) => {
    dispatch(changePageAction({currentPage: page}));
  }

  return(
    <>
      <div className="user-list">
        <h1>User list</h1>
        {students.loading && <>
          <div className="child-center"><div className="loader"></div></div>
        </>}
        {students.loading === false && students.items.length > 0  && <>
          <div className="custom-table">
            {students.items.map(student => {
              return(
                <div className="row">
                  <div className="status">
                    {student.status}
                  </div>
                  <div className="info">
                    <div className="username">{student.nickname}</div>
                    <div className="name">{student.first_name} {student.last_name}</div>
                  </div>
                  <div className="actions">
                    <div className="action-buttons">...</div>
                    <div className="group-name">
                      Default group
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Pagination changePage={changePage} currentPage={students.currentPage} totalPages={Math.ceil(students.totalCount / students.limit) } />
        </>}
        <p className="logout-link" onClick={logout}>Logout</p>
      </div>
    </>
  )
}

export default UserList;