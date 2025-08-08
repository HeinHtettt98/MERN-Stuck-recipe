import React, { useCallback, useEffect, useRef, useState } from "react";
import { useGetQuery } from "../store/service/ReceiveEndpoint";
import LoadingComponent from "../component/Loading";
import ReceipeCard from "../component/ReceipeCard";
import { useLocation, useNavigate } from "react-router-dom";
import SideBar from "../component/SideBar";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchRecipes from "../component/SearchRecipes";
import Lottie from "lottie-react";
import errorAnimation from "../public/errorAni.json";

const ReceipesHome = () => {
  const [page, setPage] = useState(1);
  const [item, setItem] = useState([]);
  const location = useLocation();
  const [searchItem, setSearchItem] = useState(null);
  const { data, isError, isLoading, error } = useGetQuery(page);

  const loadFunction = useCallback(() => {
    if (data?.recipes) {
      let existingIds = item.map((recipe) => recipe._id);
      setItem([
        ...item,
        ...data.recipes.filter((recipe) => !existingIds.includes(recipe._id)),
      ]);
    }
  }, [data]);

  useEffect(() => {
    if (location.search == "") {
      setSearchItem(null);
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
    loadFunction();
  }, [loadFunction, location]);
  const nextPageHandel = () => {
    setPage(page + 1);
  };
  return (
    <div className=" mt-[40px] max-w-[1200px] h-screen flex md:justify-end sm:justify-center mx-auto p-5">
      <div className="bg-gray-300 fixed left-0 h-screen">
        <SideBar setSearchItem={setSearchItem} setItem={setItem} />
      </div>
      {searchItem ? (
        <div className="w-full grid lg:grid-cols-2 md:grid-cols-1 gap-4 md:w-8/12">
          {searchItem.map((item, index) => (
            <ReceipeCard key={index} recipe={item} />
          ))}
        </div>
      ) : (
        <div className=" md:w-7/12 lg:w-9/12 w-11/12">
          <div className=" sm:block w-full md:hidden mt-3">
            <SearchRecipes setSearchItem={setSearchItem} />
          </div>
          {isLoading ? (
            <div className=" w-full">
              <LoadingComponent />
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center w-10/12 mx-auto justify-center h-[400px]">
              <Lottie className="w-1/2" animationData={errorAnimation} />
              <p className="text-base font-semibold">
                There is something wrong. Please, reload the page.
              </p>
            </div>
          ) : (
            <>
              {item.length ? (
                <div className="w-full">
                  <InfiniteScroll
                    dataLength={item.length} //This is important field to render the next data
                    next={nextPageHandel}
                    hasMore={data.pagenation.nextPage}
                    loader={<h4 className=" text-center">Loading...</h4>}
                    endMessage={
                      <p
                        style={{ textAlign: "center" }}
                        className="mt-auto text-base text-primary"
                      >
                        No more recipes..
                      </p>
                    }
                  >
                    <div className="grid lg:grid-cols-2 md:grid-cols-1  gap-4">
                      {item.map((recipe) => (
                        <ReceipeCard key={recipe._id} recipe={recipe} />
                      ))}
                    </div>
                  </InfiniteScroll>
                </div>
              ) : (
                <div className="flex flex-col items-center w-10/12 mx-auto justify-center h-[400px]">
                  <Lottie className="w-1/2" animationData={errorAnimation} />
                  <p className="text-base font-semibold">
                    There is no recipe available. Please, create a recipe.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ReceipesHome;
