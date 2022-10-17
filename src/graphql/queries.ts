import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query MyQuery {
    getUserList {
      email
      id
    }
  }
`;

export const GET_ARTICLES = gql`
  query MyQuery {
    getArticleList {
      body
      created_at
      id
      image
      title
      user {
        name
      }
    }
  }
`;
