import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Layout, Menu as MenuAntd } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { cloneDeep } from "lodash";

const { Sider } = Layout;

import "./index.css";
import Icon from "@/components/Icon";
import type { Menu } from "@/models/index.type";
import type { ItemType } from "antd/lib/menu/hooks/useItems";

interface Props {
  data: Menu[];
  collapsed: boolean;
}

export default function MenuCom(props: Props): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const [chosedKey, setChosedKey] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]); 

  useEffect(() => {
    const paths = location.pathname.split("/").filter((item) => !!item);
    setChosedKey([location.pathname]);
    setOpenKeys(paths.map((item) => `/${item}`));
  }, [location]);

  const onSelect = (e: any) => {
    if (e?.key) {
      navigate(e.key);
    }
  };

  const dataToJson = useCallback(
    (one: Menu | undefined, data: Menu[]): Menu[] | undefined => {
      let kids;
      if (!one) {
        kids = data.filter((item: Menu) => !item.parent);
      } else {
        kids = data.filter((item: Menu) => item.parent === one.id);
      }
      kids.forEach((item: Menu) => (item.children = dataToJson(item, data)));
      return kids.length ? kids : undefined;
    },
    []
  );

  const makeTreeDom = useCallback((data: Menu[]): any => {
    return data.map((item: Menu) => {
      if (item.children) {
        return {
          key: item.url,
          label:
            !item.parent && item.icon ? (
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            ) : (
              item.title
            ),
          children: makeTreeDom(item.children),
        };
      } else {
        return {
          label: (
            <>
              {!item.parent && item.icon ? <Icon type={item.icon} /> : null}
              <span>{item.title}</span>
            </>
          ),
          key: item.url,
        };
      }
    });
  }, []);

  const treeDom: ItemType[] = useMemo(() => {
    const d: Menu[] = cloneDeep(props.data);
    d.sort((a, b) => {
      return a.sorts - b.sorts;
    });
    const sourceData: Menu[] = dataToJson(undefined, d) || [];
    const treeDom = makeTreeDom(sourceData);
    return treeDom;
  }, [props.data, dataToJson, makeTreeDom]);

  return (
    <Sider
      width={256}
      className="sider"
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
        onOpenChange={(keys: string[]) => setOpenKeys(keys)}
        onSelect={onSelect}
      />
    </Sider>
  );
}
