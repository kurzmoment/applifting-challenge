type User = {
  id: number;
  created_at: string;
  email: string;
  name: string;
};

type ArticleTypes = {
  id: number;
  created_at: string;
  title: string;
  image: string;
  body: string;
  user: User;
  comments: [CommentType];
};

type CommentType = {
  id: number;
  created_at: string;
  text: string;
  article: ArticleTypes;
  user: User;
};
