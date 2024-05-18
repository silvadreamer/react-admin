/** 登录页 **/
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import tools from "@/util/tools";
import Vcode from "react-vcode";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";

import { Dispatch } from "@/store";
import {
  Role,
  Menu,
  Power,
  UserBasicInfo,
  Res,
  MenuAndPower,
} from "@/models/index.type";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

import "./index.less";

function LoginContainer(): JSX.Element {
  const dispatch = useDispatch<Dispatch>();

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); 
  const [rememberPassword, setRememberPassword] = useState(false); 
  const [codeValue, setCodeValue] = useState("00000");
  const [show, setShow] = useState(false); 

  useEffect(() => {
    const userLoginInfo = localStorage.getItem("userLoginInfo");
    if (userLoginInfo) {
      const userLoginInfoObj = JSON.parse(userLoginInfo);
      setRememberPassword(true);

      form.setFieldsValue({
        username: userLoginInfoObj.username,
        password: tools.uncompile(userLoginInfoObj.password),
      });
    }
    if (!userLoginInfo) {
      document.getElementById("username")?.focus();
    } else {
      document.getElementById("vcode")?.focus();
    }
    setShow(true);
  }, [form])

  const loginIn = useCallback(
    async (username: string, password: string) => {
      let userBasicInfo: UserBasicInfo | null = null;
      let roles: Role[] = [];
      let menus: Menu[] = [];
      let powers: Power[] = [];
      const res1: Res | undefined = await dispatch.app.onLogin({
        username,
        password,
      });
      if (!res1 || res1.status !== 200 || !res1.data) {
        return res1;
      }

      userBasicInfo = res1.data;
      const res2 = await dispatch.sys.getRoleById({
        id: (userBasicInfo as UserBasicInfo).roles,
      });
      if (!res2 || res2.status !== 200) {
        // 角色查询失败
        return res2;
      }

      roles = res2.data.filter((item: Role) => item.conditions === 1); // conditions: 1启用 -1禁用
      const menuAndPowers = roles.reduce(
        (a, b) => [...a, ...b.menuAndPowers],
        [] as MenuAndPower[]
      );
      const res3 = await dispatch.sys.getMenusById({
        id: Array.from(new Set(menuAndPowers.map((item) => item.menuId))),
      });
      if (!res3 || res3.status !== 200) {
        return res3;
      }

      menus = res3.data.filter((item: Menu) => item.conditions === 1);

      /** 4.根据权限id，获取权限信息 **/
      const res4 = await dispatch.sys.getPowerById({
        id: Array.from(
          new Set(
            menuAndPowers.reduce(
              (a, b: MenuAndPower) => [...a, ...b.powers],
              [] as number[]
            )
          )
        ),
      });
      if (!res4 || res4.status !== 200) {
        // 权限查询失败
        return res4;
      }
      powers = res4.data.filter((item: Power) => item.conditions === 1);
      return { status: 200, data: { userBasicInfo, roles, menus, powers } };
    },
    [dispatch.sys, dispatch.app]
  );

  const onSubmit = async (): Promise<void> => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const res = await loginIn(values.username, values.password);
      if (res && res.status === 200) {
        message.success("登录成功");
        if (rememberPassword) {
          localStorage.setItem(
            "userLoginInfo",
            JSON.stringify({
              username: values.username,
              password: tools.compile(values.password), 
            })
          ); 
        } else {
          localStorage.removeItem("userLoginInfo");
        }
        sessionStorage.setItem(
          "userinfo",
          tools.compile(JSON.stringify(res.data))
        );
        await dispatch.app.setUserInfo(res.data);
        navigate("/"); // 跳转到主页
      } else {
        message.error(res?.message ?? "登录失败");
        setLoading(false);
      }
    } catch (e) {
    }
  };

  const onRemember = (e: CheckboxChangeEvent): void => {
    setRememberPassword(e.target.checked);
  };

  return (
    <div className="page-login">
      <div className={show ? "loginBox show" : "loginBox"}>
        <Form form={form}>
          <div className="title">
            <span>商城管理系统</span>
          </div>
          <div>
            <Form.Item
              name="username"
              rules={[
                { max: 20, message: "最长20位字符" },
                {
                  required: true,
                  whitespace: true,
                  message: "请输入用户名",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ fontSize: 13 }} />}
                size="large"
                id="username"
                placeholder="请输入用户名"
                onPressEnter={onSubmit}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "请输入密码" },
                { max: 18, message: "最大长度18个字符" },
              ]}
            >
              <Input
                prefix={<KeyOutlined style={{ fontSize: 13 }} />}
                size="large"
                type="password"
                placeholder="请输入密码"
                onPressEnter={onSubmit}
              />
            </Form.Item>
            <div style={{ lineHeight: "40px" }}>
              <Checkbox
                className="remember"
                checked={rememberPassword}
                onChange={onRemember}
              >
                记住密码
              </Checkbox>
              <Button
                className="submit-btn"
                size="large"
                type="primary"
                loading={loading}
                onClick={onSubmit}
              >
                {loading ? "请稍后" : "登录"}
              </Button>

              <Button>
              注册
              </Button>
              
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LoginContainer;
