import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingComponent = () => {
  const arr = [1, 2, 3, 4, 5];
  return (
    <div className="space-y-4 grid lg:grid-cols-2 md:grid-cols-1 gap-3 ">
      {arr.map((i) => (
        <div key={i} className=" animate-pulse mt-3 lg:max-w-[350px] md:w-full h-80 p-2 rounded-lg border-gray-300 border">
          <div className="p-3 flex flex-col gap-3">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-7 w-7 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-2 w-[150px]" />
                <Skeleton className="h-1 w-[50px]" />
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <Skeleton className="h-[200px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-2 w-[150px]" />
                <Skeleton className="h-2 w-[150px]" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingComponent;
