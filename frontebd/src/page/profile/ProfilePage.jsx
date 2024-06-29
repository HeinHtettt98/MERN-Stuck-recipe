import React from "react";
import ProfileSideBar from "./ProfileSideBar";
import { Outlet } from "react-router-dom";
import ProfileComponemt from "../../component/ProfileComponemt";
import ProfileDropdown from './tool/ProfileDropdown';

const ProfilePage = () => {
  return (
    <div className=" mt-[60px] max-w-[1200px] p-5 flex justify-end md:flex-row sm:flex-col mx-auto">
      <div className="md:hidden flex justify-between ">
        <ProfileComponemt />
        <ProfileDropdown />
      </div>
      <ProfileSideBar />
      <div className="sm:w-full md:w-8/12 h-auto">
        <Outlet/>
      </div>
    </div>
  );
};

export default ProfilePage;
