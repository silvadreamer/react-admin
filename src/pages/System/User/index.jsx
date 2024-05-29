import React, { useState, useMemo } from "react";
import { useMount } from "react-use";
import { useSelector, useDispatch } from "react-redux";
import {
  Form,
  Button,
  Input,
  Table,
  message,
  Popconfirm,
  Modal,
  Tooltip,
  Divider,
  Select,
} from "antd";
import {
  EditOutlined,
  ToolOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import tools from "@/util/tools";
const { TextArea } = Input;
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
      if (res && res.status === 200) {
        setRole((prevState) => ({
          ...prevState,
          roleData: res.data,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function onGetData({ pageNum, pageSize }) {
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
      if (res && res.status === 200) {
        setData(res.data.list);
        setPage({
          pageNum,
          pageSize,
          total: res.data.total,
        });
      } else {
        message.error(res?.message ?? "数据获取失败");
      }
    } finally {
      setLoading(false);
    }
  }

  const searchUsernameChange = (e) => {
    if (e.target.value.length < 20) {
      setSearchInfo((prevState) => ({ ...prevState, username: e.target.value }));
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
        form.setFieldsValue({
          ...data,
        });
      }
    });
  };

  const onOk = async () => {
    if (modal.operateType === "see") {
      onClose();
      return;
    }
    try {
      const values = await form.validateFields();
      setModal((prevState) => ({
        ...prevState,
        modalLoading: true,
      }));
      const params = {
        username: values.username,
        password: values.password,
        phone: values.phone,
        email: values.email,
        desc: values.desc,
        conditions: values.conditions,
      };
      if (modal.operateType === "add") {
        try {
          const res = await dispatch.sys.addUser(params);
          if (res && res.status === 200) {
            message.success("添加成功");
            onGetData(page);
            onClose();
          } else {
            message.error(res?.message ?? "操作失败");
          }
        } finally {
          setModal((prevState) => ({
            ...prevState,
            modalLoading: false,
          }));
        }
      } else {
        params.id = modal.nowData?.id;
        try {
          const res = await dispatch.sys.upUser(params);
          if (res && res.status === 200) {
            message.success("修改成功");
            onGetData(page);
            onClose();
          } else {
            message.error(res?.message ?? "操作失败");
          }
        } finally {
          setModal((prevState) => ({
            ...prevState,
            modalLoading: false,
          }));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onDel = async (id) => {
    setLoading(true);
    try {
      const res = await dispatch.sys.delUser({ id });
      if (res && res.status === 200) {
        message.success("删除成功");
        onGetData(page);
      } else {
        message.error(res?.message ?? "操作失败");
      }
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
      roles: keys.map((item) => Number(item)),
    };
    setRole((prevState) => ({
      ...prevState,
      roleTreeLoading: true,
    }));
    try {
      const res = await dispatch.sys.setUserRoles(params);
      if (res && res.status === 200) {
        message.success("分配成功");
        onGetData(page);
        onRoleClose();
      } else {
        message.error(res?.message ?? "操作失败");
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
      render: (v) =>
        v === 1 ? (
          <span style={{ color: "blue" }}>账号有效</span>
        ) : (
          <span style={{ color: "yellow" }}>账号禁用中</span>
        ),
    },
    {
      title: "操作",
      key: "control",
      width: 200,
      render: (v, record) => {
        const controls = [];
        const u = userinfo.userBasicInfo || { id: -1 };
        p.includes("user:up") &&
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
        p.includes("user:role") &&
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

        p.includes("user:del") &&
          u.id !== record.id &&
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

        const result = [];
        controls.forEach((item, index) => {
          if (index) {
            result.push(<Divider key={`line${index}`} type="vertical" />);
          }
          result.push(item);
        });
        return result;
      },
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
