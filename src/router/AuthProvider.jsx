import React, { useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import tools from "@/util/tools";

const AuthNoLogin = (props) => {
  const userinfo = useSelector((state) => state.app.userinfo);
  if (!userinfo.userBasicInfo) {
    return <Navigate to="/user/login" replace />;
  }
  return props.children;
};

const AuthWithLogin = (props) => {
  const userinfo = useSelector((state) => state.app.userinfo);
  if (userinfo.userBasicInfo) {
    return <Navigate to="/home" replace />;
  }
  return props.children;
};

const AuthNoPower = (props) => {
  const location = useLocation();
  const userinfo = useSelector((state) => state.app.userinfo);
  const isHavePower = useMemo(() => {
    let menus = [];
    if (userinfo.menus && userinfo.menus.length) {
      menus = userinfo.menus;
    } else if (sessionStorage.getItem("userinfo")) {
      menus = JSON.parse(
        tools.uncompile(sessionStorage.getItem("userinfo") || "[]")
      ).menus;
    }
    const m = menus.map((item) => item.url);
    return m.includes(location.pathname);
  }, [userinfo, location.pathname]);
  if (!isHavePower && location.pathname !== "/401") {
    return <Navigate to="/401" replace />;
  }
  return props.children;
};

export { AuthNoLogin, AuthWithLogin, AuthNoPower };
