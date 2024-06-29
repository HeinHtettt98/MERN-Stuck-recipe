import React, { useEffect, useRef } from "react";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { TbBrandMinecraft } from "react-icons/tb";
import { Link, NavLink } from "react-router-dom";
import { MdEditCalendar } from "react-icons/md";
import { IoReturnUpBackSharp } from "react-icons/io5";
import { MdAddAPhoto } from "react-icons/md";
import ProfileComponemt from "../../component/ProfileComponemt";
import { useDispatch, useSelector } from "react-redux";

const ProfileSideBar = () => {
  const { role } = useSelector((store) => store.user);

  const homeRef = useRef();
  useEffect(() => {
    homeRef.current.focus();
  }, []);

  return (
    <div>
      <aside
        className="fixed top-20 left-0 w-72 transition-transform -translate-x-full md:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto  dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <ProfileComponemt />
            <li>
              <NavLink
                exact
                ref={homeRef}
                to=""
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <TbBrandMinecraft className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">My Recipe</span>
              </NavLink>
            </li>
            {role == "admin" && (
              <li>
                <Link
                  to="admin"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ms-3">Dashboard</span>
                </Link>
              </li>
            )}
            <li>
              <NavLink
                to="/create"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdEditCalendar className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Create Recipe</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="uplode"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdAddAPhoto className="flex-shrink-0 w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Uplode</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="saved"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <BsBookmarkHeartFill className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Saved</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <IoReturnUpBackSharp className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className=" ms-3 whitespace-nowrap">Home</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default ProfileSideBar;
