import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Tree, Modal } from "antd";
import { cloneDeep } from "lodash";
import { Role } from "@/models/index.type";

type RoleLevel = Role & {
  key: string | number;
  parent?: RoleLevel;
  children?: RoleLevel[];
};

interface Props {
  title: string; 
  data: Role[];
  defaultKeys: number[]; 
  visible: boolean; 
  loading: boolean; 
  onOk: (keys: string[], role: Role[]) => Promise<void>;
  onClose: () => void; 
}
export default function RoleTreeComponent(props: Props): JSX.Element {
  const [nowKeys, setNowKeys] = useState<string[]>([]);

  useEffect(() => {
    setNowKeys(props.defaultKeys.map((item) => `${item}`));
  }, [props.defaultKeys]);

  const dataToJson = useCallback(
    (one: RoleLevel | undefined, data: RoleLevel[]) => {
      let kids;
      if (!one) {
        // 第1次递归
        kids = data.filter((item: RoleLevel) => !item.parent);
      } else {
        kids = data.filter((item: RoleLevel) => item.parent?.id === one.id);
      }
      kids.forEach(
        (item: RoleLevel) => (item.children = dataToJson(item, data))
      );
      return kids.length ? kids : undefined;
    },
    []
  );

  const onOk = useCallback(() => {
    const res = props.data.filter((item) => {
      return nowKeys.includes(`${item.id}`);
    });
    props.onOk && props.onOk(nowKeys, res);
  }, [props, nowKeys]);

  const onClose = useCallback(() => {
    props.onClose();
  }, [props]);

  const onCheck = useCallback((keys: any) => {
    setNowKeys(keys);
  }, []);

  const makeKey = useCallback((data: Role[]) => {
    const newData: RoleLevel[] = [];
    for (let i = 0; i < data.length; i++) {
      const item: any = { ...data[i] };
      if (item.children) {
        item.children = makeKey(item.children);
      }
      const treeItem: RoleLevel = {
        ...(item as RoleLevel),
        key: item.id,
      };
      newData.push(treeItem);
    }
    return newData;
  }, []);

  const sourceData = useMemo(() => {
    const roleData: Role[] = cloneDeep(props.data);

    const d: RoleLevel[] = makeKey(roleData);

    d.forEach((item) => {
      item.key = String(item.id);
    });
    return dataToJson(undefined, d) || [];
  }, [props.data, dataToJson]);

  return (
    <Modal
      title={props.title || "请选择"}
      open={props.visible}
      wrapClassName="menuTreeModal"
      confirmLoading={props.loading}
      onOk={onOk}
      onCancel={onClose}
    >
      <Tree
        checkable
        selectable={false}
        checkedKeys={nowKeys}
        onCheck={onCheck}
        treeData={sourceData}
      />
    </Modal>
  );
}
