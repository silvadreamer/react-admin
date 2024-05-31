import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Layout, Menu as MenuAntd } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { cloneDeep } from "lodash";

const { Sider } = Layout;

import "./index.css";
import PropTypes from 'prop-types';

export default function MenuCom(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [chosedKey, setChosedKey] = useState([]);
  const [openKeys, setOpenKeys] = useState([]); 

  useEffect(() => {
    const paths = location.pathname.split("/").filter((item) => !!item);
    setChosedKey([location.pathname]);
    setOpenKeys(paths.map((item) => `/${item}`));
  }, [location]);

  const onSelect = (e) => {
    if (e?.key) {
      navigate(e.key);
    }
  };

  const dataToJson = useCallback(
    (one, data) => {
      let kids;
      if (!one) {
        kids = data.filter((item) => !item.parent);
      } else {
        kids = data.filter((item) => item.parent === one.id);
      }
      kids.forEach((item) => (item.children = dataToJson(item, data)));
      return kids.length ? kids : undefined;
    },
    []
  );

  const makeTreeDom = useCallback((data) => {
    return data.map((item) => {
      if (item.children) {
        return {
          key: item.url,
          label: (
            <span>{item.title}</span>
          ),
          children: makeTreeDom(item.children),
        };
      } else {
        return {
          label: <span>{item.title}</span>,
          key: item.url,
        };
      }
    });
  }, []);
  
  const treeDom = useMemo(() => {
    const d = cloneDeep(props.data);
    d.sort((a, b) => {
      return a.sorts - b.sorts;
    });
    const sourceData = dataToJson(undefined, d) || [];
    const treeDom = makeTreeDom(sourceData);
    return treeDom;
  }, [props.data, dataToJson, makeTreeDom]);

  return (
    <Sider
      width={256}
      className={`sider ${props.collapsed ? "collapsed" : ""}`}
      trigger={null}
      collapsible
      collapsed={props.collapsed}
    >
      <div className={props.collapsed ? "menuLogo hide" : "menuLogo"}>
        <Link to="/">
          <div>商城管理系统</div>
        </Link>
      </div>
      <MenuAntd
        theme="dark"
        mode="inline"
        items={treeDom}
        selectedKeys={chosedKey}
        {...(props.collapsed ? {} : { openKeys })}
        onOpenChange={(keys) => setOpenKeys(keys)}
        onSelect={onSelect}
      />
    </Sider>
  );
}

MenuCom.propTypes = {
  data: PropTypes.array.isRequired,
  collapsed: PropTypes.bool.isRequired,
};