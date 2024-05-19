import { PowerTreeDefault } from "@/components/TreeChose/PowerTreeTable";
import { Role } from "@/models/index.type";
export type { PowerTree, RoleParam, Role, Res } from "@/models/index.type";

export type Page = {
  pageNum: number;
  pageSize: number;
  total: number;
};

export type TableRecordData = Role & {
  key: number;
  serial: number;
  control: number;
};

export type operateType = "see" | "add" | "up";

export type ModalType = {
  operateType: operateType;
  nowData: TableRecordData | null;
  modalShow: boolean;
  modalLoading: boolean;
};

export type PowerTreeInfo = {
  treeOnOkLoading: boolean;
  powerTreeShow: boolean;
  powerTreeDefault: PowerTreeDefault;
};

export type SearchInfo = {
  title: string | undefined;
  conditions: number | undefined;
};
