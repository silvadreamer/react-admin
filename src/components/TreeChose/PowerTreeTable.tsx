
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Modal, Table, Checkbox, Spin } from "antd";
import { Power, PowerTree } from "@/models/index.type";
import { cloneDeep } from "lodash";

export type PowerTreeDefault = {
  menus: number[];
  powers: number[];
};

export type PowerLevel = PowerTree & {
  parent?: PowerLevel;
  children?: PowerLevel[];
  key?: number;
};

interface Props {
  title: string; 
  data: PowerTree[]; 
  defaultChecked: PowerTreeDefault;
  modalShow: boolean; // 是否显示
  initloading?: boolean; // 初始化时，树是否处于加载中状态
  loading: boolean; // 提交表单时，树的确定按钮是否处于等待状态
  onClose: () => void; // 关闭模态框
  onOk: (res: PowerTreeDefault) => void; // 确定选择，将所选项信息返回上级
}


export default function TreeTable(props: Props): JSX.Element {
  const [treeChecked, setTreeChecked] = useState<number[]>([]); 
  const [btnDtoChecked, setBtnDtoChecked] = useState<number[]>([]); 

  useEffect(() => {
    setTreeChecked(props.defaultChecked.menus || []);
    setBtnDtoChecked(props.defaultChecked.powers || []);
  }, [props.defaultChecked]);

  const onOk = useCallback(() => {
    props.onOk?.({
      menus: treeChecked,
      powers: btnDtoChecked,
    });
  }, [props, btnDtoChecked, treeChecked]);


  const onClose = useCallback(() => {
    props.onClose();
  }, [props]);

  const dtoIsChecked = useCallback(
    (id: number): boolean => {
      return !!btnDtoChecked.find((item) => item === id);
    },
    [btnDtoChecked]
  );

  const onBtnDtoChange = useCallback(
    (e: any, id: number, record: PowerLevel) => {
      console.log("哈？", record);
      const old = [...btnDtoChecked];
      let treeCheckedTemp = [...treeChecked];
      if (e.target.checked) {
        old.push(id);
        treeCheckedTemp = Array.from(new Set([record.id, ...treeChecked]));
      } else {
        old.splice(old.indexOf(id), 1);

        const tempMap = record.powers.map((item: Power) => item.id);
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

  const dataToJson = useCallback(
    (one: PowerLevel | undefined, data: PowerLevel[]) => {
      let kids;
      if (!one) {
        kids = data.filter((item: PowerLevel) => !item.parent);
      } else {
        kids = data.filter((item: PowerLevel) => item.parent === one.id);
      }
      kids.forEach((item: PowerLevel) => {
        item.children = dataToJson(item, data);
        item.key = item.id;
      });
      return kids.length ? kids : undefined;
    },
    []
  );

  const makeKey = useCallback((data: PowerTree[]) => {
    const newData: PowerLevel[] = [];
    for (let i = 0; i < data.length; i++) {
      const item: any = { ...data[i] };
      if (item.children) {
        item.children = makeKey(item.children);
      }
      const treeItem: PowerLevel = {
        ...item,
        key: item.id,
      };
      newData.push(treeItem);
    }
    return newData;
  }, []);

  const sourceData = useMemo(() => {
    const powerData: PowerTree[] = cloneDeep(props.data);
    const d: PowerLevel[] = makeKey(powerData);
    d.sort((a, b) => {
      return a.sorts - b.sorts;
    });

    return dataToJson(undefined, d) || [];
  }, [props.data, dataToJson]);

  type TableData = {
    id: number;
  };

  const tableRowSelection = useMemo(() => {
    return {
      onChange: (selectedRowKeys: React.Key[]): void => {
        setTreeChecked(selectedRowKeys.map((item) => Number(item)));
      },
      onSelect: (record: TableData, selected: boolean): void => {
        const t = props.data.find((item) => item.id === record.id);
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
      onSelectAll: (selected: boolean) => {
        if (selected) {
          setBtnDtoChecked(
            props.data.reduce((v1, v2) => {
              return [...v1, ...v2.powers.map((k) => k.id)];
            }, [] as number[])
          );
        } else {
          setBtnDtoChecked([]);
        }
      },
      selectedRowKeys: treeChecked,
    };
  }, [props.data, treeChecked, btnDtoChecked]);

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
        render: (value: Power[], record: PowerLevel): JSX.Element[] | null => {
          if (value) {
            return value.map((item: Power, index: number) => {
              return (
                <Checkbox
                  key={index}
                  checked={dtoIsChecked(item.id)}
                  onChange={(e): void => onBtnDtoChange(e, item.id, record)}
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
      title={props.title || "请选择"}
      open={props.modalShow}
      onOk={onOk}
      onCancel={onClose}
      confirmLoading={props.loading}
    >
      {props.initloading ? (
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
}
