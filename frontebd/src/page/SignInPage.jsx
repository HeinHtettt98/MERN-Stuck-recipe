import React, { useEffect, useState } from "react";
import { useSignInMutation } from "../store/service/UserEndpoint";
import { Link, useNavigate } from "react-router-dom";
import AuthGard from "../component/guard/AuthGard";
import logo from "../public/login.svg";
import NavComponent from "../component/Nav.component";
import { useDispatch } from "react-redux";
import { getInform } from "../store/slice/userSlice";

const SignInPage = () => {
  const [fun, { isError, isLoading, isSuccess, error, data }] = useSignInMutation();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const nav = useNavigate();
  const dispatch = useDispatch();
  const loginHandel = async (e) => {
    e.preventDefault();
    await fun(login);
  };

  const onChangeHandal = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  console.log(isSuccess, isError, error);
  useEffect(() => {
    if (isSuccess) {
      dispatch(getInform(data?.user));
      nav("/user/profile");
    }
  }, [isSuccess]);

  return (
    <AuthGard>
      <NavComponent />
      <div className=" flex gap-3 justify-center max-w-[1200px] mt-28 mx-auto ">
        <div className=" w-[500px]">
          <img src={logo} className=" w-full h-full" alt="" />
        </div>
        <div className=" flex flex-col w-7/12 items-center bg-white rounded-md">
          <h1 className=" text-primary font-bold text-2xl mt-2">Login Form</h1>
          <form className=" p-4 w-full " onSubmit={loginHandel}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-primary dark:text-white"
              >
                Email
              </label>
              <input
                name="email"
                value={login.email}
                onChange={onChangeHandal}
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john.doe@company.com"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-primary dark:text-white"
              >
                Password
              </label>
              <input
                name="password"
                onChange={onChangeHandal}
                value={login.password}
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="•••••••••"
              />
            </div>
            <div>
              {isError && (
                <p className=" text-red-600 my-3">{error.data.error}</p>
              )}
            </div>
            <div className=" flex justify-between">
              <button
                type="submit"
                disabled={isLoading}
                className="text-white flex items-center  bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {isLoading && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 animate-spin"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                )}
                Login
              </button>
              <p>
                Don't have an account.Please{" "}
                <Link to={"/register"} className=" text-primary underline">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </AuthGard>
  );
};

export default SignInPage;
