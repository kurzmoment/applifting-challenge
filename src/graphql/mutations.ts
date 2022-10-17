import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation MyQuery($email: String!, $name: String!) {
    insertUser(email: $email, name: $name) {
      name
      id
      email
      created_at
    }
  }
`;
