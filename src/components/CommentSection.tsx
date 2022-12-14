import { useMutation } from "@apollo/client";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import ReactTimeago from "react-timeago";
import { DELETE_VOTE, EDIT_VOTE, INSERT_VOTE } from "../graphql/mutations";
import { GET_ARTICLE_BY_ID } from "../graphql/queries";
import Userfront from "@userfront/core";
import Avatar from "./Avatar";
import { getUserId } from "../helpers/getUserId";
import toast from "react-hot-toast";

type Props = {
  comment: CommentType;
  data: any;
};

function CommentSection({ comment, data }: Props) {
  const [vote, setVote] = useState<[number, number]>();

  const [insertVote] = useMutation(INSERT_VOTE, {
    refetchQueries: [GET_ARTICLE_BY_ID, "getArticle"],
  });
  const [editVote] = useMutation(EDIT_VOTE, {
    refetchQueries: [GET_ARTICLE_BY_ID, "getArticle"],
  });

  const [deleteVote] = useMutation(DELETE_VOTE, {
    refetchQueries: [GET_ARTICLE_BY_ID, "getArticle"],
  });

  function displayVotes(comment: CommentType) {
    const votes: Vote[] = comment?.voteList;
    const displayNumber = votes?.reduce(
      (total, vote) => (vote.upvote === 1 ? (total += 1) : (total -= 1)),
      0
    );

    if (votes.length === 0) return 0;
    if (displayNumber === 0) {
      return votes[0]?.upvote ? 1 : -1;
    }
    return displayNumber;
  }
  async function upVote(isUpvote: number, comment_id: number) {
    if (Userfront.user.email === undefined) {
      const notification = toast.error("You'll need to sign in to Vote!");
    } else {
      setVote([isUpvote, comment_id]);
      const user_id = await getUserId(Userfront.user.email);
      data.getArticle.commentList.map(async (comment: CommentType) => {
        if (comment.id === comment_id) {
          if (comment.voteList[0]?.user.id === user_id) {
            if (comment.voteList[0].upvote === isUpvote) {
              console.log("You already made this decision");
              const {
                data: { deleteVote: deletedVote },
              } = await deleteVote({
                variables: {
                  id: comment.voteList[0].id,
                },
              });
              console.log(deletedVote);
            } else {
              const {
                data: { editVote: newVote },
              } = await editVote({
                variables: {
                  comment_id: vote?.[1],
                  upvote: vote?.[0],
                  user_id: user_id,
                  article_id: data.getArticle.id,
                },
              });
              console.log(newVote);
            }
          } else {
            const {
              data: { insertVote: newVote },
            } = await insertVote({
              variables: {
                comment_id: vote?.[1],
                upvote: vote?.[0],
                user_id: user_id,
                article_id: data.getArticle.id,
              },
            });
            console.log(newVote);
          }
        }
      });
    }
  }

  return (
    <div key={comment.id} className="mt-4 flex sm:mr-10">
      <div>
        <Avatar seed={comment.user.email} />
      </div>
      <div className="flex flex-col ml-4 mt-2">
        <div className="items-center space-x-2">
          <div className="flex space-x-2 items-center">
            <h5 className="font-semibold">{comment.user.name}</h5>
            <ReactTimeago
              className="text-xs text-gray-400"
              date={comment.created_at}
            />
          </div>
        </div>
        <div className="mt-2">
          <p>{comment.text}</p>
        </div>
        <div className="mt-2 flex space-x-2 items-center">
          <p className="font-semibold">{displayVotes(comment)}</p>
          <hr className="border border-gray-200 h-5" />
          <ChevronUpIcon
            onClick={() => upVote(1, comment.id)}
            width={20}
            height={20}
            color={"black"}
            className="cursor-pointer hover:bg-gray-300 m-1"
          />
          <hr className="border border-gray-200 h-5" />
          <ChevronDownIcon
            onClick={() => upVote(-1, comment.id)}
            width={20}
            height={20}
            color={"black"}
            className="cursor-pointer hover:bg-gray-300 m-1"
          />
          <hr className="border border-gray-200 h-5 " />
        </div>
      </div>
    </div>
  );
}

export default CommentSection;
