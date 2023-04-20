import { gql } from 'apollo-angular';

//? List of queries
// 1- get all users
export const GET_USERS = gql`
  query getUserInfo {
    user {
      email
      firstName
      lastName
      phone: attrs(path: "Phone")
      createdAt
      email
      sessions {
        final_score
      }
    }
  }
`;

// 2- get applicants last week
//! the dates have to be dynamic
export const GET_USERS_SIGNED_RANGED = gql`
  query allUsers($currentDate: timestamptz!, $previousDate: timestamptz!) {
    user(where: { createdAt: { _gte: $previousDate, _lte: $currentDate } }) {
      id
      attrs
      createdAt
      sessions {
        final_score
      }
    }
  }
`;
