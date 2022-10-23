## Applifting Challenge

### Used Technology

- React
- Typescript
- React Router
- GraphQL
- Stepzen
- Cloudinary
- Userfront
- TailwindCSS
- Supabase
- Apollo Client

---

#### API

The app is using Stepzen for creating API routes from Supabase. For querrying and displaying data is used GraphQL with Apollo Client. For user authentication it is using Userfront.

##### Authetication

Connection with Userfront:

```typescript
Userfront.init((your - apikey) as string);
```

Type reference:

```typescript
type FormData = {
  name: string;
  email: string;
  password: string;
};
```

Signing user to page with Userfront:

```typescript
await Userfront.signup({
  method: "password",
  name: formData.name,
  email: formData.email,
  password: formData.password,
  redirect: "/",
});
```

#### API ROUTES

Conection is created in appolo-client.js file.

```js
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://camden.stepzen.net/api/cranky-manta/__graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Apikey ${your - api - key}`,
  },
});

export default client;
```

##### `POST` ADD USER

```graphql
insertUser(email:  String!, name:  String!): User
@dbquery(
	type:  "postgresql"
	schema:  "public"
	table:  "user"
	dml:  INSERT
	configuration:  "postgresql_config"
)
```

```typescript
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
```

##### `POST` ADD ARTICLE

```graphql
insertArticle(
	image:  String!
	body:  String!
	title:  String!
	user_id:  ID!
): Article
	@dbquery(
		type:  "postgresql"
		schema:  "public"
		table:  "article"
		dml:  INSERT
		configuration:  "postgresql_config"
)
```

```ts
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
```

##### `POST` ADD COMMENT

```graphql
insertComment(user_id:  ID!, text:  String!, article_id:  ID!): Comment
	@dbquery(
		type:  "postgresql"
		schema:  "public"
		table:  "comment"
		dml:  INSERT
		configuration:  "postgresql_config"
)
```

```typescript
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
```

##### `POST` ADD VOTE

```graphql
insertVote(
	upvote:  Int!
	user_id:  ID!
	comment_id:  ID!
	article_id:  ID!
): Vote
	@dbquery(
		type:  "postgresql"
		schema:  "public"
		table:  "vote"
		dml:  INSERT
		configuration:  "postgresql_config"
)
```

```typescript
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
```

##### `GET` GET USERS

```graphql
getUser(id:  ID!): User
	@dbquery(
		type:  "postgresql"
		schema:  "public"
		table:  "user"
		configuration:  "postgresql_config"
)
```

```ts
export const GET_USERS = gql`
  query MyQuery {
    getUserList {
      email
      id
    }
  }
`;
```

##### `GET` GET ARTICLES

```graphql
getArticleList: [Article]
	@dbquery(
		type:  "postgresql"
		schema:  "public"
		table:  "article"
		configuration:  "postgresql_config"
)
```

```ts
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
```

##### `GET` GET ARTICLES BY USER ID

```graphql
getArticleUsingUser_id(id:  ID!): [Article]
	@dbquery(
		type:  "postgresql"
		query:  """
		SELECT T."body", T."created_at", T."id", T."image", T."title", T."user_id"
		FROM "public"."article" T
		WHERE T."user_id" = $1
		"""
		configuration:  "postgresql_config"
)
```

```ts
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
```

##### `GET` GET ARTICLES BY ID

```graphql
getArticle(id:  ID!): Article
	@dbquery(
		type:  "postgresql"
		schema:  "public"
		table:  "article"
		configuration:  "postgresql_config"
)
```

```ts
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
          user {
            email
            id
          }
        }
      }
    }
  }
`;
```

##### `PATCH` EDIT VOTE

```graphql
editVote(upvote:  Int!, user_id:  ID!, comment_id:  ID!, article_id:  ID!): Vote
	@dbquery(
		type:  "postgresql"
		schema:  "public"
		query:  """
		update vote set "upvote"=+$1 where "user_id"=$2 and "comment_id"=$3
		"""
		configuration:  "postgresql_config"
	)
```

```ts
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
```

##### `PATCH` EDIT ARTICLE

```graphql
editArticle(
	title:  String!
	image:  String!
	body:  String!
	id:  ID!
	user_id:  ID!
): Article
	@dbquery(
		type:  "postgresql"
		schema:  "public"
		query:  """
		UPDATE article SET "title"=$1, "image"=$2, "body"=$3 WHERE "id"=$4 and "user_id"=$5
		"""
		configuration:  "postgresql_config"
	)
```

```ts
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
```

##### `DELETE` DELETE VOTE

```graphql
deleteVote(id:  ID!): Vote
	@dbquery(
		type:  "postgresql"
		schema:  "public"
		table:  "vote"
		dml:  DELETE
		configuration:  "postgresql_config"
	)
```

```ts
export const DELETE_VOTE = gql`
  mutation MyQuery($id: ID!) {
    deleteVote(id: $id) {
      comment_id
      upvote
      user_id
    }
  }
`;
```

##### `DELETE` REMOVE ARTICLE

```graphql
deleteArticle(id:  ID!): Article
	@dbquery(
		type:  "postgresql"
		schema:  "public"
		table:  "article"
		dml:  DELETE
		configuration:  "postgresql_config"
	)
```

```ts
export const REMOVE_ARTICLE = gql`
  mutation MyQuery($id: ID!) {
    deleteArticle(id: $id) {
      body
      id
      user_id
    }
  }
`;
```

##### `DELETE` DELETE COMMENT BY ARTICLE ID

```graphql
deleteCommentByArticleId(article_id:  ID!): Comment
	@dbquery(
		type:  "postgresql"
		query:  """
		delete from "comment" where "article_id"=$1
		"""
		configuration:  "postgresql_config"
	)
```

```ts
export const DELETE_COMMENT_BY_ARTICLE_ID = gql`
  mutation MyQuery($article_id: ID!) {
    deleteCommentByArticleId(article_id: $article_id) {
      id
    }
  }
`;
```

##### `DELETE` DELETE VOTE BY ARTICLE ID

```graphql
deleteVoteByArticleId(article_id:  ID!): Comment
	@dbquery(
		type:  "postgresql"
		query:  """
		delete from "vote" where "article_id"=$1
		"""
		configuration:  "postgresql_config"
	)
```

```ts
export const DELETE_VOTE_BY_ARTICLE_ID = gql`
  mutation MyQuery($article_id: ID!) {
    deleteVoteByArticleId(article_id: $article_id) {
      id
    }
  }
`;
```

##### UPLOADING IMAGES

The app is using cloudinary cloud for storing images.

#### `POST "https://api.cloudinary.com/v1_1/di8ushvnv/image/upload"`

```ts
const imageData = await fetch(
  "https://api.cloudinary.com/v1_1/di8ushvnv/image/upload",
  {
    method: "POST",
    body: data,
  }
).then((r) => r.json());
```
