import { MdOutlineAccountCircle } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { LuHome } from "react-icons/lu";
import defaultt from "../public/default.png";
const NavComponent = () => {
  const { photo, count, name, _id } = useSelector((store) => store.user);
  "firstname, count, name", _id;
  return (
    <div className=" bg-primary fixed z-50 top-0 w-full">
      <div className=" flex items-center max-w-[1200px] px-2 mx-auto justify-between">
        <img
          className=" w-[80px] h-[60px]"
          src={import.meta.env.VITE_BACKEND_ASSURL + "/project.png"}
          alt=""
        />
        <ul className=" space-x-3 flex items-center text-base text-secondary">
          <li>
            <Link to="/">
              <LuHome />
            </Link>
          </li>
          <li> | </li>
          <li>
            {_id == "" ? (
              <Link to="/sign-in">
                <MdOutlineAccountCircle className=" text-secondary text-xl" />
              </Link>
            ) : (
              <Link to="/user/profile">
                <HoverCard>
                  <HoverCardTrigger>
                    <Avatar className=" w-7 h-[26px] border-[2px]">
                      <AvatarImage
                        src={
                          photo.length == 0
                            ? defaultt
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
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavComponent;
