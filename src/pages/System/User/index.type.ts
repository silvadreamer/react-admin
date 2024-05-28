
import { Role, UserBasicInfoParam } from "@/models/index.type";

export type { UserBasicInfoParam, Res } from "@/models/index.type";

export type TableRecordData = {
  key?: number;
  id: number;
  serial: number; 
  username: string; 
  password: string;
  phone: string | number; 
  email: string; 
  desc: string; 
  conditions: number; 
  control?: number; 
  roles?: number[];
};

export type Page = {
  pageNum: number;
  pageSize: number;
  total: number;
};

export type operateType = "add" | "see" | "up";

export type ModalType = {
  operateType: operateType;
  nowData: UserBasicInfoParam | null;
  modalShow: boolean;
  modalLoading: boolean;
};

export type SearchInfo = {
  username: string | undefined;
  conditions: number | undefined; 
};

export type RoleTreeInfo = {
  roleData: Role[]; 
  roleTreeLoading: boolean; 
  roleTreeShow: boolean; 
  roleTreeDefault: number[];
};
