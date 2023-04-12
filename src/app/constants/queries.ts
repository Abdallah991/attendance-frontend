import { gql } from 'apollo-angular';
import { getCurrentDate, getDate7Days, getDateTomorrow } from './globalMethods';

//? List of queries
// 1- get all users
export const GET_USERS = gql`
  query getUserInfo {
    user {
      email
      firstName
      lastName
      phone: attrs(path: "Phone")
      email
      sessions {
        final_score
        updated_at
      }
    }
  }
`;

// 2- get applicants last week
//! the dates have to be dynamic
export const GET_USERS_SIGNED_RANGED_7 = gql`
  query users {
    user(
      where: {
        createdAt: {
          _gte: ${getDate7Days()} ,
          _lte: ${getCurrentDate()}
        }
      }
    ) {
      id
      attrs
    }
  }
`;

// 3- get applicants applied in the last 24 hours.
export const GET_USERS_SIGNED_RANGED_1 = gql`
  query users {
    user(
      where: {
        createdAt: {
          _gte: ${getCurrentDate()} ,
          _lte: ${getDateTomorrow()}
        }
      }
    ) {
      id
      attrs
    }
  }
`;
