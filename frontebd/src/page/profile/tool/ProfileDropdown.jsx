import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CgMoreO } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileDropdown = () => {
  const { role } = useSelector((store) => store.user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <CgMoreO className=" text-xl" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator /> 
        <DropdownMenuGroup>
          <Link to="">
            <DropdownMenuItem>My Recipe</DropdownMenuItem>
          </Link>
          <Link to="/create">
            <DropdownMenuItem>Create</DropdownMenuItem>
          </Link>
          {role == "admin" && (
            <Link to="admin">
              <DropdownMenuItem>Dashboard</DropdownMenuItem>
            </Link>
          )}
          <Link to="saved">
            <DropdownMenuItem>Saved</DropdownMenuItem>
          </Link>
          <Link to="uplode">
            <DropdownMenuItem>Uplode</DropdownMenuItem>
          </Link>
          <Link to="/">
            <DropdownMenuItem>Home</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
