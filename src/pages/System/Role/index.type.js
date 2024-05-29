import { PowerTreeDefault } from "@/components/TreeChose/PowerTreeTable";

export { PowerTree, RoleParam, Role, Res } from "@/models/index.type";

export const Page = {
  pageNum: 1,
  pageSize: 10,
  total: 0,
};

export const TableRecordData = {
  key: 0,
  serial: 0,
  control: 0,
};

export const operateType = ["see", "add", "up"];

export const ModalType = {
  operateType: "see",
  nowData: null,
  modalShow: false,
  modalLoading: false,
};

export const PowerTreeInfo = {
  treeOnOkLoading: false,
  powerTreeShow: false,
  powerTreeDefault: {},
};

export const SearchInfo = {
  title: undefined,
  conditions: undefined,
};
