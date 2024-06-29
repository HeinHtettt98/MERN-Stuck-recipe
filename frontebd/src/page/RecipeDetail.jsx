import React, { useState } from "react";
import {
  useCommentMutation,
  useShowQuery,
} from "../store/service/ReceiveEndpoint";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Comment from "../component/Comment";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import DOMPurify from "dompurify";
import DetailPageLoading from "./DetailPageLoading";
import Ingredient from "../component/Ingredient";

const RecipeDetail = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const { data, isLoading, isError } = useShowQuery(id);
  const [fun] = useCommentMutation();
  const { _id } = useSelector((store) => store.user);
  const [comment, setComment] = useState("");
  const colors = ["#0697d9", "#f87171", "#facc15", "#4ade80", "#dc2626"];
  const handelComment = async () => {
    if (comment.length == 0) {
      return;
    }
    await fun({
      id,
      data: {
        author: _id,
        text: comment,
      },
    });
    setComment("");
  };
  return (
    <div className=" mt-[40px] max-w-[1200px] mx-auto p-5">
      {isLoading ? (
        <DetailPageLoading />
      ) : isError ? (
        <div>{error.data.error}</div>
      ) : (
        <>
          {!data ? (
            <DetailPageLoading />
          ) : (
            <div className="flex lg:justify-end lg:flex-row sm:items-center gap-3 sm:flex-col mt-3">
              <div className="lg:w-8/12 sm:w-full rounded-2xl sm:block p-5 lg:fixed top-[70px] left-5 bg-accent ">
                <div className=" flex justify-between h-[520px] rounded-2xl p-6 bg-white">
                  <div className=" w-5/12 rounded-xl overflow-hidden">
                    <img
                      className=" w-full object-cover h-full"
                      src={import.meta.env.VITE_BACKEND_ASSURL + data.photo}
                    />
                  </div>
                  <div className=" w-6/12 h-auto flex relative flex-col gap-3">
                    <h1 className=" text-2xl font-semibold">{data.title}</h1>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(data.description),
                      }}
                    />
                    <div className=" flex flex-col gap-2">
                      <p className="text-xl">Sauce included </p>
                      <div className="">
                        {!!data.ingredients.length && (
                          <Ingredient ingredients={data.ingredients} />
                        )}
                      </div>
                      <div className=" w-full bottom-0 flex justify-between absolute">
                        <button
                          onClick={() => {
                            nav("/");
                          }}
                        >
                          <FaRegArrowAltCircleLeft
                            size={"2em"}
                            className=" text-primary"
                            // style={{ color: "#facc15" }}
                          />
                        </button>
                        <div className=" w-72 h-[32px]">
                          <div className="relative w-full">
                            <input
                              type="text"
                              value={comment}
                              onChange={(e) => {
                                setComment(e.target.value);
                              }}
                              onBlur={handelComment}
                              onKeyUp={(e) => {
                                if (e.key === "Enter") {
                                  handelComment();
                                }
                              }}
                              id="simple-search"
                              className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full ps-10 pc-2 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="You can comment here..."
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" lg:w-3/12 sm:w-full">
                <Comment _id={data._id} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RecipeDetail;
