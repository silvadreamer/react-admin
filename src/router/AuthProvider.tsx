import React, { useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

import type { Menu } from "@/models/index.type";

import tools from "@/util/tools";

interface Props {
  children: JSX.Element;
}

export function AuthNoLogin(props: Props) {
  const userinfo = useSelector((state: RootState) => state.app.userinfo);

  if (!userinfo.userBasicInfo) {
    return <Navigate to="/user/login" replace />;
  }

  return props.children;
}

export function AuthWithLogin(props: Props) {
  const userinfo = useSelector((state: RootState) => state.app.userinfo);

  if (userinfo.userBasicInfo) {
    return <Navigate to="/home" replace />;
  }
  return props.children;
}

export function AuthNoPower(props: Props) {
  const location = useLocation();
  const userinfo = useSelector((state: RootState) => state.app.userinfo);

  const isHavePower = useMemo(() => {
    let menus: Menu[] = [];
    if (userinfo.menus && userinfo.menus.length) {
      menus = userinfo.menus;
    } else if (sessionStorage.getItem("userinfo")) {
      menus = JSON.parse(
        tools.uncompile(sessionStorage.getItem("userinfo") || "[]")
      ).menus;
    }
    const m: string[] = menus.map((item) => item.url);

    if (m.includes(location.pathname)) {
      return true;
    }
    return false;
  }, [userinfo, location.pathname]);

  console.log("auth:", userinfo, isHavePower, location.pathname);

  if (!isHavePower && location.pathname !== "/401") {
    return <Navigate to="/401" replace />;
  }

  return props.children;
}
