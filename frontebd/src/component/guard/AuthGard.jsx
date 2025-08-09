import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthGard = ({ children }) => {
  const { _id } = useSelector((store) => store.user);
  const nav = useNavigate();
  useEffect(() => {
    if (!_id) {
      nav("/sign-in");
    } else {
      nav("/");
    }
  }, [_id]);
   ("AuthGard", _id);
  return <div>{children}</div>;
};

export default AuthGard;
