import React, { useState, useCallback, useMemo } from "react";
import { useMount } from "react-use";
import { useSelector, useDispatch } from "react-redux";
import {
  Tree,
  Button,
  Table,
  Tooltip,
  Popconfirm,
  Modal,
  Form,
  Select,
  Input,
  InputNumber,
  message,
  Divider,
} from "antd";
import {
  ToolOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { cloneDeep } from "lodash";

import { IconsData } from "@/util/json";
import Icon from "@/components/Icon";

const { Option } = Select;
const { TextArea } = Input;

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

import "./index.css";

function MenuAdminContainer() {
  const p = useSelector((state) => state.app.powersCode);
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState({
    operateType: "add",
    nowData: null,
    modalShow: false,
    modalLoading: false,
  });

  const [treeSelect, setTreeSelect] = useState({ title: "", id: null });

  const onClose = () => setModal({ modalShow: false });
  const onOk = async () => {
    if (modal.operateType === "see") {
      onClose();
      return;
    }
  
    try {
      const values = await form.validateFields();
      const params = {
        title: values.formTitle,
        url: values.formUrl,
        icon: values.formIcon,
        parent: Number(treeSelect.id) || null,
        sorts: values.formSorts,
        desc: values.formDesc,
        conditions: values.formConditions,
      };
  
      setModal((prevState) => ({
        ...prevState,
        modalLoading: true,
      }));
  
      const res = modal.operateType === "add"
        ? await dispatch.sys.addMenu(params)
        : await dispatch.sys.upMenu({ ...params, id: modal?.nowData?.id });
  
      if (res?.status === 200) {
        message.success(modal.operateType === "add" ? "添加成功" : "修改成功");
        getData();
        onClose();
        dispatch.app.updateUserInfo(null);
      } else {
        message.error(modal.operateType === "add" ? "添加失败" : "修改失败");
      }
    } catch (error) {
      message.error("操作失败");
    } finally {
      setModal((prevState) => ({
        ...prevState,
        modalLoading: false,
      }));
    }
  };
  
  const onDel = async (record) => {
    const params = { id: record.id };
  
    try {
      const res = await dispatch.sys.delMenu(params);
      if (res?.status === 200) {
        message.success("删除成功");
        getData();
        dispatch.app.updateUserInfo(null);
      } else {
        message.error(res?.message ?? "操作失败");
      }
    } catch (error) {
      message.error("操作失败");
    }
  };
  
  useMount(() => {
    getData();
  });

  const getData = async () => {
    if (!p.includes("menu:query")) {
      return;
    }
    setLoading(true);
    try {
      const res = await dispatch.sys.getMenus();
      if (res?.status === 200) {
        setData(res.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const dataToJson = useCallback((one, data) => {
    const kids = data.filter(item => one ? item.parent === one.id : !item.parent);
    return kids.map(item => ({ ...item, children: dataToJson(item, data) }));
  }, []);

  const makeKey = useCallback((data) => {
    return data.map(item => ({
      ...item,
      key: item.id,
      children: item.children ? makeKey(item.children) : undefined,
    }));
  }, []);

  const onTreeSelect = useCallback((keys, info) => {
    setTreeSelect(info.selected ? { title: info.node.title, id: info.node.id } : {});
  }, []);

  const onModalShow = (data, type) => {
    setModal({ modalShow: true, nowData: data, operateType: type });
    setTimeout(() => {
      form.resetFields();
      if (type !== "add" && data) {
        form.setFieldsValue({
          formConditions: data.conditions,
          formDesc: data.desc,
          formIcon: data.icon,
          formSorts: data.sorts,
          formTitle: data.title,
          formUrl: data.url,
        });
      }
    });
  };

  const sourceData = useMemo(() => {
    const menuData = cloneDeep(data);
    const d = makeKey(menuData);

    d.sort((a, b) => {
      return a.sorts - b.sorts;
    });
    return dataToJson(null, d) || [];
  }, [data, dataToJson]);

  const tableColumns = [
    {
      title: "序号",
      dataIndex: "serial",
      key: "serial",
    },
    {
      title: "图标",
      dataIndex: "icon",
      key: "icon",
      render: (v) => {
        return v ? <Icon type={v} /> : "";
      },
    },
    {
      title: "名称",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "路径",
      dataIndex: "url",
      key: "url",
      render: (v) => {
        return v ? `/${v.replace(/^\//, "")}` : "";
      },
    },
    {
      title: "菜单详情",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "是否启用",
      dataIndex: "conditions",
      key: "conditions",
      render: (v) =>
        v === 1 ? (
          <span style={{ color: "blue" }}>启用中</span>
        ) : (
          <span style={{ color: "yellow" }}>禁用中</span>
        ),
    },
    {
      title: "编辑操作",
      key: "control",
      width: 120,
      render: (v, record) => {
        const controls = [];
        p.includes("menu:up") &&
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
        p.includes("menu:del") &&
          controls.push(
            <Popconfirm
              key="2"
              title="确定删除吗?"
              okText="确定"
              cancelText="取消"
              onConfirm={() => onDel(record)}
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
    return data
      .filter((item) => item.parent === (Number(treeSelect.id) || null))
      .map((item, index) => {
        return {
          key: index,
          id: item.id,
          icon: item.icon,
          parent: item.parent,
          title: item.title,
          url: item.url,
          desc: item.desc,
          sorts: item.sorts,
          conditions: item.conditions,
          serial: index + 1,
          control: item.id,
        };
      });
  }, [data, treeSelect.id]);

  return (
    <div className="page-menu-admin">
      <div className="l">
        <div className="title">目录略缩</div>
        <div>
          <Tree onSelect={onTreeSelect} treeData={sourceData} />
        </div>
      </div>
      <div className="r">
        <div className="searchBox">
          <ul>
            <li>
              <Button
                type="dashed"
                icon={<PlusCircleOutlined />}
                onClick={() => onModalShow(null, "add")}
                disabled={!p.includes("menu:add")}
              >
                {`添加${treeSelect.title || ""}子菜单`}
              </Button>
            </li>
          </ul>
        </div>
        <Table
          className="diy-table"
          columns={tableColumns}
          loading={loading}
          dataSource={tableData}
        />
      </div>

      <Modal
        title={`${{ add: "新增", up: "修改", see: "查看" }[modal.operateType]}`}
        open={modal.modalShow}
        onOk={onOk}
        onCancel={onClose}
        confirmLoading={modal.modalLoading}
      >
        <Form form={form} initialValues={{ formConditions: 1 }}>
          <Form.Item
            label="菜单名"
            name="formTitle"
            {...formItemLayout}
            rules={[
              { required: true, whitespace: true, message: "必填" },
              { max: 12, message: "最多输入12位字符" },
            ]}
          >
            <Input
              placeholder="请输入菜单名"
              disabled={modal.operateType === "see"}
            />
          </Form.Item>
          <Form.Item
            label="菜单url"
            name="formUrl"
            {...formItemLayout}
            rules={[{ required: true, whitespace: true, message: "必填" }]}
          >
            <Input
              placeholder="请输入菜单url"
              disabled={modal.operateType === "see"}
            />
          </Form.Item>
          <Form.Item label="菜单图标" name="formIcon" {...formItemLayout}>
            <Select
              dropdownClassName="iconSelect"
              disabled={modal.operateType === "see"}
            >
              {IconsData.map((item, index) => (
                <Option key={index} value={item}>
                  <Icon type={item} />
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="功能描述"
            name="formDesc"
            {...formItemLayout}
            rules={[{ max: 100, message: "最多输入100位字符" }]}
          >
            <TextArea
              rows={4}
              disabled={modal.operateType === "see"}
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>
          <Form.Item
            label="排序"
            name="formSorts"
            {...formItemLayout}
            rules={[{ required: true, message: "请输入排序号" }]}
          >
            <InputNumber
              min={0}
              max={99999}
              style={{ width: "100%" }}
              disabled={modal.operateType === "see"}
            />
          </Form.Item>
          <Form.Item
            label="状态"
            name="formConditions"
            {...formItemLayout}
            rules={[{ required: true, message: "请选择状态" }]}
          >
            <Select disabled={modal.operateType === "see"}>
              <Option key={1} value={1}>
                启用
              </Option>
              <Option key={-1} value={-1}>
                禁用
              </Option>
            </Select>
          </Form.Item>
          {modal.operateType === "add" ? (
            <Form.Item label="赋予" {...formItemLayout}>
              <span style={{ color: "green" }}>
               菜单默认关闭，需要对角色进行授权
              </span>
            </Form.Item>
          ) : null}
        </Form>
      </Modal>
    </div>
  );
}

export default MenuAdminContainer;
