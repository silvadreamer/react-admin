import React, { useState, useMemo } from "react";
import { useMount } from "react-use";
import { useSelector, useDispatch } from "react-redux";
import {
  Form, Button,
  Input, Table,
  message, Popconfirm,
  Modal, Tooltip,
  Divider, Select,
} from "antd";
import {
  EditOutlined,
  ToolOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import tools from "@/util/tools";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
};

import RoleTree from "@/components/TreeChose/RoleTree";

function UserAdminContainer() {
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => state.app.userinfo);
  const p = useSelector((state) => state.app.powersCode);

  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  });

  const [modal, setModal] = useState({
    operateType: "add",
    nowData: null,
    modalShow: false,
    modalLoading: false,
  });

  const [searchInfo, setSearchInfo] = useState({
    username: undefined,
    conditions: undefined,
  });

  const [role, setRole] = useState({
    roleData: [],
    roleTreeLoading: false,
    roleTreeShow: false,
    roleTreeDefault: [],
  });

  useMount(() => {
    onGetData(page);
    getAllRolesData();
  });

  const getAllRolesData = async () => {
    try {
      const res = await dispatch.sys.getAllRoles();
      if (res?.status === 200) {
        setRole((prevState) => ({
          ...prevState,
          roleData: res.data,
        }));
      } else {
        message.error(res?.message ?? "获取角色数据失败");
      }
    } catch (error) {
      console.error(error);
      message.error("获取角色数据失败");
    }
  };
  
  const onGetData = async ({ pageNum, pageSize }) => {
    if (!p.includes("user:query")) {
      return;
    }
  
    const params = {
      pageNum,
      pageSize,
      username: searchInfo.username,
      conditions: searchInfo.conditions,
    };
  
    setLoading(true);
    try {
      const res = await dispatch.sys.getUserList(tools.clearNull(params));
      if (res?.status === 200) {
        setData(res.data.list);
        setPage({
          pageNum,
          pageSize,
          total: res.data.total,
        });
      } else {
        message.error(res?.message ?? "数据获取失败");
      }
    } catch (error) {
      message.error("数据获取失败");
      console.error("数据获取失败:", error);
    } finally {
      setLoading(false);
    }
  };
  
  
  const searchUsernameChange = (e) => {
    const { value } = e.target;
    if (value.length < 20) {
      setSearchInfo((prevState) => ({ ...prevState, username: value }));
    }
  };  
  
  const onSearch = () => {
    onGetData(page);
  };
  
  const onModalShow = (data, type) => {
    setModal({
      modalShow: true,
      nowData: data,
      operateType: type,
    });
    setTimeout(() => {
      if (type === "add") {
        form.resetFields();
      } else if (data) {
        form.setFieldsValue({ ...data });
      }
    });
  };
  
  const handleUserAction = async (params, actionType) => {
    setModal((prevState) => ({
      ...prevState,
      modalLoading: true,
    }));
  
    try {
      const action = actionType === "add" ? dispatch.sys.addUser : dispatch.sys.upUser;
      const res = await action(params);
  
      if (res?.status === 200) {
        message.success(actionType === "add" ? "添加成功" : "修改成功");
        onGetData(page);
        onClose();
      } else {
        message.error(res?.message ?? (actionType === "add" ? "添加失败" : "修改失败"));
      }
    } catch (error) {
      console.error(`${actionType === "add" ? "添加失败" : "修改失败"}:`, error);
      message.error(actionType === "add" ? "添加失败" : "修改失败");
    } finally {
      setModal((prevState) => ({
        ...prevState,
        modalLoading: false,
      }));
    }
  };  

  const handleResponse = async (apiCall, successMessage, errorMessage) => {
    try {
      const res = await apiCall();
      if (res?.status === 200) {
        message.success(successMessage);
        onGetData(page);
        return true;
      } else {
        message.error(res?.message ?? errorMessage);
        return false;
      }
    } catch (error) {
      console.error(error);
      message.error(errorMessage);
      return false;
    }
  };
  
  const onDel = async (id) => {
    setLoading(true);
    try {
      await handleResponse(
        () => dispatch.sys.delUser({ id }),
        "删除成功",
        "操作失败"
      );
    } finally {
      setLoading(false);
    }
  };
  
  const onClose = () => {
    setModal((prevState) => ({
      ...prevState,
      modalShow: false,
    }));
  };
  
  const onTreeShowClick = (record) => {
    setModal((prevState) => ({
      ...prevState,
      nowData: record,
    }));
    setRole((prevState) => ({
      ...prevState,
      roleTreeShow: true,
      roleTreeDefault: record.roles || [],
    }));
  };
  
  const onRoleOk = async (keys) => {
    if (!modal.nowData?.id) {
      message.error("未获取到该条数据id");
      return;
    }
  
    const params = {
      id: modal.nowData.id,
      roles: keys.map(Number),
    };
  
    setRole((prevState) => ({
      ...prevState,
      roleTreeLoading: true,
    }));
  
    try {
      const success = await handleResponse(
        () => dispatch.sys.setUserRoles(params),
        "分配成功",
        "操作失败"
      );
      if (success) {
        onRoleClose();
      }
    } finally {
      setRole((prevState) => ({
        ...prevState,
        roleTreeLoading: false,
      }));
    }
  };
  
  const onRoleClose = () => {
    setRole((prevState) => ({
      ...prevState,
      roleTreeShow: false,
    }));
  };
  
  const onTablePageChange = (pageNum, pageSize) => {
    onGetData({ pageNum, pageSize });
  };
  
  
  const onOk = async () => {
    if (modal.operateType === "see") {
      onClose();
      return;
    }
  
    try {
      const values = await form.validateFields();
      const params = {
        username: values.username,
        password: values.password,
        phone: values.phone,
        email: values.email,
        desc: values.desc,
        conditions: values.conditions,
      };
  
      if (modal.operateType === "edit") {
        params.id = modal.nowData?.id;
      }
  
      handleUserAction(params, modal.operateType);
    } catch (error) {
      console.error(error);
    }
  };


  const renderStatus = (v) =>
    v === 1 ? (
      <span style={{ color: "blue" }}>账号有效</span>
    ) : (
      <span style={{ color: "yellow" }}>账号禁用中</span>
    );
  
  const renderControls = (record) => {
    const controls = [];
    const u = userinfo.userBasicInfo || { id: -1 };
  
    if (p.includes("user:up")) {
      controls.push(
        <span
          key="1"
          className="control-btn blue"
          onClick={() => onModalShow(record, "up")}
        >
          <Tooltip placement="top" title="修改">
            <ToolOutlined />
          </Tooltip>
        </span>
      );
    }
  
    if (p.includes("user:role")) {
      controls.push(
        <span
          key="2"
          className="control-btn blue"
          onClick={() => onTreeShowClick(record)}
        >
          <Tooltip placement="top" title="分配角色">
            <EditOutlined />
          </Tooltip>
        </span>
      );
    }
  
    if (p.includes("user:del") && u.id !== record.id) {
      controls.push(
        <Popconfirm
          key="3"
          title="确定删除吗?"
          onConfirm={() => onDel(record.id)}
          okText="确定"
          cancelText="取消"
        >
          <span className="control-btn red">
            <Tooltip placement="top" title="删除">
              <DeleteOutlined />
            </Tooltip>
          </span>
        </Popconfirm>
      );
    }
  
    return controls.reduce((acc, item, index) => {
      if (index) {
        acc.push(<Divider key={`line${index}`} type="vertical" />);
      }
      acc.push(item);
      return acc;
    }, []);
  };
  
  const tableColumns = [
    {
      title: "序号",
      dataIndex: "serial",
      key: "serial",
    },
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "状态",
      dataIndex: "conditions",
      key: "conditions",
      render: renderStatus,
    },
    {
      title: "操作",
      key: "control",
      width: 200,
      render: (v, record) => renderControls(record),
    },
  ];
  

  const tableData = useMemo(() => {
    return data.map((item, index) => {
      return {
        key: index,
        id: item.id,
        serial: index + 1 + (page.pageNum - 1) * page.pageSize,
        username: item.username,
        password: item.password,
        phone: item.phone,
        email: item.email,
        desc: item.desc,
        conditions: item.conditions,
        control: item.id,
        roles: item.roles,
      };
    });
  }, [page, data]);

  return (
    <div>
      <div className="g-search">
        <ul className="search-func">
          <li>
            <Button
              type="dashed"
              icon={<PlusCircleOutlined />}
              disabled={!p.includes("user:add")}
              onClick={() => onModalShow(null, "add")}
            >
              添加用户
            </Button>
          </li>
        </ul>
        <Divider type="vertical" />
        {p.includes("user:query") && (
          <ul className="search-ul">
            <li>
              <Input
                placeholder="请输入用户名"
                onChange={searchUsernameChange}
                value={searchInfo.username}
              />
            </li>
            <li>
              <Button
                type="dashed"
                icon={<SearchOutlined />}
                onClick={onSearch}
              >
                搜索
              </Button>
            </li>
          </ul>
        )}
      </div>
      <div className="diy-table">
        <Table
          columns={tableColumns}
          loading={loading}
          dataSource={tableData}
          pagination={{
            total: page.total,
            current: page.pageNum,
            pageSize: page.pageSize,
            showQuickJumper: true,
            onChange: onTablePageChange,
          }}
        />
      </div>

      <Modal
        title={{ add: "新增", up: "修改", see: "查看" }[modal.operateType]}
        visible={modal.modalShow}
        onOk={onOk}
        onCancel={onClose}
        confirmLoading={modal.modalLoading}
      >
        <Form
          form={form}
          initialValues={{
            conditions: 1,
          }}
        >
          <Form.Item
            label="用户名"
            name="username"
            {...formItemLayout}
            rules={[
              { required: true, whitespace: true, message: "必填" },
              { max: 12, message: "最多输入12位字符" },
            ]}
          >
            <Input
              placeholder="请输入用户名"
              disabled={modal.operateType === "see"}
            />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            {...formItemLayout}
            rules={[
              { required: true, whitespace: true, message: "必填" },
              { min: 6, message: "最少输入6位字符" },
              { max: 18, message: "最多输入18位字符" },
              { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,18}$/, message: "密码必须包含大小写字母和数字" }
            ]}
          >
            <Input.Password
              placeholder="请输入密码"
              disabled={modal.operateType === "see"}
            />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            {...formItemLayout}
            rules={[
              () => ({
                validator: (rule, value) => {
                  const v = value;
                  if (v) {
                    if (!tools.checkEmail(v)) {
                      return Promise.reject("请输入有效的邮箱地址");
                    }
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input
              placeholder="请输入邮箱地址"
              disabled={modal.operateType === "see"}
            />
          </Form.Item>
          <Form.Item
            label="状态"
            name="conditions"
            {...formItemLayout}
            rules={[{ required: true, message: "请选择状态" }]}
          >
            <Select disabled={modal.operateType === "see"}>
              <Option key={1} value={1}>
                有效
              </Option>
              <Option key={-1} value={-1}>
                禁用
              </Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <RoleTree
        title={"分配角色"}
        data={role.roleData}
        visible={role.roleTreeShow}
        defaultKeys={role.roleTreeDefault}
        loading={role.roleTreeLoading}
        onOk={onRoleOk}
        onClose={onRoleClose}
      />
    </div>
  );
}

export default UserAdminContainer;
