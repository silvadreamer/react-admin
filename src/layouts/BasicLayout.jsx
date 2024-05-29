import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { Layout, message } from "antd";

import "./BasicLayout.css";
import Header from "@/components/Header";
import MenuCom from "@/components/Menu";
import Bread from "@/components/Bread";

const { Content } = Layout;

const BasicLayoutCom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userinfo = useSelector((state) => state.app.userinfo);
  const [collapsed, setCollapsed] = useState(false); // 菜单栏是否收起

  const onLogout = async () => {
    await dispatch.app.onLogout();
    message.success("退出成功");
    navigate("/user/login");
  };

  return (
    <Layout className="page-basic" hasSider>
      <MenuCom data={userinfo.menus} collapsed={collapsed} />
      <Layout>
        <Header
          collapsed={collapsed}
          userinfo={userinfo}
          onToggle={() => setCollapsed(!collapsed)}
          onLogout={onLogout}
        />
        <Bread menus={userinfo.menus} />
        <Content className="content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayoutCom;
