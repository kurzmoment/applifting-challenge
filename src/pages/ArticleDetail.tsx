import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { GET_ARTICLE_BY_ID, GET_USERS } from "../graphql/queries";
import { Jelly } from "@uiball/loaders";
import MDEditor from "@uiw/react-md-editor";
import RelatedArticles from "../components/RelatedArticles";
import AddComment from "../components/AddComment";
import Avatar from "../components/Avatar";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import TimeAgo from "react-timeago";
import moment from "moment";
import { EDIT_VOTE, INSERT_VOTE } from "../graphql/mutations";
import Userfront from "@userfront/core";
import client from "../apollo-client";

function ArticleDetail() {
  document.documentElement.setAttribute("data-color-mode", "light");
  const [vote, setVote] = useState<[number, number]>();
  const articleId = useLocation().pathname.slice(16);
  const { data, loading, error } = useQuery(GET_ARTICLE_BY_ID, {
    variables: {
      id: articleId,
    },
  });
  console.log(data);
  const [insertVote] = useMutation(INSERT_VOTE);
  const [editVote] = useMutation(EDIT_VOTE);

  async function handleVote(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    voteState: number,
    id: number
  ) {
    // e.preventDefault();
    setVote([voteState, id]);
    console.log(typeof vote?.[0]);
    const {
      data: { getUserList },
    } = await client.query({
      query: GET_USERS,
    });
    var user_id: number = 0;
    getUserList.map((u: User) => {
      if (u.email === Userfront.user.email) {
        user_id = u.id;
      }
      return user_id;
    });
    // TODO: DODELAT VOTE SYSTEM
    const {
      data: { insertVote: newVote },
    } = await insertVote({
      variables: {
        comment_id: vote?.[1],
        upvote: vote?.[0],
        user_id: user_id,
      },
    });
    console.log(newVote);
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
                    <p className="font-semibold">
                      {/* @ts-ignore */}
                      {comment.voteList.length !== 0
                        ? comment.voteList[0]?.upvote
                        : 0}
                    </p>
                    {/* <p>+4</p> */}
                    <hr className="border border-gray-200 h-5" />

                    <button onClick={(e) => handleVote(e, 1, comment.id)}>
                      <ChevronUpIcon width={20} height={20} color="black" />
                    </button>
                    <hr className="border border-gray-200 h-5" />
                    <button onClick={(e) => handleVote(e, -1, comment.id)}>
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
