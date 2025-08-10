import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocation, useNavigate } from "react-router-dom";
import { GoBookmark } from "react-icons/go";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { formatDistanceToNow, parseISO } from "date-fns";
import ReactComent from "./ReactComent";
import { useSelector } from "react-redux";
import UpdateDelete from "./UpdateDelete";
import { useSavedPostMutation } from "../store/service/UserEndpoint";
import { useUnSaveMutation } from "../store/service/ReceiveEndpoint";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { FaRegWindowClose } from "react-icons/fa";

const ReceipeCard = ({ recipe }) => {
  const [fun] = useSavedPostMutation();
  const [unSaveFun] = useUnSaveMutation();
  const [open, setOpen] = useState(false);
  const { _id } = useSelector((store) => store.user);
  const nav = useNavigate();
  const [save, setSaved] = useState(false);
  const locae = useLocation();
  //  (locae);
  const detailHandel = (id) => {
    nav(`/recipe/${id}`);
  };
  const savedPostHandel = async (e) => {
    e.stopPropagation();
    if (_id !== "") {
      await fun({
        userId: _id,
        postId: recipe._id,
      });
      setSaved(true);
    } else {
      setOpen(true);
    }
  };
  const UnsavedPostHandel = async (e) => {
    e.stopPropagation();
    if (_id !== "") {
      await unSaveFun(recipe._id);
      setSaved(false);
    } else {
      setOpen(true);
    }
  };
  useEffect(() => {
    if (recipe?.savedUser?.length) {
      let saved = recipe.savedUser.find((user) => user == _id);
      if (saved) {
        setSaved(true);
      }
    }
  }, [recipe, setSaved, _id]);
  const date = parseISO(recipe.createdAt);
  const formattedDate = formatDistanceToNow(date, { addSuffix: true });
  return (
    <Dialog open={open}>
      <div
        onClick={() => {
          if (_id !== "") {
            // detailHandel(_id)
            detailHandel(recipe._id);
          } else {
            setOpen(true);
          }
        }}
        className=" mt-3 bg-white border max-h-[350px] border-black p-2 rounded-xl space-y-2"
      >
        <div className=" px-3 py-2 flex flex-col gap-2">
          <div className="flex justify-between">
            <div className=" flex gap-2">
              <Avatar className=" w-6 h-6">
                <AvatarImage
                  src={
                    import.meta.env.VITE_BACKEND_ASSURL + recipe?.createdBy?.image
                  }
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className=" text-sm">{recipe.createdBy.name}</p>
                <span className=" text-xs text-slate-400">{formattedDate}</span>
              </div>
            </div>
            {save ? (
              <BsBookmarkHeartFill
                onClick={UnsavedPostHandel}
                className=" mt-0 text-lg"
              />
            ) : (
              <GoBookmark onClick={savedPostHandel} className="mt-0 text-lg" />
            )}
          </div>
          <div className=" w-10/12 h-[200px] mx-auto">
            <img
              className=" w-full h-full object-cover"
              src={import.meta.env.VITE_BACKEND_ASSURL + recipe.photo}
              alt=""
            />
          </div>
          <h1 className=" md:text-xl font-semibold">{recipe.title}</h1>
          <div className=" flex justify-between">
            <p
              className=" text-slate-500 cursor-pointer text-xs"
              onClick={(e) => {
                e.stopPropagation();
                detailHandel(recipe._id);
              }}
            >
              More Information...
            </p>
            {locae.pathname == "/user/profile" ? (
              <UpdateDelete id={recipe._id} recipe={recipe} />
            ) : (
              <ReactComent
                id={recipe._id}
                _id={_id}
                setOpen={setOpen}
                react={recipe.react}
                comment={recipe.comment.length}
              />
            )}
          </div>
        </div>
      </div>
      <DialogContent>
        <div>
          <div className="w-full flex justify-end">
            <FaRegWindowClose onClick={() => setOpen(false)} />
          </div>
          <p className="font-semibold text-xl text-center">Enjoy The Food</p>
          <DialogDescription>
            <p className="text-center">
              For more Infomation{" "}
              <span
                onClick={() => nav("/sign-in")}
                className="text-blue-500 font-semibold  cursor-pointer hover:underline"
              >
                sign in
              </span>{" "}
              to your account. Don't have an account?
            </p>
            <p
              onClick={() => nav("/register")}
              className="text-center text-blue-500 font-semibold cursor-pointer hover:underline"
            >
              Sign up
            </p>
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReceipeCard;
