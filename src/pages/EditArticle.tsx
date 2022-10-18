import { useQuery } from "@apollo/client";
import { Jelly } from "@uiball/loaders";
import MDEditor from "@uiw/react-md-editor";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { GET_ARTICLE_BY_ID } from "../graphql/queries";

type FormData = {
  title: string;
  image: string;
  content: string;
};

function EditArticle() {
  const articleId = useLocation().pathname.slice(26);
  const { data, loading, error } = useQuery(GET_ARTICLE_BY_ID, {
    variables: {
      id: articleId,
    },
  });

  const {
    register,
    // setValue,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm<FormData>();
  const imageInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  //   function handleDeleteButton(e: Event) {
  //     e.preventDefault();
  //     setDeleteImage(true);
  //   }
  //   function handleUploadNewButton(e: Event) {
  //     e.preventDefault();
  //     setImageState(true);
  //   }

  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData);
  });
  console.log(error);

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
          {/* <input
            className={
              imageState === true
                ? "border-none text-slate-500 rounded-md outline-none"
                : "hidden"
            }
            type="file"
            id="img"
            ref={imageInputRef}
          /> */}
          <div className="flex space-x-2 mt-5">
            {/* <button
              onClick={() => handleUploadNewButton}
              className="text-blue-500"
            >
              Upload new
            </button>
            <hr className="border border-gray-300 h-5" />
            <button onClick={() => handleDeleteButton} className="text-red-500">
              Delete
            </button> */}
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
            name=""
            id="content"
          >
            {data.getArticle.body}
          </textarea>
          {/* <MDEditor
            value={(value = data.getArticle.body)}
            onChange={(val) => setValue(val!)}
            id="editor"
          /> */}
        </div>
      </form>
    );
  }
  return <div>NIC</div>;
}

export default EditArticle;
