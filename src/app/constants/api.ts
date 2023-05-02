/* ---------------------------------- APIs ---------------------------------- */
//? Link to either your local or the server's
//!Production
// const ROOTLINK = 'http://10.1.10.6:8000/api';
//!Staging Environemnt
const ROOTLINK = 'http://127.0.0.1:8000/api';
// 1- Students API
export const STUDENT_API = ROOTLINK + '/students/';
// 2- Register API
export const REGISTER_API = ROOTLINK + '/register/';
// 3-login API
export const LOGIN_API = ROOTLINK + '/login/';
// 4- Users API
export const USER_API = ROOTLINK + '/users/';
// 5- logout API
export const LOGOUT_API = ROOTLINK + '/logout/';
// 6- Students API
export const COHORT_API = ROOTLINK + '/cohorts/';
// 7- Attendnace API
export const ATTENDNACE_API = ROOTLINK + '/attendance/';
// 8- Candidates API
//! this api must have emp_code with it to work
export const CANDIDATE_API = ROOTLINK + '/candidate/';
// 9- Candidate Info API
export const CANDIDATE_INFO_API = ROOTLINK + '/candidate-info/';

// TODO: Remove API and TOKEN
// Bio time transactions and punch in data Ebrahim's Computer
export const BIO_ATTENDANCE_API = 'http://10.1.50.4:80';
// 1- Department API
export const DEPARTMENT_API =
  BIO_ATTENDANCE_API + '/personnel/api/departments/';
