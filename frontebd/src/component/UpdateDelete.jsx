import React from "react";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { useDeleteReceipeMutation } from "../store/service/ReceiveEndpoint";
import { useNavigate } from "react-router-dom";

const UpdateDelete = ({ id, recipe }) => {
  const [fun, { isLoading }] = useDeleteReceipeMutation();
  const nav = useNavigate();
  //    (recipe);
  return (
    <div className="flex gap-2">
      <button
        className=" mr-2 relative"
        onClick={(e) => {
          e.stopPropagation();
          nav("/create", {
            state: recipe,
          });
        }}
      >
        <GrDocumentUpdate className=" text-primary text-xl" />
      </button>
      <button
        className=" mr-2 relative"
        onClick={async (e) => {
          e.stopPropagation();
          await fun(id);
        }}
      >
        {isLoading ? (
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
        ) : (
          <MdDeleteForever className=" text-red-500 text-2xl" />
        )}
      </button>
    </div>
  );
};

export default UpdateDelete;
