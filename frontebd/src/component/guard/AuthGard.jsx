import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthQuery } from "../../store/service/UserEndpoint";
import { useDispatch } from "react-redux";
import { getInform } from "../../store/slice/userSlice";

const AuthGard = ({ children }) => {
  const { data, error } = useAuthQuery();
  const dispath = useDispatch();
  const nav = useNavigate();
  useEffect(() => {
    if (!error) {
      if (data) {
        dispath(getInform(data));
        nav("/");
      } else {
        nav("/sign-in");
      }
    } else {
      nav("/sign-in");
    }
  }, [data, error]);
  return <div>{children}</div>;
};

export default AuthGard;
