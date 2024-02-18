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
// 25- get specific student SP info including image
export const SP_APPLICANT_COMMENT_API = ROOTLINK + '/sp-comment';
// 26- sync sp
export const SP_SYNC_API = ROOTLINK + '/sync-sp';
// 27- upload image
export const UPLOAD_IMAGE = ROOTLINK + '/upload-image';
// 28- search applicants
export const SEARCH_APPLICANTS_API = ROOTLINK + '/search-applicants';
// 29- selection pool comment
export const SP_DECISION_API = ROOTLINK + '/sp-decision';
// 30- Code Wars user API
export const CODE_WARS_API = 'https://www.codewars.com/api/v1/users/';
// 31- Code Wars user API
export const ADD_WARRIOR_API = ROOTLINK + '/warrior';
// 32- get warriors api
export const GET_WARRIORS_API = ROOTLINK + '/warriors';
// 33- create battle api
export const CREATE_BATTLE_API = ROOTLINK + '/create-battle';
// 34- get battle or battles api
export const GET_BATTLE_API = ROOTLINK + '/battles';
// 35- edit battle api
export const EDIT_BATTLE_API = ROOTLINK + '/edit-battle';
// 36- add warriors to battle
export const ADD_WARRIOR_BATTLE_API = ROOTLINK + '/add-warriors-battle';
// 37- start battle
export const START_BATTLE_API = ROOTLINK + '/start-battle';
// 38- upload image
export const UPLOAD_STUDENT = ROOTLINK + '/upload-student';
// 39- update student comment
export const UPDATE_STUDENT_COMMENT = ROOTLINK + '/student-comment';
// TODO: Remove API and TOKEN
// Bio time transactions and punch in data Ebrahim's Computer
export const BIO_ATTENDANCE_API = 'http://10.1.50.4:80';
// 1- Department API
export const DEPARTMENT_API = BIO_ATTENDANCE_API + '/personnel/api/departments';
