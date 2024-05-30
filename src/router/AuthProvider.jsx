import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import tools from '@/util/tools';

const AuthNoLogin = ({ children }) => {
  const userinfo = useSelector((state) => state.app.userinfo);
  if (!userinfo?.userBasicInfo) {
    return <Navigate to="/user/login" replace />;
  }
  return children;
};

const AuthWithLogin = ({ children }) => {
  const userinfo = useSelector((state) => state.app.userinfo);
  if (userinfo?.userBasicInfo) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

const AuthNoPower = ({ children }) => {
  const location = useLocation();
  const userinfo = useSelector((state) => state.app.userinfo);
  
  const isHavePower = useMemo(() => {
    const sessionUserinfo = sessionStorage.getItem("userinfo");
    const menus = userinfo.menus?.length ? userinfo.menus : (sessionUserinfo ? JSON.parse(tools.uncompile(sessionUserinfo)).menus : []);
    const menuUrls = menus.map((item) => item.url);
    return menuUrls.includes(location.pathname);
  }, [userinfo, location.pathname]);

  if (!isHavePower && location.pathname !== "/401") {
    return <Navigate to="/401" replace />;
  }
  return children;
};

export { AuthNoLogin, AuthWithLogin, AuthNoPower };
