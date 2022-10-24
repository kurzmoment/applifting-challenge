import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_ARTICLES_BY_USER_ID, GET_ARTICLE_BY_ID } from "../graphql/queries";
import { Jelly } from "@uiball/loaders";
import Userfront from "@userfront/core";
import { Link, Navigate } from "react-router-dom";
import { getUserId } from "../helpers/getUserId";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  DELETE_COMMENT_BY_ARTICLE_ID,
  DELETE_VOTE_BY_ARTICLE_ID,
  REMOVE_ARTICLE,
} from "../graphql/mutations";

function MyArticles() {
  const [id, setId] = useState<number>();
  const [removeArticle] = useMutation(REMOVE_ARTICLE, {
    refetchQueries: [GET_ARTICLE_BY_ID, "getArticle"],
  });
  const [deleteVote] = useMutation(DELETE_VOTE_BY_ARTICLE_ID, {
    refetchQueries: [GET_ARTICLE_BY_ID, "getArticle"],
  });

  const [deleteComment] = useMutation(DELETE_COMMENT_BY_ARTICLE_ID, {
    refetchQueries: [GET_ARTICLE_BY_ID, "getArticle"],
  });
  useEffect(() => {
    async function userId() {
      const user_id = await getUserId(Userfront.user.email);
      setId(user_id);
    }
    userId();
  }, []);

  const { data, loading } = useQuery(GET_ARTICLES_BY_USER_ID, {
    variables: {
      id: id,
    },
  });
  if (Userfront.user.email === undefined) {
    return <Navigate to={"/login"} />;
  }

  async function handleRemoveArticle(article_id: number) {
    try {
      const {
        data: { deleteVote: deletedVote },
      } = await deleteVote({
        variables: {
          article_id: article_id,
        },
      });
      console.log(deletedVote);

      const {
        data: { deleteComment: deletedComment },
      } = await deleteComment({
        variables: {
          article_id: article_id,
        },
      });
      console.log(deletedComment);

      const {
        data: { deleteVote: deleteArticle },
      } = await removeArticle({
        variables: {
          id: article_id,
        },
      });
      console.log(deleteArticle);
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-1 text-3xl items-center justify-center m-8">
        <Jelly size={80} speed={0.9} color="black" />
      </div>
    );
  }
  if (data) {
    return (
      <div className="mt-10 sm:ml-72 sm:mr-72 overflow-x-auto relative shadow-md sm:rounded-lg">
        <div className="flex space-x-4 mb-4 items-center sm:m-4 m-2">
          <h1 className="font-semibold sm:text-4xl text-3xl">My Articles</h1>
          <Link
            to={"/create-article"}
            className="bg-blue-500 p-2 text-white rounded-lg"
          >
            Create new article
          </Link>
        </div>
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">
                Article Title
              </th>
              <th scope="col" className="py-3 px-6">
                Content
              </th>
              <th scope="col" className="py-3 px-6">
                Author
              </th>
              <th scope="col" className="py-3 px-6">
                # of Comments
              </th>
              <th scope="col" className="py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.getArticleUsingUser_id.map((article: ArticleTypes) => (
              <tr
                key={article.id}
                className="bg-white border-b  hover:bg-gray-50 "
              >
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                >
                  {article.title}
                </th>
                <td className="py-4 px-6">
                  {article.body.slice(0, 30) + "..."}
                </td>
                <td className="py-4 px-6">{article.user.name}</td>
                <td className="py-4 px-6">{article.commentList.length}</td>
                <td className="py-4 px-6">
                  <div className="space-x-4 flex items-center ">
                    <Link
                      className="font-medium hover:underline"
                      to={`edit-article/${article.id}`}
                    >
                      <PencilIcon width={20} height={20} />
                    </Link>

                    <TrashIcon
                      onClick={() => handleRemoveArticle(article.id)}
                      className="cursor-pointer"
                      width={20}
                      height={20}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  if (!data) {
    <h1>No articles yet!</h1>;
  }

  return (
    <div className="flex flex-1 text-3xl items-center justify-center m-8">
      <Jelly size={80} speed={0.9} color="black" />
    </div>
  );
}

export default MyArticles;
