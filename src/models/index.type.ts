export interface MenuParam {
  id?: number; 
  title: string; 
  icon: string;
  url: string;
  parent: number | null;
  desc: string;
  sorts: number;
  conditions: number;
  children?: Menu[];
}

export interface Menu extends MenuParam {
  id: number;
}

export interface MenuAndPower {
  menuId: number;
  powers: number[];
}

export interface RoleParam {
  id?: number;
  title: string;
  desc: string;
  sorts: number; 
  conditions: number;
  menuAndPowers?: MenuAndPower[];
}

export interface Role extends RoleParam {
  id: number;
  menuAndPowers: MenuAndPower[];
}

export interface PowerParam {
  id?: number;
  menu: number;
  title: string;
  code: string;
  desc: string;
  sorts: number;
  conditions: number;
}

export interface Power extends PowerParam {
  id: number;
}

export interface UserInfo {
  userBasicInfo: UserBasicInfo | null;
  menus: Menu[];
  roles: Role[];
  powers: Power[];
}

export interface UserBasicInfo {
  id: number;
  username: string;
  password: string | number;
  phone: string | number;
  email: string;
  desc: string;
  conditions: number;
  roles: number[];
}

export interface UserBasicInfoParam {
  id?: number;
  username: string;
  password: string | number;
  phone?: string | number;
  email?: string; 
  desc?: string;
  conditions?: number;
}

export interface PowerTree extends Menu {
  powers: Power[];
}

export interface AppState {
  userinfo: UserInfo;
  powersCode: string[];
}

export interface SysState {
  menus: Menu[];
  roles: Role[];
  powerTreeData: PowerTree[];
}

export type Res =
  | {
      status: number;
      data?: any;
      message?: string;
    }
  | undefined;
