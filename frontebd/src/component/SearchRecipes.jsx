import React, { useEffect, useState } from "react";
import { useSearchMutation } from "../store/service/ReceiveEndpoint";
import { Link, useNavigate } from "react-router-dom";


const SearchRecipes = ({setSearchItem}) => {
  const [fun, { data }] = useSearchMutation();
    const nav = useNavigate();
    const [titles, setTitles] = useState("");
    useEffect(() => {
      if (data) {
        setSearchItem(data);
        nav(`/?title=${titles}`);
      }
    }, [data, setSearchItem, nav, titles]);
    const searchRecipe = async () => {
      if (titles == "") {
        return;
      }
      await fun(titles);
      setTitles("");
    };
  return (
    <div>
      <li className="flex items-center max-w-sm lg:static mx-auto">
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
              />
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            value={titles}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                searchRecipe();
              }
            }}
            onBlur={searchRecipe}
            onChange={(e) => {
              setTitles(e.target.value);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search recipe name..."
            required
          />
        </div>
        <button
          onClick={searchRecipe}
          className="p-2.5 ms-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </li>
    </div>
  );
};

export default SearchRecipes;
