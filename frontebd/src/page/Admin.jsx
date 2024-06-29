import React, { useEffect } from "react";
import { useIndexUserQuery } from "../store/service/AdminEndpoint";
import { useNavigate } from "react-router-dom";
import UserAdmin from "./UserAdmin";

const Admin = () => {
  const { data, error } = useIndexUserQuery();
  const nav = useNavigate();
  useEffect(() => {
    if (error) {
      nav("/");
    }
  }, [error]);
  return (
    <div className=" mt-[40px] mx-auto p-5">
      <p className=" font-bold text-xl -mt-3 mb-3">Users</p>
      <div className=" grid grid-cols-1 gap-4">
        {data?.map((user, index) => (
          <UserAdmin key={index} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Admin;
