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
      commentList {
        id
        article_id
        voteList {
          user_id
          upvote
          comment_id
        }
      }
    }
  }
`;

export const GET_ARTICLES_BY_USER_ID = gql`
  query MyQuery($id: ID!) {
    getArticleUsingUser_id(id: $id) {
      body
      created_at
      id
      image
      title
      user {
        created_at
        email
        id
        name
      }
      commentList {
        article_id
        created_at
        id
        text
        voteList {
          comment_id
          created_at
          id
          upvote
        }
      }
    }
  }
`;

export const GET_ARTICLE_BY_ID = gql`
  query MyQuery($id: ID!) {
    getArticle(id: $id) {
      body
      created_at
      id
      image
      title
      user {
        name
        id
      }
      commentList {
        created_at
        id
        text
        user {
          name
          id
          email
        }
        voteList {
          comment_id
          created_at
          id
          upvote
        }
      }
    }
  }
`;
