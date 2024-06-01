import axios from "@/util/axios";
import qs from "qs";

const defaultState = {
  menus: [],
  roles: [],
  powerTreeData: [],
};

export default {
  state: defaultState,
  reducers: {
    reducerSetMenus(state, payload) {
      return { ...state, menus: payload };
    },
    reducerSetRoles(state, payload) {
      return { ...state, roles: payload };
    },
    reducerSetAllPowers(state, payload) {
      return { ...state, powerTreeData: payload };
    },
  },

  effects: (dispatch) => ({

    async delMenu(params) {
      try {
        const res = await axios.post("/api/delmenu", params);
        return res;
      } catch (err) {      }
      return;
    },

    async getAllRoles() {
      try {
        const res = await axios.get("/api/getAllRoles");
        if (res && res.status === 200) {
          dispatch.sys.reducerSetRoles(res.data);
        }
        return res;
      } catch (err) {      }
      return;
    },

    async getMenus() {
      try {
        const res = await axios.get("/api/getmenus");
        if (res && res.status === 200) {
          dispatch.sys.reducerSetMenus(res.data);
        }
        return res;
      } catch (err) {      }
      return;
    },

    async getMenusById(params) {
      try {
        const res = await axios.post(`/api/getMenusById`, params);
        return res;
      } catch (err) {      }
      return;
    },

    async addMenu(params) {
      try {
        const res = await axios.post("/api/addmenu", params);
        return res;
      } catch (err) {      }
      return;
    },

    async upMenu(params) {
      try {
        const res = await axios.post("/api/upmenu", params);
        return res;
      } catch (err) {      }
      return;
    },

    async addPower(params) {
      try {
        const res = await axios.post("/api/addpower", params);
        return res;
      } catch (err) {      }
      return;
    },

    async upPower(params) {
      try {
        const res = await axios.post("/api/uppower", params);
        return res;
      } catch (err) {      }
      return;
    },

    async delPower(params) {
      try {
        const res = await axios.post("/api/delpower", params);
        return res;
      } catch (err) {      }
      return;
    },

    async getRoles(params) {
      try {
        const res = await axios.get(
          `/api/getroles?${qs.stringify(params)}`
        );
        return res;
      } catch (err) {      }
      return;
    },

    async getPowerDataByMenuId(params) {
      try {
        const res = await axios.get(
          `/api/getpowerbymenuid?${qs.stringify(params)}`
        );
        return res;
      } catch (err) {      }
      return;
    },

    async getPowerById(params) {
      try {
        const res = await axios.post(`/api/getPowerById`, params);
        return res;
      } catch (err) {      }
      return;
    },

    async findAllPowerByRoleId(params) {
      try {
        const res = await axios.get(
          `/api/findAllPowerByRoleId?${qs.stringify(params)}`
        );
        return res;
      } catch (err) {      }
      return;
    },

    async getAllMenusAndPowers() {
      try {
        const res = await axios.get(`/api/getAllMenusAndPowers`);
        if (res && res.status === 200) {
          dispatch.sys.reducerSetAllPowers(res.data);
        }
        return res;
      } catch (err) {      }
      return;
    },

    async setPowersByRoleId(params) {
      try {
        const res = await axios.post("/api/setPowersByRoleId", params);
        return res;
      } catch (err) {      }
      return;
    },

    async getRoleById(params) {
      try {
        const res = await axios.post(`/api/getRoleById`, params);
        return res;
      } catch (err) {      }
      return;
    },

    async addRole(params) {
      try {
        const res = await axios.post("/api/addrole", params);
        return res;
      } catch (err) {      }
      return;
    },

    async upRole(params) {
      try {
        const res = await axios.post("/api/uprole", params);
        return res;
      } catch (err) {      }
      return;
    },

    async delRole(params) {
      try {
        const res = await axios.post("/api/delrole", params);
        return res;
      } catch (err) {      }
      return;
    },

    async setPowersByRoleIds(params) {
      try {
        const res = await axios.post("/api/setPowersByRoleIds", params);
        return res;
      } catch (err) {      }
      return;
    },

    async getUserList(params) {
      try {
        const res = await axios.get(
          `/api/getUserList?${qs.stringify(params)}`
        );
        return res;
      } catch (err) {      }
      return;
    },

    async addUser(params) {
      try {
        const res = await axios.post("/api/addUser", params);
        return res;
      } catch (err) {      }
      return;
    },

    async upUser(params) {
      try {
        const res = await axios.post("/api/upUser", params);
        return res;
      } catch (err) {      }
      return;
    },

    async delUser(params) {
      try {
        const res = await axios.post("/api/delUser", params);
        return res;
      } catch (err) {      }
      return;
    },

    async setUserRoles(params) {
      try {
        const res = await axios.post("/api/upUser", params);
        return res;
      } catch (err) {      }
      return;
    },
  }),
};
