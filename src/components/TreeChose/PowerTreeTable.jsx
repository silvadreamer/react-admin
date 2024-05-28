import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Modal, Table, Checkbox, Spin } from "antd";
import { cloneDeep } from "lodash";

const TreeTable = ({
  title,
  data,
  defaultChecked,
  modalShow,
  initloading,
  loading,
  onClose,
  onOk,
}) => {
  const [treeChecked, setTreeChecked] = useState([]);
  const [btnDtoChecked, setBtnDtoChecked] = useState([]);

  useEffect(() => {
    setTreeChecked(defaultChecked.menus || []);
    setBtnDtoChecked(defaultChecked.powers || []);
  }, [defaultChecked]);

  const handleOk = useCallback(() => {
    onOk({
      menus: treeChecked,
      powers: btnDtoChecked,
    });
  }, [onOk, btnDtoChecked, treeChecked]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const dtoIsChecked = useCallback(
    (id) => {
      return !!btnDtoChecked.find((item) => item === id);
    },
    [btnDtoChecked]
  );

  const onBtnDtoChange = useCallback(
    (e, id, record) => {
      const old = [...btnDtoChecked];
      let treeCheckedTemp = [...treeChecked];
      if (e.target.checked) {
        old.push(id);
        treeCheckedTemp = Array.from(new Set([record.id, ...treeChecked]));
      } else {
        old.splice(old.indexOf(id), 1);

        const tempMap = record.powers.map((item) => item.id);
        if (
          !btnDtoChecked.some(
            (item) => item !== id && tempMap.indexOf(item) >= 0
          )
        ) {
          treeCheckedTemp.splice(treeCheckedTemp.indexOf(record.id), 1);
        }
      }

      setBtnDtoChecked(old);
      setTreeChecked(treeCheckedTemp);
    },
    [btnDtoChecked, treeChecked]
  );

  const dataToJson = useCallback((one, data) => {
    let kids;
    if (!one) {
      kids = data.filter((item) => !item.parent);
    } else {
      kids = data.filter((item) => item.parent === one.id);
    }
    kids.forEach((item) => {
      item.children = dataToJson(item, data);
      item.key = item.id;
    });
    return kids.length ? kids : undefined;
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
    const powerData = cloneDeep(data);
    const d = makeKey(powerData);
    d.sort((a, b) => {
      return a.sorts - b.sorts;
    });

    return dataToJson(undefined, d) || [];
  }, [data, dataToJson, makeKey]);

  const tableRowSelection = useMemo(() => {
    return {
      onChange: (selectedRowKeys) => {
        setTreeChecked(selectedRowKeys.map((item) => Number(item)));
      },
      onSelect: (record, selected) => {
        const t = data.find((item) => item.id === record.id);
        if (selected) {
          if (t && Array.isArray(t.powers)) {
            const temp = Array.from(
              new Set([...t.powers.map((item) => item.id), ...btnDtoChecked])
            );
            setBtnDtoChecked(temp);
          }
        } else {
          if (t && Array.isArray(t.powers)) {
            const mapTemp = t.powers.map((item) => item.id);
            const temp = btnDtoChecked.filter(
              (item) => mapTemp.indexOf(item) < 0
            );
            setBtnDtoChecked(temp);
          }
        }
      },
      onSelectAll: (selected) => {
        if (selected) {
          setBtnDtoChecked(
            data.reduce((v1, v2) => {
              return [...v1, ...v2.powers.map((k) => k.id)];
            }, [])
          );
        } else {
          setBtnDtoChecked([]);
        }
      },
      selectedRowKeys: treeChecked,
    };
  }, [data, treeChecked, btnDtoChecked]);

  const tableColumns = useMemo(() => {
    return [
      {
        title: "菜单",
        dataIndex: "title",
        key: "title",
        width: "30%",
      },
      {
        title: "权限",
        dataIndex: "powers",
        key: "powers",
        width: "70%",
        render: (value, record) => {
          if (value) {
            return value.map((item, index) => {
              return (
                <Checkbox
                  key={index}
                  checked={dtoIsChecked(item.id)}
                  onChange={(e) => onBtnDtoChange(e, item.id, record)}
                >
                  {item.title}
                </Checkbox>
              );
            });
          }
          return null;
        },
      },
    ];
  }, [dtoIsChecked, onBtnDtoChange]);

  return (
    <Modal
      className="menu-tree-table"
      zIndex={1001}
      width={750}
      title={title || "请选择"}
      open={modalShow}
      onOk={handleOk}
      onCancel={handleClose}
      confirmLoading={loading}
    >
      {initloading ? (
        <div style={{ textAlign: "center" }}>
          <Spin tip="加载中…" />
        </div>
      ) : (
        <Table
          columns={tableColumns}
          rowSelection={tableRowSelection}
          dataSource={sourceData}
          pagination={false}
          defaultExpandAllRows
        />
      )}
    </Modal>
  );
};

export default TreeTable;
