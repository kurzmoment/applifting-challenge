import MDEditor from "@uiw/react-md-editor";
import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

type Props = {
  article: ArticleTypes;
};

function Article({ article }: Props) {
  document.documentElement.setAttribute("data-color-mode", "light");
  return (
    <div className="mt-8 mb-8">
      <div className="flex sm:flex-row flex-col">
        <div className="lg:ml-72">
          <img
            className="sm:h-[244px] sm:w-[390px] h-[250px] m-auto rounded-sm lg:p-0 p-4"
            src={
              article.image === ""
                ? "https://www.crystalair.ie/wp-content/plugins/post-grid/assets/frontend/images/placeholder.png"
                : article.image
            }
            alt={article.title}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl sm:text-2xl font-semibold ml-5">
            {article.title}
          </h3>
          <div className="ml-5 mt-3 text-gray-400 flex space-x-4 text-xs sm:text-sm">
            <p>{article.user.name}</p>
            <p>•</p>
            <p>{moment(article.created_at).format("MMMM Do YYYY")}</p>
          </div>
          <div className="ml-5 mt-3 w-4/5 lg:w-3/5">
            <MDEditor.Markdown
              source={article.body.slice(0, 450) + "More in detail ..."}
              data-color-mode
            />
          </div>
          <div className="ml-5 mt-3 flex space-x-4">
            <Link
              to={`/article-detail/${article.id}`}
              className="text-blue-500"
            >
              Read whole article
            </Link>
            <p>{article.commentList.length} Comments</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Article;
