import React from "react";
import { Link, Outlet } from "react-router-dom";
import Userfront from "@userfront/core";
Userfront.init(process.env.REACT_APP_USERFRONT_KEY as string);

function Header() {
  async function handleLogOut() {
    await Userfront.logout({ redirect: "/" }).catch((error) => {
      console.log(error);
    });
    localStorage.setItem("jwt", "");
    window.location.reload();
  }
  console.log(Userfront.tokens.idToken);

  return (
    <div className="flex items-center self-center top-0 text-center bg-white px-4 py-4 shadow-sm sticky z-50 ">
      <div className="flex flex-1 ml-5 lg:ml-72 space-x-5">
        <img src="logo.svg" alt="logo" />
        <ul className="flex space-x-5 items-center">
          <li className="text-black">Recent Articles</li>
          <li className="text-gray-400">About</li>
          <li className="text-black">{Userfront.user.name}</li>
        </ul>
      </div>
      <div className="mr-5 lg:mr-72">
        {/* (localStorage.getItem("jwt") === undefined ||
          localStorage.getItem("jwt") === "") */}
        {!Userfront.tokens.idToken && (
          <Link className="text-blue-400" to="/login">
            Log In
          </Link>
        )}
        {Userfront.tokens.idToken && (
          <button className="text-blue-400" onClick={handleLogOut}>
            Log Out
          </button>
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default Header;
