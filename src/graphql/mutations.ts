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

export const INSERT_VOTE = gql`
  mutation MyQuery(
    $comment_id: ID!
    $upvote: Int!
    $user_id: ID!
    $article_id: ID!
  ) {
    insertVote(
      comment_id: $comment_id
      upvote: $upvote
      user_id: $user_id
      article_id: $article_id
    ) {
      id
      comment_id
      upvote
      user_id
    }
  }
`;

export const EDIT_VOTE = gql`
  mutation MyQuery(
    $comment_id: ID!
    $upvote: Int!
    $user_id: ID!
    $article_id: ID!
  ) {
    editVote(
      comment_id: $comment_id
      upvote: $upvote
      user_id: $user_id
      article_id: $article_id
    ) {
      id
      comment_id
      user_id
      upvote
    }
  }
`;

export const EDIT_ARTICLE = gql`
  mutation MyQuery(
    $id: ID!
    $body: String!
    $image: String!
    $title: String!
    $user_id: ID!
  ) {
    editArticle(
      id: $id
      body: $body
      image: $image
      title: $title
      user_id: $user_id
    ) {
      body
      id
      image
      title
      user_id
    }
  }
`;

export const DELETE_VOTE = gql`
  mutation MyQuery($id: ID!) {
    deleteVote(id: $id) {
      comment_id
      upvote
      user_id
    }
  }
`;

export const REMOVE_ARTICLE = gql`
  mutation MyQuery($id: ID!) {
    deleteArticle(id: $id) {
      body
      id
      user_id
    }
  }
`;

export const DELETE_COMMENT_BY_ARTICLE_ID = gql`
  mutation MyQuery($article_id: ID!) {
    deleteCommentByArticleId(article_id: $article_id) {
      id
    }
  }
`;

export const DELETE_VOTE_BY_ARTICLE_ID = gql`
  mutation MyQuery($article_id: ID!) {
    deleteVoteByArticleId(article_id: $article_id) {
      id
    }
  }
`;
