import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_ARTICLES_BY_USER_ID } from "../graphql/queries";
import { Jelly } from "@uiball/loaders";
import Userfront from "@userfront/core";
import { Link } from "react-router-dom";
import { getUserId } from "../helpers/getUserId";

function MyArticles() {
  const [id, setId] = useState<number>();
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
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                  <div className="space-x-2 ">
                    <Link
                      className="font-medium text-blue-600  hover:underline"
                      to={`edit-article/${article.id}`}
                    >
                      Edit
                    </Link>

                    <a
                      href="/"
                      className="font-medium text-blue-600  hover:underline"
                    >
                      Remove
                    </a>
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
