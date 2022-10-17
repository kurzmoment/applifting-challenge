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
};
