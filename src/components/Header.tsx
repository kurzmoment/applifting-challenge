import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Userfront from "@userfront/core";
Userfront.init(process.env.REACT_APP_USERFRONT_KEY as string);

function Header() {
  const location = useLocation();
  console.log(location.pathname);
  async function handleLogOut() {
    await Userfront.logout({ redirect: "/" }).catch((error) => {
      console.log(error);
    });
    localStorage.setItem("jwt", "");
    window.location.reload();
  }

  return (
    //TODO: SHOULD BE MORE RESPONSIVE
    <div className="flex items-center self-center top-0 text-center bg-white px-4 py-4 shadow-md sticky z-50 ">
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
          {/* <li className="text-gray-400">About</li> */}
          <li className="text-black">{Userfront.user.name}</li>
        </ul>
      </div>
      <div className="mr-5 lg:mr-72">
        {!Userfront.tokens.idToken && (
          <Link className="text-blue-400" to="/login">
            Log In
          </Link>
        )}
        {Userfront.tokens.idToken && (
          <div className="space-x-5">
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
            <button className="text-blue-400" onClick={handleLogOut}>
              Log Out
            </button>
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default Header;
