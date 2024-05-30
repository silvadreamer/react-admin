import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import tools from "@/util/tools";
import { Modal, Form, Input, Button, message } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import "./index.css";

async function encryptPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function LoginContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOperateType, setModalOperateType] = useState("");
  const [form] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    document.getElementById("username")?.focus();
    setShow(true);
  }, [form]);

  const loginIn = useCallback(
    async (username, password) => {
      let userBasicInfo = null;
      let roles = [];
      let menus = [];
      let powers = [];
      const res1 = await dispatch.app.onLogin({
        username,
        password,
      });
      if (!res1 || res1.status !== 200 || !res1.data) {
        return res1;
      }

      userBasicInfo = res1.data;
      const res2 = await dispatch.sys.getRoleById({
        id: userBasicInfo.roles,
      });
      if (!res2 || res2.status !== 200) {
        return res2;
      }

      roles = res2.data.filter((item) => item.conditions === 1);
      const menuAndPowers = roles.reduce(
        (a, b) => [...a, ...b.menuAndPowers],
        []
      );
      const res3 = await dispatch.sys.getMenusById({
        id: Array.from(new Set(menuAndPowers.map((item) => item.menuId))),
      });
      if (!res3 || res3.status !== 200) {
        return res3;
      }

      menus = res3.data.filter((item) => item.conditions === 1);
      const res4 = await dispatch.sys.getPowerById({
        id: Array.from(
          new Set(
            menuAndPowers.reduce(
              (a, b) => [...a, ...b.powers],
              []
            )
          )
        ),
      });
      if (!res4 || res4.status !== 200) {
        return res4;
      }
      powers = res4.data.filter((item) => item.conditions === 1);
      return { status: 200, data: { userBasicInfo, roles, menus, powers } };
    },
    [dispatch.sys, dispatch.app]
  );

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      const encryptedPassword = await encryptPassword(values.password);
      setLoading(true);
      const res = await loginIn(values.username, encryptedPassword);
      if (res && res.status === 200) {
        message.success("登录成功");
        sessionStorage.setItem(
          "userinfo",
          tools.compile(JSON.stringify(res.data))
        );
        await dispatch.app.setUserInfo(res.data);
        navigate("/");
      } else {
        message.error(res?.message ?? "登录失败");
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    setModalOperateType("register");
    setModalVisible(true);
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const handleOk = async () => {
    try {
      const values = await registerForm.validateFields();
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      const existingUser = users.find((user) => user.username === values.username);
      if (existingUser) {
        message.error("用户名已存在");
        return;
      }

      const encryptedPassword = await encryptPassword(values.password);

      const newUser = {
        id: users.length + 1,
        username: values.username,
        password: encryptedPassword,
        phone: "",
        email: values.email,
        desc: "普通用户",
        conditions: 1,
        roles: [3],
      };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      message.success("注册成功");
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.log("Validate Failed:", error);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
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
              <Button
                className="submit-btn"
                size="small"
                type="dashed"
                loading={loading}
                onClick={handleRegisterClick}
                style={{ width: '50%' }}
              >
                注册
              </Button>
              <Button
                className="submit-btn"
                size="small"
                type="primary"
                loading={loading}
                onClick={onSubmit}
                style={{ width: '50%' }}
              >
                登录
              </Button>
            </div>
          </div>
        </Form>
      </div>

      <Modal
        title="注册"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={registerForm} {...formItemLayout}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, whitespace: true, message: "必填" },
              { max: 12, message: "最多输入12位字符" },
            ]}
          >
            <Input placeholder="请输入用户名" disabled={modalOperateType === "see"} />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              { required: true, whitespace: true, message: "必填" },
              { min: 6, message: "最少输入6位字符" },
              { max: 18, message: "最多输入18位字符" },
              { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,18}$/, message: "密码必须包含大小写字母和数字" },
            ]}
          >
            <Input.Password
              placeholder="请输入密码"
              disabled={modalOperateType === "see"}
            />
          </Form.Item>
          <Form.Item
            label="重复密码"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, whitespace: true, message: "必填" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="请再次输入密码"
              disabled={modalOperateType === "see"}
            />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              { required: true, whitespace: true, message: "必填" },
              { type: "email", message: "请输入有效的电子邮件地址" },
            ]}
          >
            <Input placeholder="请输入邮箱" disabled={modalOperateType === "see"} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default LoginContainer;
