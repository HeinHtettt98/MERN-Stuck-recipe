import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { LuHome } from "react-icons/lu";
const NavComponent = () => {
  const { photo, count, name } = useSelector((store) => store.user);
  return (
    <div className=" bg-primary fixed z-50 top-0 w-full">
      <div className=" flex items-center max-w-[1200px] px-2 mx-auto justify-between">
        <img
          className=" w-[80px] h-[60px]"
          src={import.meta.env.VITE_BACKEND_ASSURL + "/project.png"}
          alt=""
        />
        <ul className=" space-x-3 flex text-base text-secondary">
          <li>
            <Link to="/">
              <LuHome size={"1.5em"} className=" text-secondary" />
            </Link>
          </li>
          <li> | </li>
          <li>
            <Link to="user/profile">
              <HoverCard>
                <HoverCardTrigger>
                  <Avatar className=" w-7 h-[26px] border-[2px]">
                    <AvatarImage
                      src={
                        photo.length == 0
                          ? import.meta.env.VITE_BACKEND_ASSURL + "/default.png"
                          : import.meta.env.VITE_BACKEND_ASSURL + photo
                      }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className=" flex gap-3">
                    <Avatar className=" w-6 h-6">
                      <AvatarImage
                        src={
                          !photo.length == 0
                            ? import.meta.env.VITE_BACKEND_ASSURL + photo
                            : import.meta.env.VITE_BACKEND_ASSURL +
                              "/default.png"
                        }
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="">{name}</p>
                      <span className="text-slate-400 text-sm">
                        {`${count} ${
                          count > 1 ? "recipes" : "recipe"
                        }  created`}
                      </span>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavComponent;
