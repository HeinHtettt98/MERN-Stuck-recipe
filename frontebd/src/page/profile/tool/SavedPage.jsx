import React from "react";
import ReceipeCard from "./../../../component/ReceipeCard";
import LoadingComponent from "../../../component/Loading";
import Lottie from "lottie-react";
import comment from "../../../public/forComment.json";
import { useGetSavedQuery } from "../../../store/service/UserEndpoint";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SavedPage = () => {
  const { _id } = useSelector((store) => store.user);
  const { isLoading, isError, error, data } = useGetSavedQuery(_id);
  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : isError ? (
        <div className="flex flex-col justify-center items-center h-[500px] ">
          <p className="text-xl text-red-400 font-semibold text-center">
            Something wrong. Please try again.
          </p>
        </div>
      ) : (
        <>
          {data?.length ? (
            <div className=" grid lg:grid-cols-2 md:grid-cols-1 gap-3">
              {data?.map((d, index) => (
                <ReceipeCard key={index} recipe={d} />
              ))}
            </div>
          ) : (
            <div className=" flex flex-col items-center gap-3">
              <Lottie
                animationData={comment}
                className=" w-8/12 max-h-[490px]"
                loop={true}
              />
              <p className="flex">You don't have saved recipe..</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default SavedPage;
