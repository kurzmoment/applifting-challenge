import React from "react";

function Header() {
  return (
    <div className="flex items-center self-center top-0 text-center bg-white px-4 py-4 shadow-sm sticky z-50 ">
      <div className="flex flex-1 ml-5 lg:ml-72 space-x-5">
        <img src="logo.svg" alt="logo" />
        <ul className="flex space-x-5 items-center">
          <li className="text-black">Recent Articles</li>
          <li className="text-gray-400">About</li>
        </ul>
      </div>
      <div className="mr-5 lg:mr-72">
        <p className="text-blue-400">Sign In</p>
      </div>
    </div>
  );
}

export default Header;
