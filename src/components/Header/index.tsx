import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Layout, Tooltip, Dropdown } from "antd";
import {
  MenuFoldOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  GithubOutlined,
  ChromeOutlined,
  LogoutOutlined,
  SmileOutlined,
} from "@ant-design/icons";

const { Header } = Layout;
import "./index.css";
import type { MenuProps } from "antd";
import { UserInfo } from "@/models/index.type";

interface Props {
  collapsed: boolean; 
  userinfo: UserInfo;
  onToggle: () => void;
  onLogout: () => void; 
}

export default function HeaderCom(props: Props): JSX.Element {
  const onMenuClick: MenuProps["onClick"] = (e) => {
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
              <SmileOutlined />
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
