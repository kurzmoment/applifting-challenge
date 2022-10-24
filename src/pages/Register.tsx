import React from "react";
import { Navigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import Userfront from "@userfront/core";

function Register() {
  if (Userfront.user.email) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <RegisterForm />
    </>
  );
}

export default Register;
