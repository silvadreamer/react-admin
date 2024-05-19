import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import "./index.css";

export default function BreadCom(props) {
  const location = useLocation();
  const breads = useMemo(() => {
    const paths = location.pathname;
    const breads = [];

    let parentId = null;
    do {
      const pathObj = props.menus.find(
        (v) => v.id === parentId || v.url === paths
      );

      if (pathObj) {
        breads.push(
          <Breadcrumb.Item key={pathObj.id}>{pathObj.title}</Breadcrumb.Item>
        );
        parentId = pathObj.parent;
      } else {
        parentId = null;
      }
    } while (parentId);

    breads.reverse();
    return breads;
  }, [location.pathname, props.menus]);

  return (
    <div className="bread">
      <EnvironmentOutlined className="icon" />
      <Breadcrumb>{breads}</Breadcrumb>
    </div>
  );
}
