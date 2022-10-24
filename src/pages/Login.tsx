import React from "react";
import LoginForm from "../components/LoginForm";
import Userfront from "@userfront/core";
import { Navigate } from "react-router-dom";

function Login() {
  if (Userfront.user.email) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <LoginForm />
    </>
  );
}

export default Login;
