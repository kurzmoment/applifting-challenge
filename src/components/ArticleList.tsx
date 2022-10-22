import React from "react";
import Article from "./Article";
import { useQuery } from "@apollo/client";
import { GET_ARTICLES } from "../graphql/queries";
import { Jelly } from "@uiball/loaders";

function ArticleList() {
  const { data, loading } = useQuery(GET_ARTICLES);
  if (loading) {
    return (
      <div className="flex flex-1 text-3xl items-center justify-center m-8">
        <Jelly size={80} speed={0.9} color="black" />
      </div>
    );
  }
  return (
    <div className="">
      <h1 className="ml-5 lg:ml-72 text-5xl mb-8 font-semibold mt-8">
        Recent articles
      </h1>
      {data.getArticleList.map((article: ArticleTypes) => (
        <Article key={article.id} article={article} />
      ))}
    </div>
  );
}

export default ArticleList;
