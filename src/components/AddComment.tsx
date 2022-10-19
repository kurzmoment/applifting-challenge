import React from "react";
import { useForm } from "react-hook-form";
import Avatar from "./Avatar";
import Userfront from "@userfront/core";
import { useLocation } from "react-router-dom";
import client from "../apollo-client";
import { GET_USERS } from "../graphql/queries";
import { INSERT_COMMENT } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

type FormData = {
  content: string;
  user_id: number;
  article_id: number;
};

function AddComment() {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    // formState: { errors },
  } = useForm<FormData>();
  const articleId = useLocation().pathname.slice(16);
  const [insertComment] = useMutation(INSERT_COMMENT);

  const onSubmit = handleSubmit(async (formData) => {
    formData.article_id = Number(articleId);

    //   TODO: Z TOHOHOLE EXPORT FUNCTION
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
