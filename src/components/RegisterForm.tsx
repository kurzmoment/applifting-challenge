import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Userfront from "@userfront/core";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../graphql/mutations";
import client from "../apollo-client";

Userfront.init(process.env.REACT_APP_USERFRONT_KEY as string);

type FormData = {
  name: string;
  email: string;
  password: string;
};

function RegisterForm() {
  const {
    register,
    // setValue,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm<FormData>();
  const [addUser] = useMutation(ADD_USER);

  const onSubmit = handleSubmit(async (formData) => {
    const notification = toast.loading("Signing in!");

    try {
      const res = await Userfront.signup({
        method: "password",
        name: formData.name,
        email: formData.email,
        password: formData.password,
        redirect: "/",
      })
        .then(async () => {
          const {
            data: { insertUser: newUser },
          } = await addUser({
            variables: {
              email: formData.email,
              name: formData.name,
            },
          });
          console.log("New user was created: ", newUser);
        })
        .catch((error) => {
          console.log(error);
          if (formData?.password.length < 8) {
            toast.error(
              "Password must be at least 16 characters OR at least 8 characters including a number and a letter ",
              {
                id: notification,
              }
            );
          } else {
            toast.error("Email already exists", {
              id: notification,
            });
          }
        });
      localStorage.setItem("jwt", Userfront.tokens.idToken);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="shadow-2xl m-auto w-72 sm:w-96 p-10 flex flex-col rounded-lg mt-10">
      <h1 className="font-semibold text-3xl text-start">Sign In</h1>
      <form className="" onSubmit={onSubmit}>
        <div className="flex flex-col mt-4 flex-1">
          <label className="font-semibold" htmlFor="name">
            Full Name
          </label>
          <input
            {...register("name", { required: true })}
            className="border border-gray-300 rounded-md p-1 pl-2 mt-2 outline-none"
            id="name"
            type="text"
            placeholder="Jan Novak"
          />
        </div>
        <div className="flex flex-col mt-4 flex-1">
          <label className="font-semibold" htmlFor="email">
            Email
          </label>
          <input
            {...register("email", { required: true })}
            className="border border-gray-300 rounded-md p-1 pl-2 mt-2 outline-none"
            id="email"
            type="email"
            placeholder="me@example.com"
          />
        </div>
        <div className="flex flex-col mt-4 flex-1">
          <label className="font-semibold" htmlFor="psw">
            Passowrd
          </label>
          <p className="text-xs">
            (Password must be at least 16 characters OR at least 8 characters
            including a number and a letter)
          </p>
          <input
            {...register("password", { required: true })}
            className="border border-gray-300 rounded-md p-1 pl-2 mt-2 outline-none"
            id="psw"
            type="password"
            placeholder="*******"
          />
        </div>
        <div>
          <Link className="text-xs" to="/login">
            Already have account? Click here for Log In!
          </Link>
        </div>
        <div className="mt-8 text-right">
          <button className="bg-blue-500 text-white pl-3 pr-3 p-2 rounded-md">
            Sign In
          </button>
        </div>
      </form>
      <Outlet />
    </div>
  );
}

export default RegisterForm;
