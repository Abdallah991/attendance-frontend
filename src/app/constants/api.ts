/* ---------------------------------- APIs ---------------------------------- */
//? Link to either your local or the server's
//!Production
// const ROOTLINK = 'http://10.1.10.6:8000/api';
//!Staging Environemnt
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
//
//
//? Bio time APIs
// TODO: Connect it when its set up.
// Bio time transactions and punch in data Ebrahim's Computer
export const BIO_ATTENDANCE_API = 'http://lapt-0002/iclock/api/transactions/';
//
//
//? 01 platform Token and API
//! the token is taken from ../api/auth/token
// API for candidates
export const platformToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMCIsImlhdCI6MTY4MTYzNDI1MywiaXAiOiIxMC4xLjIwMS4xMDQsIDE3Mi4xOC4wLjIiLCJleHAiOjE2ODIwNjYyNTMsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIiwiYWRtaW5fcmVhZF9vbmx5Il0sIngtaGFzdXJhLWNhbXB1c2VzIjoie30iLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJhZG1pbl9yZWFkX29ubHkiLCJ4LWhhc3VyYS11c2VyLWlkIjoiMTAiLCJ4LWhhc3VyYS10b2tlbi1pZCI6ImVkNzk5OTYzLTAwNGMtNGRiNi1hM2VmLTJhYTUyMDM3ODEwZiJ9fQ.OCYrFb2qqnDcVClpt5hoJIqaqvP6-e4PZqAuzPRF4d8';
// Platfom graph ql API
export const PLATFORM_API =
  'https://learn.reboot01.com/api/graphql-engine/v1/graphql';
