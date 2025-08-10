import React from "react";
import { useCreatedCountQuery } from "../../../store/service/UserEndpoint";
import ReceipeCard from "./../../../component/ReceipeCard";
import LoadingComponent from "../../../component/Loading";
import Lottie from "lottie-react";
import comment from "../../../public/forComment.json";
import { Link } from "react-router-dom";

const MyRecipe = () => {
  const { data, isLoading, isError, error } = useCreatedCountQuery();

  return (
    <div className="">
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
            <div className=" grid md:grid-cols-1 lg:grid-cols-2 gap-3">
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
              <p className="flex">
                You don't have recipe.
                <Link to={"/create"} className=" text-primary ml-1 underline">
                  Let's create..
                </Link>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyRecipe;
