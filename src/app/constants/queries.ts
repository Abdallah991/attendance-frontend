import { gql } from 'apollo-angular';

//? List of queries
// 1- get users
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
