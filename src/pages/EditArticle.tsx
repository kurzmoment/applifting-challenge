import { useMutation, useQuery } from "@apollo/client";
import { Jelly } from "@uiball/loaders";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { EDIT_ARTICLE } from "../graphql/mutations";
import { GET_ARTICLE_BY_ID } from "../graphql/queries";
import Userfront from "@userfront/core";
import { getImagePath } from "../helpers/getImagePath";
import { getUserId } from "../helpers/getUserId";
import toast from "react-hot-toast";

type FormData = {
  title: string;
  image: string;
  content: string;
};

function EditArticle() {
  const navigate = useNavigate();
  const [imageState, setImageState] = useState<boolean>();
  const articleId = useLocation().pathname.slice(26);
  const { data, loading } = useQuery(GET_ARTICLE_BY_ID, {
    variables: {
      id: articleId,
    },
  });
  const [editArticle] = useMutation(EDIT_ARTICLE);

  const { register, handleSubmit } = useForm<FormData>();
  const imageInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  function handleButton(state: boolean) {
    setImageState(state);
  }
  const onSubmit = handleSubmit(async (formData) => {
    const notification = toast.loading("Editing Article...");
    const user_id = await getUserId(Userfront.user.email);
    if (imageState === true) {
      const imageURL = await getImagePath(imageInputRef.current);
      const {
        data: { editArticle: newArticle },
      } = await editArticle({
        variables: {
          id: articleId,
          title: formData.title,
          image: imageURL,
          body: formData.content,
          user_id: user_id,
        },
      });
      console.log(newArticle);
      toast.success("Article was edited! 🚀🔥", {
        id: notification,
      });
      navigate("/");
    } else if (imageState === false) {
      const {
        data: { editArticle: newArticle },
      } = await editArticle({
        variables: {
          id: articleId,
          title: formData.title,
          image: "",
          body: formData.content,
          user_id: user_id,
        },
      });
      console.log(newArticle);
      toast.success("Article was edited! 🚀🔥", {
        id: notification,
      });
      navigate("/");
    } else {
      if (formData.image === undefined) {
        const {
          data: { editArticle: newArticle },
        } = await editArticle({
          variables: {
            id: articleId,
            title: formData.title,
            image: data.getArticle.image,
            body: formData.content,
            user_id: user_id,
          },
        });
        toast.success("Article was edited! 🚀🔥", {
          id: notification,
        });
        console.log(newArticle);
        navigate("/");
      }
    }
  });
  if (Userfront.user.email === undefined) {
    return <Navigate to={"/login"} />;
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
      <form className="sm:w-1/2 sm:ml-72 sm:mr-0 mr-4 mb-8" onSubmit={onSubmit}>
        <div className="flex mt-5 ml-5 space-x-5 items-center self-center">
          <h1 className="text-3xl font-semibold">Edit article</h1>
          <button className="bg-blue-500 text-white pl-3 pr-3 p-2 rounded-md">
            Update Article
          </button>
        </div>
        <div className="flex flex-col mt-5 ml-5 space-y-2 ">
          <label className="font-semibold" htmlFor="title">
            ArticleTitle
          </label>
          <input
            {...register("title", { required: true })}
            className="border border-gray-400 rounded-md outline-none p-1 pl-2 "
            type="text"
            id="title"
            defaultValue={data.getArticle.title}
          />
        </div>
        <div className="flex flex-col mt-5 ml-5 space-y-2 w-2/4">
          <label className="font-semibold" htmlFor="title">
            Featured Image
          </label>
          <img
            className="h-24 w-36"
            src={data.getArticle.image}
            alt={data.getArticle.title}
          />
          <input
            className={
              imageState === true
                ? "border-none text-slate-500 rounded-md outline-none"
                : "hidden"
            }
            type="file"
            id="img"
            ref={imageInputRef}
          />
          <div className="flex space-x-2 mt-5">
            <p
              onClick={() => handleButton(true)}
              className="text-blue-500 cursor-pointer"
            >
              Upload new
            </p>
            <hr className="border border-gray-300 h-5" />
            <p
              onClick={() => handleButton(false)}
              className="text-red-500 cursor-pointer"
            >
              Delete
            </p>
          </div>
        </div>
        <div className="flex flex-col mt-5 ml-5 space-y-2 ">
          <label className="font-semibold" htmlFor="editor">
            Content
          </label>
          <textarea
            {...register("content", { required: true })}
            rows={8}
            className="border border-gray-400 rounded-md outline-none p-1 pl-2 "
            id="content"
            defaultValue={data.getArticle.body}
          ></textarea>
        </div>
      </form>
    );
  }
  return <div>NIC</div>;
}

export default EditArticle;
