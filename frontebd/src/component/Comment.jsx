import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetCommentQuery } from "../store/service/ReceiveEndpoint";
import Lottie from "lottie-react";
import comment from "../public/forComment.json";
import defaultt from "../public/default.png"

const Comment = ({ _id }) => {
  const { data } = useGetCommentQuery(_id);
   (data);
  return (
    <div className=" flex flex-col gap-6 mt-3">
      {!data?.length ? (
        <div className=" flex flex-col gap-2 items-center">
          <Lottie animationData={comment} loop={true} />
          <p className=" text-sm text-gray-500">Create new comment here..</p>
        </div>
      ) : (
        data.map((ment,index) => (
          <div key={index} className="flex gap-1 ">
            <Avatar className=" w-6 h-6">
              <AvatarImage
               src={
                ment?.author?.photo
                  ? import.meta.env.VITE_BACKEND_ASSURL + ment.author.photo
                  : defaultt
              }
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className=" text-sm">{ment?.author?.name}</p>
              <span className="">{ment?.text}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Comment;
