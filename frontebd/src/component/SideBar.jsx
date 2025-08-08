import React, { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { MdEditCalendar } from "react-icons/md";
import { useLogoutMutation } from "../store/service/UserEndpoint";
import SearchRecipes from "./SearchRecipes";
import { useDispatch, useSelector } from "react-redux";
import { clearInform } from "../store/slice/userSlice";
import { IoLogIn } from "react-icons/io5";

const SideBar = ({ setSearchItem }) => {
  const { _id } = useSelector((state) => state.user);
  const [logoutFun] = useLogoutMutation();
  const nav = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      <aside
        className="fixed top-20 h-full border-r border-gray-800  left-0 transition-transform -translate-x-full md:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 overflow-y-auto  dark:bg-gray-800">
          <SearchRecipes setSearchItem={setSearchItem} />
          {_id == "" ? (
            <ul className="space-y-2 font-medium mt-5">
              <li>
                <Link
                  to="sign-in"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <IoLogIn className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Login</span>
                </Link>
              </li>
              <li>
                <Link
                  to="register"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <MdEditCalendar className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ms-3">Register</span>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="space-y-2 mt-5 font-medium">
              <li>
                <Link
                  to="user/profile"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    User Profile
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="create"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <MdEditCalendar className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ms-3">Create Recipe</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/user/profile/saved"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <BsBookmarkHeartFill className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Saved</span>
                </Link>
              </li>
              <li
                onClick={async () => {
                  await logoutFun();
                  dispatch(clearInform());
                }}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdLogout className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                <span className="flex-1 ms-3 whitespace-nowrap">Log out</span>
              </li>
            </ul>
          )}
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
