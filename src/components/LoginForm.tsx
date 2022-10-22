import React from "react";
import Userfront from "@userfront/core";
import { Link, Outlet } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

Userfront.init(process.env.REACT_APP_USERFRONT_KEY as string);

type FormData = {
  email: string;
  password: string;
};

function LoginForm() {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData);
    const notification = toast.loading("Login in!");

    try {
      const res = await Userfront.login({
        method: "password",
        email: formData.email,
        password: formData.password,
        redirect: "/",
      }).catch((error) => {
        console.log(error);
        toast.error("Something went wrong!", {
          id: notification,
        });
      });
      // setValue("email", "");
      // setValue("password", "");
      // localStorage.setItem("jwt", Userfront.tokens.idToken);
      console.log(res);
    } catch (error) {
      // setValue("email", formData.email);
      // setValue("password", formData.password);
      console.log(error);
    }
  });

  return (
    <div className="shadow-2xl m-auto w-72 sm:w-96 p-10 flex flex-col rounded-lg mt-10">
      <h1 className="font-semibold text-3xl text-start">Log In</h1>
      <form className="" onSubmit={onSubmit}>
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
          <input
            {...register("password", { required: true })}
            className="border border-gray-300 rounded-md p-1 pl-2 mt-2 outline-none"
            id="psw"
            type="password"
            required
            placeholder="*******"
          />
        </div>
        <div>
          <Link className="text-xs" to="/register">
            You don't have an account? Click here for Sign Up!
          </Link>
        </div>
        <div className="mt-8 text-right">
          <button className="bg-blue-500 text-white pl-3 pr-3 p-2 rounded-md">
            Log In
          </button>
        </div>
      </form>
      <Outlet />
    </div>
  );
}

export default LoginForm;
