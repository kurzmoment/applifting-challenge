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

export const ADD_ARTICLE = gql`
  mutation MyQuery(
    $image: String!
    $body: String!
    $title: String!
    $user_id: ID!
  ) {
    insertArticle(
      image: $image
      body: $body
      title: $title
      user_id: $user_id
    ) {
      image
      body
      created_at
      title
      user_id
    }
  }
`;

export const INSERT_COMMENT = gql`
  mutation MyQuery($article_id: ID!, $text: String!, $user_id: ID!) {
    insertComment(article_id: $article_id, text: $text, user_id: $user_id) {
      id
      text
      article_id
      created_at
      user_id
    }
  }
`;
