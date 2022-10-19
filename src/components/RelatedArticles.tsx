import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { GET_ARTICLES } from "../graphql/queries";

function RelatedArticles() {
  // TODO: MAX 4 CLANKY
  const { data, loading } = useQuery(GET_ARTICLES, {});

  console.log(data);

  if (loading) {
    <div></div>;
  }
  if (data) {
    return (
      <div>
        <h3 className="text-xl font-semibold">Related Articles</h3>
        <div>
          {data.getArticleList.map((article: ArticleTypes) => (
            <div key={article.id} className="mt-4">
              <Link
                to={`../article-detail/${article.id}`}
                className="font-semibold"
              >
                {article.title}
              </Link>
              <p className="text-sm">{article.body}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return <div></div>;
}

export default RelatedArticles;
