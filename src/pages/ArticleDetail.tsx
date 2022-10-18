import { useQuery } from "@apollo/client";
import React from "react";
import { useLocation } from "react-router-dom";
import { GET_ARTICLE_BY_ID } from "../graphql/queries";
import { Jelly } from "@uiball/loaders";
import MDEditor from "@uiw/react-md-editor";

function ArticleDetail() {
  const articleId = useLocation().pathname.slice(16);
  const { data, loading, error } = useQuery(GET_ARTICLE_BY_ID, {
    variables: {
      id: articleId,
    },
  });

  if (loading === true) {
    return (
      <div className="flex flex-1 text-3xl items-center justify-center m-8">
        <Jelly size={80} speed={0.9} color="black" />
      </div>
    );
  }
  return (
    <div className="sm:ml-72 ml-5 mr-5 mt-8 mb-8">
      <h1 className=" text-5xl font-semibold">{data.getArticle.title}</h1>
      <div className="flex space-x-4 mt-8 text-sm text-gray-400">
        <p>{data.getArticle.user.name}</p>
        <p>•</p>
        <p>{data.getArticle.created_at}</p>
      </div>
      <div className="mt-8 sm:mr-72">
        <img src={data.getArticle.image} alt={data.getArticle.title} />
      </div>
      <div className="sm:mr-72 mt-8">
        {/* <p>{articleData.body}</p> */}
        <MDEditor.Markdown source={data.getArticle.body} />
      </div>
    </div>
  );
}

export default ArticleDetail;
