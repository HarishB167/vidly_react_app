import React from "react";
import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location = "/";
  });
  return null;
};

export default Logout;
