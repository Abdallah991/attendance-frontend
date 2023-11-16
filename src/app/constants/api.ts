/* ---------------------------------- APIs ---------------------------------- */
//? Link to either your local or the server's
// //!Production
const ROOTLINK = 'http://10.1.10.6/api';
//!development Environemnt
// const ROOTLINK = 'http://127.0.0.1:8000/api';
// 1- Students API
export const STUDENT_API = ROOTLINK + '/students';
// 2- Register API
export const REGISTER_API = ROOTLINK + '/register';
// 3-login API
export const LOGIN_API = ROOTLINK + '/login';
// 4- Users API
export const USER_API = ROOTLINK + '/users';
// 5- logout API
export const LOGOUT_API = ROOTLINK + '/logout';
// 6- Students API
export const COHORT_API = ROOTLINK + '/cohorts';
// 7- Attendnace API
export const ATTENDNACE_API = ROOTLINK + '/attendance';
// 8- Candidates API
//! this api must have emp_code with it to work
export const CANDIDATE_API = ROOTLINK + '/candidate';
// 9- Candidate Info API
export const CANDIDATE_INFO_API = ROOTLINK + '/candidate-info';
// 10- Search API
export const SEARCH_API = ROOTLINK + '/search';
// 11-Change Passowrd
export const PASSWORD_API = ROOTLINK + '/password';
// 12-Vacations
export const VACATION_API = ROOTLINK + '/vacations';
// 13-statistics
export const STATISTICS_API = ROOTLINK + '/students-progress';
// 14-roles
export const ROLES_API = ROOTLINK + '/roles';
// 15-applicants
export const APPLICANTS_API = ROOTLINK + '/applicants';
// 16-applicants
export const APPLICANTS_SYNC_API = ROOTLINK + '/applicants-sync';
// 17-applicants Check-In
export const CHECK_IN_API = ROOTLINK + '/applicants-check-in';
// 18-applicants Update
export const APPLICANTS_UPDATE_API = ROOTLINK + '/applicants-update';
// 19-applicants SP
export const SP_API = ROOTLINK + '/applicants-sp';
// 20- Birthdays SP
export const BIRTHDAYS_API = ROOTLINK + '/birthdays';
// 21- Birthdays SP
export const SELECTION_POOL_API = ROOTLINK + '/selection-pool';
// 22- Update Token
export const UPDATE_TOKEN_API = ROOTLINK + '/getToken';
// 23- Sync students
export const SYNC_STUDENTS_API = ROOTLINK + '/students-sync';
// 24- get specific student SP info including image
export const SP_APPLICANT_API = ROOTLINK + '/sp-applicant';
// TODO: Remove API and TOKEN
// Bio time transactions and punch in data Ebrahim's Computer
export const BIO_ATTENDANCE_API = 'http://10.1.50.4:80';
// 1- Department API
export const DEPARTMENT_API = BIO_ATTENDANCE_API + '/personnel/api/departments';
