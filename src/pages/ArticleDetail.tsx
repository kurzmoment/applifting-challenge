import { useQuery } from "@apollo/client";
import React from "react";
import { useLocation } from "react-router-dom";
import { GET_ARTICLE_BY_ID } from "../graphql/queries";
import { Jelly } from "@uiball/loaders";
import MDEditor from "@uiw/react-md-editor";
import RelatedArticles from "../components/RelatedArticles";
import AddComment from "../components/AddComment";
import moment from "moment";
import CommentSection from "../components/CommentSection";

function ArticleDetail() {
  document.documentElement.setAttribute("data-color-mode", "light");
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
  if (data) {
    return (
      <div className="flex sm:flex-row flex-col">
        <div className="sm:ml-72 sm:w-1/2 ml-5 mr-5 sm:mr-0 mt-8 mb-8">
          <h1 className=" text-5xl font-semibold">{data.getArticle.title}</h1>
          <div className="flex space-x-4 mt-8 text-sm text-gray-400">
            <p>{data.getArticle.user.name}</p>
            <p>•</p>
            <p>{moment(data.getArticle.created_at).format("MMMM Do YYYY")}</p>
          </div>
          <div className="mt-8 sm:mr-10">
            <img src={data.getArticle.image} alt={data.getArticle.title} />
          </div>
          <div className="sm:mr-10 mt-8">
            <MDEditor.Markdown source={data.getArticle.body} data-color-mode />
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold">
              Comments ({data.getArticle.commentList.length})
            </h3>
            <AddComment />
            {data.getArticle.commentList.map((comment: CommentType) => (
              <CommentSection comment={comment} data={data} key={comment.id} />
            ))}
          </div>
        </div>
        <hr className="border border-gray-200 h-96 m-5 mt-8" />
        <div className="flex-1 mt-8">
          <RelatedArticles />
        </div>
      </div>
    );
  }
  return <div></div>;
}

export default ArticleDetail;
