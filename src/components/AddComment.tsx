import React from "react";
import { useForm } from "react-hook-form";
import Avatar from "./Avatar";
import Userfront from "@userfront/core";
import { useLocation } from "react-router-dom";
import { INSERT_COMMENT } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import { getUserId } from "../helpers/getUserId";

type FormData = {
  content: string;
  user_id: number;
  article_id: number;
};

function AddComment() {
  const { register, setValue, handleSubmit, watch } = useForm<FormData>();
  const articleId = useLocation().pathname.slice(16);
  const [insertComment] = useMutation(INSERT_COMMENT);

  const onSubmit = handleSubmit(async (formData) => {
    formData.article_id = Number(articleId);
    const user_id = await getUserId(Userfront.user.email);
    formData.user_id = user_id;

    const {
      data: { insertComment: newComment },
    } = await insertComment({
      variables: {
        article_id: formData.article_id,
        text: formData.content,
        user_id: formData.user_id,
      },
    });
    setValue("content", "");
    console.log(newComment);
  });
  return (
    <form onSubmit={onSubmit} className="mt-4 items-center">
      <div className="flex space-x-4  sm:mr-10">
        <Avatar seed={Userfront.user.email} />
        <input
          {...register("content", { required: true })}
          className="outline-none border border-gray-300 flex-1 p-1 pl-2 rounded-sm"
          type="text"
          placeholder="Join the discussion"
        />
      </div>
      {!!watch("content") && (
        <div className="flex justify-end items-center mt-2 sm:mr-10">
          <button className=" bg-blue-500 text-white font-semibold mt-2 p-2 rounded-lg">
            Post Comment
          </button>
        </div>
      )}
    </form>
  );
}

export default AddComment;
