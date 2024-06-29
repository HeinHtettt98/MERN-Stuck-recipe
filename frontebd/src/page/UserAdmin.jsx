import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdDeleteForever } from "react-icons/md";
import { useDestoryUserMutation } from "../store/service/AdminEndpoint";

const UserAdmin = ({ user }) => {
  const [fun, { isLoading }] = useDestoryUserMutation();
  return (
    <div className=" flex justify-between border-b-[1px] border-gray-400">
      <div className=" flex gap-3  items-center">
        <Avatar className=" w-10 h-10">
          <AvatarImage
            src={
              user.photo
                ? import.meta.env.VITE_BACKEND_ASSURL + user.photo
                : import.meta.env.VITE_BACKEND_ASSURL + "/default.png"
            }
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <p className=" text-lg">{user.name}</p>
          <span className="text-slate-400 text-sm">
            {`${user?.createdCount?.length} ${
              user?.createdCount?.length > 1 ? "recipes" : "recipe"
            }  created`}
          </span>
        </div>
      </div>
      <button
        className=" mr-2 relative"
        onClick={async (e) => {
          e.stopPropagation();
          await fun(user._id);
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

export default UserAdmin;
