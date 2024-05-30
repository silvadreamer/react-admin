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
  () => import("../pages/System/Menu"),
  () => import("../pages/System/Role"),
  () => import("../pages/System/User"),
  () => import("../pages/Item"),
  () => import("../pages/Order"),
  () => import("../pages/Marketing"),
].map((item) => {
  return loadable(item, {
    fallback: <Loading />,
  });
});

function RouterComponent() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.app.userinfo);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("userinfo");
    if (storedUser && !userInfo.userBasicInfo) {
      dispatch.app.setUserInfo(JSON.parse(tools.uncompile(storedUser)));
    }
  }, [dispatch, userInfo.userBasicInfo]);

  const renderUserRoutes = () => (
    <AuthWithLogin>
      <UserLayout />
    </AuthWithLogin>
  );

  const renderMainRoutes = () => (
    <AuthNoLogin>
      <BasicLayout />
    </AuthNoLogin>
  );

  const renderSystemRoute = (path, Component) => (
    <Route
      path={path}
      element={
        <AuthNoPower>
          <Component />
        </AuthNoPower>
      }
    />
  );

  return (
    <Routes>
      <Route path="/user" element={renderUserRoutes()}>
        <Route path="/user" element={<Navigate to="login" />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Navigate to="login" />} />
      </Route>
      <Route path="/" element={renderMainRoutes()}>
        <Route path="/" element={<Navigate to="home" />} />
        <Route path="home" element={<Home />} />
        <Route path="goods" element={<Item />} />
        <Route path="order" element={<Order />} />
        <Route path="marketing" element={<Marketing />} />
        {renderSystemRoute("system/menuadmin", MenuAdmin)}
        {renderSystemRoute("system/roleadmin", RoleAdmin)}
        {renderSystemRoute("system/useradmin", UserAdmin)}
      </Route>
    </Routes>
  );
}

export default RouterComponent;
