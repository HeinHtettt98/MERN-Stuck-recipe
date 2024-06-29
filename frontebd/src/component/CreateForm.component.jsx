import React, { useEffect, useRef, useState } from "react";
import Ingredient from "./Ingredient";
import {
  useCreateMutation,
  useUpdateMutation,
  useUplodeMutation,
} from "../store/service/ReceiveEndpoint";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { countAdd } from "../store/slice/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateFormComponent = () => {
  const [fun, { isSuccess, data, error, isLoading }] = useCreateMutation();
  const [updateFun, { data: imageId, isLoading: isLoad, isSuccess: success }] =
    useUpdateMutation();
  const [uploderFun] = useUplodeMutation();
  const { count } = useSelector((store) => store.user);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [title, settTitle] = useState(state?.title || "");
  const [description, setDescription] = useState(state?.description || "");
  const [ingredients, setIngredients] = useState([]);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  let ingeRef = useRef("");
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "align",
    "color",
    "background",
    "link",
    "image",
  ];

  useEffect(() => {
    if (isSuccess || success) {
      if (isSuccess) {
        dispatch(countAdd(count + 1));
      }
      toast(
        String.fromCodePoint(0x1f60a) +
          `Recipe ${isSuccess ? "created" : "updated"} successful...`,
        {
          position: "bottom-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      nav("/");
    }
    if (state) {
      setIngredients([...state.ingredients]);
    }
  }, [isSuccess, nav, state, success, dispatch, data]);

  const createReceipes = async (e) => {
    e.preventDefault();
    let obj = {
      title,
      description,
      ingredients,
    };
    const formData = new FormData();
    formData.set("photo", file);

    if (state) {
      await updateFun({ id: state._id, data: obj });
      await uploderFun({ id: state._id, data: formData });
    } else {
      const res = await fun(obj);
      // console.log(res);
      await uploderFun({ id: res?.data?._id, data: formData });
    }
  };

  const recipeOnchange = (e) => {
    settTitle(e.target.value);
  };

  const createIngedient = () => {
    let item = ingeRef.current.value;
    ingeRef.current.value = "";
    setIngredients([item, ...ingredients]);
  };

  const uplodeHandel = (e) => {
    let image = e.target.files[0];
    setFile(image);
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setPreview(e.target.result);
    };
    fileReader.readAsDataURL(image);
  };

  return (
    <div>
      <form className="max-w-[1200px] h-screen mx-auto md:flex sm:flex-col md:flex-row md:justify-between bg-white p-4 rounded">
        <div className="mb-5 md:w-full lg:w-5/12 h-80">
          <label
            htmlFor="dropzone-file"
            className="flex overflow-hidden flex-col p-1 items-center justify-center w-full h-full border-2 border-accent border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            {preview ? (
              <img
                src={preview}
                className=" w-full object-cover h-full"
                alt=""
              />
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
              onChange={uplodeHandel}
              className="hidden"
            />
          </label>
        </div>
        <div className="  lg:w-6/12 md:w-full flex flex-col gap-3">
          <div className="mb-5 sm:w-full md:w-9/12">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="title"
              id="title"
              name="title"
              onChange={recipeOnchange}
              value={title}
              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="How to make a apple pine"
            />
          </div>
          <div className="mb-5 sm:w-full md:w-9/12">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              value={description}
              onChange={setDescription}
            />
          </div>
          <div className="mb-5">
            <p className="text-base mb-2">Ingredient</p>

            <div className="flex gap-2">
              <input
                type="search"
                id="default-search"
                className="block w-9/12 p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="milk, meet and vegetable.."
                ref={ingeRef}
              />
              <button
                type="button"
                onClick={createIngedient}
                className="text-white hover:bg-primary focus:bg-secondary active:bg-secondary font-medium rounded-lg text-sm px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 text-indigo-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            </div>
            <Ingredient ingredients={ingredients} />
          </div>
          <button
            onClick={createReceipes}
            type="submit"
            disabled={isLoading || isLoad}
            className=" bg-primary flex justify-center w-9/12 py-2 mt-auto rounded-lg hover:bg-secondary active:bg-secondary "
          >
            {(isLoading || isLoad) && (
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
            {state ? "Edit" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFormComponent;
