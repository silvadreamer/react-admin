import axios from "@/util/axios";
import qs from "qs";
import { message } from "antd";
import { Dispatch } from "@/store";

import {
  Menu,
  Role,
  MenuParam,
  PowerParam,
  PowerTree,
  RoleParam,
  SysState,
  Res,
  UserBasicInfoParam,
} from "./index.type";

const defaultState: SysState = {
  menus: [], 
  roles: [], 
  powerTreeData: [], 
};



export default {
  state: defaultState,
  reducers: {
    reducerSetMenus(state: SysState, payload: Menu[]): SysState {
      console.info("payload", payload);
      return { ...state, menus: payload };
    },
    reducerSetRoles(state: SysState, payload: Role[]): SysState {
      return { ...state, roles: payload };
    },
    reducerSetAllPowers(state: SysState, payload: PowerTree[]): SysState {
      return { ...state, powerTreeData: payload };
    },
  },

  effects: (dispatch: Dispatch) => ({
    async getMenus(): Promise<Res> {
      try {
        const res: Res = await axios.get("/api/getmenus");
        if (res && res.status === 200) {
          dispatch.sys.reducerSetMenus(res.data);
        }
        return res;
      } catch (err) {
        message.error("网络错误，请重试");
      }
      return;
    },

    async getMenusById(params: { id: number | number[] }) {
      try {
        console.info("params", params);
        const res: Res = await axios.post(`/api/getMenusById`, params);
        return res;
      } catch (err) {
        message.error("网络错误，请重试");
      }
      return;
    },

    async addMenu(params: MenuParam) {
      try {
        const res: Res = await axios.post("/api/addmenu", params);
        return res;
      } catch (err) {
        message.error("网络错误，请重试");
      }
      return;
    },

    async upMenu(params: MenuParam) {
      try {
        const res: Res = await axios.post("/api/upmenu", params);
        return res;
      } catch (err) {
        message.error("网络错误，请重试");
      }
      return;
    },

    async delMenu(params: { id: number }) {
      try {
        const res: Res = await axios.post("/api/delmenu", params);
        return res;
      } catch (err) {
        message.error("网络错误，请重试");
      }
      return;
    },


    async getPowerDataByMenuId(params: { menuId: number | null }) {
      try {
        const res: Res = await axios.get(
          `/api/getpowerbymenuid?${qs.stringify(params)}`
        );
        return res;
      } catch (err) {
        message.error("网络错误，请重试");
      }
      return;
    },

    async getPowerById(params: { id: number | number[] }) {
      try {
        const res: Res = await axios.post(`/api/getPowerById`, params);
        return res;
      } catch (err) {
        message.error("网络错误，请重试");
      }
      return;
    },

    async getAllRoles(): Promise<Res> {
      try {
        const res: Res = await axios.get("/api/getAllRoles");
        if (res && res.status === 200) {
          dispatch.sys.reducerSetRoles(res.data);
        }
        return res;
      } catch (err) {
        message.error("网络错误，请重试");
      }
      return;
    },

    async addPower(params: PowerParam) {
      try {
        const res: Res = await axios.post("/api/addpower", params);
        return res;
      } catch (err) {
        message.error("网络错误，请重试");
      }
      return;
    },

    async upPower(params: PowerParam) {
      try {
        const res: Res = await axios.post("/api/uppower", params);
        return res;
      } catch (err) {
        message.error("网络错误，请重试");
      }
      return;
    },

    async delPower(params: { id: number }) {
      try {
        const res: Res = await axios.post("/api/delpower", params);
        return res;
      } catch (err) {
        message.error("网络错误，请重试");
      }
      return;
    },

    async getRoles(params: {
      pageNum: number;
      pageSize: number;
      title?: string;
      conditions?: number;
    }) {
      try {
        const res: Res = await axios.get(
          `/api/getroles?${qs.stringify(params)}`
        );
        return res;
      } catch (err) {
        message.error("网络错误，请重试");
      }
      return;
    },

    async getRoleById(params: { id: number | number[] }) {
      try {
        const res: Res = await axios.post(`/api/getRoleById`, params);
        return res;
      } catch (err) {
        message.error("网络错误，请重试");
      }
      return;
    },

    async addRole(params: RoleParam) {
      try {
        const res: Res = await axios.post("/api/addrole", params);
        return res;
      } catch (err) {
        message.error("网络错误，请重试");
      }
      return;
    },

    async upRole(params: RoleParam) {
      try {
        const res: Res = await axios.post("/api/uprole", params);
        return res;
      } catch (err) {
        message.error("网络错误，请重试");
      }
      return;
    },

    async delRole(params: { id: number }) {
      try {
        const res: Res = await axios.post("/api/delrole", params);
        return res;
      } catch (err) {
        message.error("网络错误，请重试");
      }
      return;
    },

    async findAllPowerByRoleId(params: { id: number }) {
      try {
        const res: Res = await axios.get(
          `/api/findAllPowerByRoleId?${qs.stringify(params)}`
        );
        return res;
      } catch (err) {
        message.error("网络错误，请重试");
      }
      return;
    },

    async getAllMenusAndPowers(): Promise<Res> {
      try {
        const res: Res = await axios.get(`/api/getAllMenusAndPowers`);
        if (res && res.status === 200) {
          dispatch.sys.reducerSetAllPowers(res.data);
        }
        return res;
      } catch (err) {
        message.error("网络错误，请重试");
      }
      return;
    },

    async setPowersByRoleId(params: {
      id: number;
      menus: number[];
      powers: number[];
    }) {
      try {
        const res: Res = await axios.post("/api/setPowersByRoleId", params);
        return res;
      } catch (err) {
        message.error("网络错误，请重试");
      }
      return;
    },

    async setPowersByRoleIds(
      params: {
        id: number;
        menus: number[];
        powers: number[];
      }[]
    ) {
      try {
        const res: Res = await axios.post("/api/setPowersByRoleIds", params);
        return res;
      } catch (err) {
        message.error("网络错误，请重试");
      }
      return;
    },

    async getUserList(params: {
      pageNum: number;
      pageSize: number;
      username?: string;
      conditions?: number;
    }) {
      try {
        const res: Res = await axios.get(
          `/api/getUserList?${qs.stringify(params)}`
        );
        return res;
      } catch (err) {
        message.error("网络错误，请重试");
      }
      return;
    },

    async addUser(params: UserBasicInfoParam) {
      try {
        const res: Res = await axios.post("/api/addUser", params);
        return res;
      } catch (err) {
        message.error("网络错误，请重试");
      }
      return;
    },

    async upUser(params: UserBasicInfoParam) {
      try {
        const res: Res = await axios.post("/api/upUser", params);
        return res;
      } catch (err) {
        message.error("网络错误，请重试");
      }
      return;
    },

    async delUser(params: { id: number }) {
      try {
        const res: Res = await axios.post("/api/delUser", params);
        return res;
      } catch (err) {
        message.error("网络错误，请重试");
      }
      return;
    },

    async setUserRoles(params: { id: number; roles: number[] }) {
      try {
        const res: Res = await axios.post("/api/upUser", params);
        return res;
      } catch (err) {
        message.error("网络错误，请重试");
      }
      return;
    },
  }),
};
