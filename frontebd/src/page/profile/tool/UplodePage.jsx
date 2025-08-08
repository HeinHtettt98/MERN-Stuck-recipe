import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { useUplodeProfileMutation } from "../../../store/service/UserEndpoint";
import { profileAdd } from "../../../store/slice/userSlice";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import "react-toastify/dist/ReactToastify.css";
import defaultt from "../../../public/default.png";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const UplodePage = () => {
  const [fun, { isLoading, data, isSuccess }] = useUplodeProfileMutation();
  const [file, setFile] = useState("");
  const dispath = useDispatch();
  const [preview, setPreview] = useState("");
  const [toast, setToast] = useState(false);
  const addProfileHandel = async () => {
    const formData = new FormData();
    formData.set("photo", file);
    await fun({ data: formData });
  };
  const previewPhotoHandel = (e) => {
    let image = e.target.files[0];
    setFile(image);
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setPreview(e.target.result);
    };
    fileReader.readAsDataURL(image);
  };
  // console.log(state);
  useEffect(() => {
    if (isSuccess) {
      setToast(true);
      dispath(profileAdd(data));
    }
  }, [isSuccess, dispath, data]);
  return (
    <div className=" flex flex-col items-center gap-5">
      <div className="flex items-center sm:w-full md:w-6/12 h-[300px] justify-center">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col p-1 items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          {preview ? (
            <img src={preview} className=" w-full object-cover h-full" alt="" />
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
          )}
          <input
            id="dropzone-file"
            type="file"
            onChange={previewPhotoHandel}
            className="hidden"
          />
        </label>
      </div>
      <div className=" flex  justify-between w-8/12">
        <div className=" flex gap-2 w-full">
          <Avatar className=" w-6 h-6">
            <AvatarImage src={defaultt} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className=" text-gray-400 text-sm">
            This avater will be default profile
          </p>
        </div>
        <button
          onClick={addProfileHandel}
          disabled={isLoading}
          className="text-white flex items-center  bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isLoading && (
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
          )}
          Uplode
        </button>
      </div>
      {toast && (
        <Alert
          variant="default | destructive"
          className="border absolute bottom-1 left-1 w-[350px] border-green-500"
        >
          <AlertDescription>
            <div className="flex items-center space-x-1">
              <IoMdCheckmarkCircleOutline />
              <p>Profile Uplode Successfully..</p>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default UplodePage;
