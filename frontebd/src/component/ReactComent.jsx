import React, { useState } from "react";
import { useReactionMutation } from "../store/service/ReceiveEndpoint";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";

const ReactComent = ({ react, comment, id, _id, setOpen }) => {
  const [fun] = useReactionMutation();
  const [reaction, setReaction] = useState(false);
  const [heart, setHeart] = useState(react);
  const reactionFun = async (e) => {
    e.stopPropagation();
    if (_id !== "") {
      await fun(id);
      setHeart(heart + 1);
      setReaction(true);
    } else {
      setOpen(true);
    }
  };
  return (
    <div className="flex gap-2">
      <button
        disabled={reaction}
        className=" mr-2 relative"
        onClick={reactionFun}
      >
        <IoMdHeartEmpty size={"1.5em"} className=" text-primary" />
        {!react == 0 && (
          <span className="absolute top-[-5px] right-[-5px] w-[15px] h-[15px] rounded-full text-xs text-white bg-red-400 leading-[15px] border border-white">
            {heart}
          </span>
        )}
      </button>
      <button className=" mr-2 relative">
        <FaRegComment size={"1.5em"} className=" text-primary" />
        {!comment == 0 && (
          <span className="absolute top-[-5px] right-[-5px] w-[15px] h-[15px] rounded-full text-xs text-white bg-red-400 leading-[15px] border border-white">
            {comment}
          </span>
        )}
      </button>
    </div>
  );
};

export default ReactComent;
