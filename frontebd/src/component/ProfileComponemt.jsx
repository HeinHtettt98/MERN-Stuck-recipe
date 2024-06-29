import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";

const ProfileComponemt = () => {
  const { photo, count, name } = useSelector((store) => store.user);

  return (
    <div className=" flex gap-3">
      <Avatar className=" w-10 h-10">
        <AvatarImage
          src={
            photo.length == 0
              ? import.meta.env.VITE_BACKEND_ASSURL + "/default.png"
              : import.meta.env.VITE_BACKEND_ASSURL + photo
          }
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <p className=" text-lg">{name}</p>
        <span className="text-slate-400 text-sm">
          {`${count} ${count > 1 ? "recipes" : "recipe"}  created`}
        </span>
      </div>
    </div>
  );
};

export default ProfileComponemt;
