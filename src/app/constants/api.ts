/* ---------------------------------- APIs ---------------------------------- */

// Production

// Staging Environemnt

// Local Dev Environment
// const ROOTLINK = 'http://10.1.10.6/api';
const ROOTLINK = 'http://127.0.0.1:8000/api';

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

// API for candidates
export const platformToken = 'd25baad3f473bbd70d010db8126fbaa80a47d1e3';

// Candidates data

//? Bio time APIs

// Bio time studnets and staff "Employees"
// include get, post, patch, put
export const BIO_EMPLOYEES_API = 'http://lapt-0002/personnel/api/employees/';

// Bio time transactions and punch in data

export const BIO_ATTENDANCE_API = 'http://lapt-0002/iclock/api/transactions/';
