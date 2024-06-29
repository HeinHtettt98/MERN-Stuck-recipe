import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const DetailPageLoading = () => {
  return (
    <div className="p-3 flex justify-between animate-pulse gap-3 mt-5">
      <div className="flex border w-8/12 h-[450px] p-4 border-gray-300 justify-around space-x-4">
        <Skeleton className="h-[410px] -ml-5 w-[300px] rounded-xl" />
        <div className="space-y-5">
          <Skeleton className="h-3 w-[200px]" />
          <Skeleton className="h-1 w-[50px]" />
          <div className=" space-y-4">
            <Skeleton className="h-3 w-[250px]" />
            <Skeleton className="h-3 w-[230px]" />
            <Skeleton className="h-3 w-[240px]" />
            <Skeleton className="h-3 w-[210px]" />
            <Skeleton className="h-3 w-[250px]" />
            <Skeleton className="h-3 w-[220px]" />
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <Skeleton className="h-[450px] w-[250px] rounded-xl" />
      </div>
    </div>
  );
};

export default DetailPageLoading;
