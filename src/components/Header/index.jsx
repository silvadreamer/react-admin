import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Layout, Tooltip, Dropdown } from "antd";
import {
  MenuFoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Header } = Layout;
import "./index.css";

export default function HeaderCom(props) {
  const onMenuClick = (e) => {
    if (e.key === "logout") {
      props.onLogout();
    }
  };

  const u = props.userinfo.userBasicInfo;
  return (
    <Header className="header">
      <MenuFoldOutlined
        className={props.collapsed ? "trigger fold" : "trigger"}
        onClick={() => props.onToggle()}
      />

      <div className="rightBox">
        {u ? (
          <Dropdown
            menu={{
              className: "menu",
              onClick: onMenuClick,
              items: [
                {
                  type: "divider",
                },
                {
                  key: "logout",
                  label: (
                    <>
                      <LogoutOutlined />
                      退出登录
                    </>
                  ),
                },
              ],
            }}
            placement="bottomRight"
          >
            <div className="userhead all_center">
              <span className="username">{u.username}</span>
            </div>
          </Dropdown>
        ) : (
          <Tooltip placement="bottom" title="点击登录">
            <div className="full all_center">
              <Link to="/user/login">未登录</Link>
            </div>
          </Tooltip>
        )}
      </div>
    </Header>
  );
}
