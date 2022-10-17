import MDEditor from "@uiw/react-md-editor";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  article: ArticleTypes;
};

function Article({ article }: Props) {
  return (
    <div className="mt-8 mb-8">
      <div className="flex sm:flex-row flex-col">
        <div className="lg:ml-72">
          <img
            className="sm:h-[244px] sm:w-[390px] h-[250px] m-auto rounded-sm lg:p-0 p-4"
            src={article.image}
            alt="cat"
          />
        </div>
        <div>
          <h3 className="text-2xl sm:text-2xl font-semibold ml-5">
            {article.title}
          </h3>
          <div className="ml-5 mt-3 text-gray-400 flex space-x-4 text-xs sm:text-sm">
            <p>{article.user.name}</p>
            <p>•</p>
            <p>{article.created_at}</p>
          </div>
          <div className="ml-5 mt-3 w-4/5 lg:w-3/5">
            <MDEditor.Markdown source={article.body} />
          </div>
          <div className="ml-5 mt-3 flex space-x-4">
            <Link
              to={`/article-detail/${article.id}`}
              className="text-blue-500"
            >
              Read whole article
            </Link>
            <p>0 Comments</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Article;
