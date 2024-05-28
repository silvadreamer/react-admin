import { Menu } from "@/models/index.type";
export type { Menu, MenuParam } from "@/models/index.type";

export interface TableRecordData extends Menu {
  key: number;
  serial: number;
  control: number;
}
export type operateType = "add" | "see" | "up";

export type ModalType = {
  operateType: operateType;
  nowData: TableRecordData | null;
  modalShow: boolean;
  modalLoading: boolean;
};

export interface TreeSourceData {
  id: number;
  key: string | number;
  title: string; 
  icon: string; 
  url: string; 
  parent: number | null;
  desc: string; 
  sorts: number; 
  conditions: number; 
  children?: TreeSourceData[];
}
