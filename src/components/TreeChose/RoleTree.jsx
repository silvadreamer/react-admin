import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Tree, Modal } from "antd";
import { cloneDeep } from "lodash";
import PropTypes from 'prop-types';

export default function RoleTreeComponent(props) {
  const [nowKeys, setNowKeys] = useState([]);

  useEffect(() => {
    setNowKeys(props.defaultKeys.map((item) => `${item}`));
  }, [props.defaultKeys]);

  const dataToJson = useCallback(
    (one, data) => {
      let kids;
      if (!one) {
        kids = data.filter((item) => !item.parent);
      } else {
        kids = data.filter((item) => item.parent?.id === one.id);
      }
      kids.forEach(
        (item) => (item.children = dataToJson(item, data))
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

  const onCheck = useCallback((keys) => {
    setNowKeys(keys);
  }, []);

  const makeKey = useCallback((data) => {
    const newData = [];
    for (let i = 0; i < data.length; i++) {
      const item = { ...data[i] };
      if (item.children) {
        item.children = makeKey(item.children);
      }
      const treeItem = {
        ...item,
        key: item.id,
      };
      newData.push(treeItem);
    }
    return newData;
  }, []);

  const sourceData = useMemo(() => {
    const roleData = cloneDeep(props.data);

    const d = makeKey(roleData);

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

RoleTreeComponent.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array.isRequired,
  defaultKeys: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};