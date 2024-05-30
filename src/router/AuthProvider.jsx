import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import tools from '@/util/tools';

const AuthNoLogin = ({ children }) => {
  const userInfo = useSelector((state) => state.app.userinfo);
  
  if (!userInfo?.userBasicInfo) {
    return <Navigate to="/user/login" replace />;
  }

  return children;
};

const AuthWithLogin = ({ children }) => {
  const userInfo = useSelector((state) => state.app.userinfo);
  
  if (userInfo?.userBasicInfo) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

const AuthNoPower = ({ children }) => {
  const location = useLocation();
  const userInfo = useSelector((state) => state.app.userinfo);
  
  const hasPower = useMemo(() => {
    const sessionUserInfo = sessionStorage.getItem("userinfo");
    const menus = userInfo.menus?.length 
      ? userInfo.menus 
      : sessionUserInfo 
        ? JSON.parse(tools.uncompile(sessionUserInfo)).menus 
        : [];
    const menuUrls = menus.map((item) => item.url);
    
    return menuUrls.includes(location.pathname);
  }, [userInfo, location.pathname]);

  if (!hasPower && location.pathname !== "/401") {
    return <Navigate to="/401" replace />;
  }

  return children;
};

export { AuthNoLogin, AuthWithLogin, AuthNoPower };
