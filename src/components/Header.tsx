import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Userfront from "@userfront/core";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
Userfront.init(process.env.REACT_APP_USERFRONT_KEY as string);

function Header() {
  const location = useLocation();
  async function handleLogOut() {
    await Userfront.logout({ redirect: "/" }).catch((error) => {
      console.log(error);
    });
    window.location.reload();
  }

  return (
    <div className="flex items-center self-center top-0 text-center bg-white sm:px-4 sm:py-4 py-4 shadow-md sticky z-50 ">
      <div className="flex flex-1 ml-5 lg:ml-72 space-x-5">
        <Link to={"/"}>
          <img src="logo.svg" alt="logo" />
        </Link>
        <ul className="flex space-x-5 items-center">
          <Link
            className={
              location.pathname === "/" ? `text-black` : `text-blue-400`
            }
            to="/"
          >
            Recent Articles
          </Link>
        </ul>
      </div>
      <div className="mr-5 lg:mr-72">
        {!Userfront.tokens.idToken && (
          <Link className="text-blue-400" to="/login">
            Log In
          </Link>
        )}
        {Userfront.tokens.idToken && (
          <div className="sm:space-x-5 space-x-2 sm:space-y-0 space-y-2 flex sm:flex-row flex-col items-center">
            <Link
              className={
                location.pathname === "/my-articles"
                  ? `text-black`
                  : `text-blue-400`
              }
              to="/my-articles"
            >
              My Articles
            </Link>
            <Link
              className={
                location.pathname === "/create-article"
                  ? `text-black`
                  : `text-blue-400`
              }
              to="/create-article"
            >
              Create Article
            </Link>
            <ArrowLeftOnRectangleIcon
              className="cursor-pointer h-5 w-5 text-blue-500"
              onClick={handleLogOut}
            />
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default Header;
