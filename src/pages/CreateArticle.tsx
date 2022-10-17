import React, { useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { ADD_ARTICLE } from "../graphql/mutations";
import client from "../apollo-client";
import { GET_USERS } from "../graphql/queries";
import Userfront from "@userfront/core";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type FormData = {
  title: string;
  image: string;
  content: string;
};

function CreateArticle() {
  const navigate = useNavigate();
  const {
    register,
    // setValue,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm<FormData>();
  const [value, setValue] = React.useState("");
  const [addArticle] = useMutation(ADD_ARTICLE);
  const imageInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const onSubmit = handleSubmit(async (formData) => {
    const notification = toast.loading("Adding new article");
    try {
      if (value === "") {
        toast.error("Enter some content", {
          id: notification,
        });
      } else {
        const {
          data: { getUserList },
        } = await client.query({
          query: GET_USERS,
        });
        var user_id: number = 0;
        console.log(getUserList);
        getUserList.map((u: User) => {
          if (u.email === Userfront.user.email) {
            user_id = u.id;
          }
          return user_id;
        });
        console.log(user_id);

        const enteredImage = imageInputRef.current;

        const data = new FormData();
        //@ts-ignore
        for (var file of enteredImage.files) {
          data.append("file", file);
        }

        data.append("upload_preset", "applifting");

        const imageData = await fetch(
          "https://api.cloudinary.com/v1_1/di8ushvnv/image/upload",
          {
            method: "POST",
            body: data,
          }
        ).then((r) => r.json());

        const newImageURL = imageData.secure_url;
        console.log(newImageURL);

        formData.content = value;
        formData.image = newImageURL;
        const {
          data: { insertArticle: newArticle },
        } = await addArticle({
          variables: {
            title: formData.title,
            image: formData.image,
            body: formData.content,
            user_id: user_id,
          },
        });
        console.log("New article was added: ", newArticle);
        toast.success("Article was added! 🚀🔥", {
          id: notification,
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <form className="sm:w-1/2 sm:ml-72 sm:mr-0 mr-4 mb-8" onSubmit={onSubmit}>
      <div className="flex mt-5 ml-5 space-x-5 items-center self-center">
        <h1 className="text-3xl font-semibold">Create New Article</h1>
        <button className="bg-blue-500 text-white pl-3 pr-3 p-2 rounded-md">
          Publish Article
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
        />
      </div>
      <div className="flex flex-col mt-5 ml-5 space-y-2 w-2/4">
        <label className="font-semibold" htmlFor="title">
          Featured Image
        </label>
        <input
          className="border-none text-slate-500 rounded-md outline-none "
          type="file"
          id="img"
          required
          ref={imageInputRef}
        />
      </div>
      <div className="flex flex-col mt-5 ml-5 space-y-2 ">
        <label className="font-semibold" htmlFor="editor">
          Content
        </label>
        <MDEditor
          value={value}
          onChange={(val) => setValue(val!)}
          id="editor"
        />
      </div>
    </form>
  );
}

export default CreateArticle;
