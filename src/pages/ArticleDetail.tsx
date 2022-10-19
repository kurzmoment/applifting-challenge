import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { GET_ARTICLE_BY_ID } from "../graphql/queries";
import { Jelly } from "@uiball/loaders";
import MDEditor from "@uiw/react-md-editor";
import RelatedArticles from "../components/RelatedArticles";
import AddComment from "../components/AddComment";
import Avatar from "../components/Avatar";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import TimeAgo from "react-timeago";
import moment from "moment";

function ArticleDetail() {
  document.documentElement.setAttribute("data-color-mode", "light");
  const [vote, setVote] = useState<[boolean, number]>();
  const articleId = useLocation().pathname.slice(16);
  const { data, loading, error } = useQuery(GET_ARTICLE_BY_ID, {
    variables: {
      id: articleId,
    },
  });

  function handleVote(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    voteState: boolean,
    id: number
  ) {
    // e.preventDefault();
    setVote([voteState, id]);
    console.log(vote);
    setVote([false, 0]);
  }

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
              <div key={comment.id} className="mt-4 flex sm:mr-10">
                <div>
                  <Avatar seed={comment.user.email} />
                </div>
                <div className="flex flex-col ml-4 mt-2">
                  <div className="items-center space-x-2">
                    <div className="flex space-x-2 items-center">
                      <h5 className="font-semibold">{comment.user.name}</h5>
                      <TimeAgo
                        className="text-xs text-gray-400"
                        date={comment.created_at}
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <p>{comment.text}</p>
                  </div>
                  <div className="mt-2 flex space-x-2 items-center">
                    {/* <p>{comment.vote.length}</p> */}
                    <p>+4</p>
                    <hr className="border border-gray-200 h-5" />

                    <button onClick={(e) => handleVote(e, true, comment.id)}>
                      <ChevronUpIcon width={20} height={20} color="black" />
                    </button>
                    <hr className="border border-gray-200 h-5" />
                    <button onClick={(e) => handleVote(e, false, comment.id)}>
                      <ChevronDownIcon width={20} height={20} color="black" />
                    </button>
                    <hr className="border border-gray-200 h-5" />
                  </div>
                </div>
              </div>
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
