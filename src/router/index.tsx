import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import loadable from "@loadable/component";

import tools from "@/util/tools";

import { AuthNoLogin, AuthWithLogin, AuthNoPower } from "./AuthProvider";
import Loading from "../components/Loading";
import BasicLayout from "@/layouts/BasicLayout";
import UserLayout from "@/layouts/UserLayout";

message.config({
  duration: 2,
});

import { RootState, Dispatch } from "@/store";


const [
  Login,
  Home,
  MenuAdmin,
  RoleAdmin,
  UserAdmin,
  Item,
  Order,
  Marketing,
] = [
  () => import("../pages/Login"),
  () => import("../pages/Home"),
  () => import("../pages/System/MenuAdmin"),
  () => import("../pages/System/RoleAdmin"),
  () => import("../pages/System/UserAdmin"),
  () => import("../pages/Item"),
  () => import("../pages/Order"),
  () => import("../pages/Marketing"),
].map((item) => {
  return loadable(item as any, {
    fallback: <Loading />,
  });
});

function RouterCom(): JSX.Element {
  const dispatch = useDispatch<Dispatch>();
  const userinfo = useSelector((state: RootState) => state.app.userinfo);

  useEffect(() => {
    const userTemp = sessionStorage.getItem("userinfo");
    if (userTemp && !userinfo.userBasicInfo) {
      dispatch.app.setUserInfo(JSON.parse(tools.uncompile(userTemp)));
    }
  }, [dispatch.app, userinfo.userBasicInfo]);

  return (
    <Routes>
      <Route
        path="/user"
        element={
          <AuthWithLogin>
            <UserLayout />
          </AuthWithLogin>
        }
      >
        <Route path="/user" element={<Navigate to="login" />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="*" element={<Navigate to="login" />} />
      </Route>
      <Route
        path="/"
        element={
          <AuthNoLogin>
            <BasicLayout />
          </AuthNoLogin>
        }
      >
        <Route path="/" element={<Navigate to="home" />} />
        <Route path="home" element={<Home />} />
        <Route path="goods" element={<Item />} />
        <Route path="order" element={<Order />} />
        <Route path="marketing" element={<Marketing />} />


        <Route
          path="system/menuadmin"
          element={
            <AuthNoPower>
              <MenuAdmin />
            </AuthNoPower>
          }
        />
        <Route
          path="system/roleadmin"
          element={
            <AuthNoPower>
              <RoleAdmin />
            </AuthNoPower>
          }
        />
        <Route
          path="system/useradmin"
          element={
            <AuthNoPower>
              <UserAdmin />
            </AuthNoPower>
          }
        />
      </Route>
    </Routes>
  );
}

export default RouterCom;
