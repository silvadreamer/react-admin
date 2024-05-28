import axios from "@/util/axios";
import { message } from "antd";

const defaultState = {
  userinfo: {
    roles: [],
    menus: [],
    powers: [],
    userBasicInfo: null,
  },
  powersCode: [],
};

export default {
  state: defaultState,
  reducers: {
    reducerUserInfo(state, payload) {
      return {
        ...state,
        userinfo: payload,
        powersCode: payload.powers.map((item) => item.code),
      };
    },
    reducerLogout(state) {
      return {
        ...state,
        userinfo: {
          menus: [],
          roles: [],
          powers: [],
        },
      };
    },
  },

  effects: (dispatch) => ({
    async onLogin(params) {
      try {
        const res = await axios.post("/api/login", params);
        return res;
      } catch (err) {
        message.error("网络错误，请重试");
      }
      return;
    },

    async onLogout() {
      try {
        dispatch({ type: "app/reducerLogout", payload: null });
        sessionStorage.removeItem("userinfo");
        return "success";
      } catch (err) {
        message.error("网络错误，请重试");
      }
      return;
    },

    async setUserInfo(params) {
      dispatch.app.reducerUserInfo(params);
      return "success";
    },

    async updateUserInfo(payload, rootState) {
      const userinfo = rootState.app.userinfo;

      const res2 = await dispatch.sys.getRoleById({
        id: userinfo.roles.map((item) => item.id),
      });
      if (!res2 || res2.status !== 200) {
        return res2;
      }

      const roles = res2.data.filter((item) => item.conditions === 1);

      const menuAndPowers = roles.reduce(
        (a, b) => [...a, ...b.menuAndPowers],
        []
      );
      const res3 = await dispatch.sys.getMenusById({
        id: Array.from(new Set(menuAndPowers.map((item) => item.menuId))),
      });
      if (!res3 || res3.status !== 200) {
        return res3;
      }
      const menus = res3.data.filter((item) => item.conditions === 1);

      const res4 = await dispatch.sys.getPowerById({
        id: Array.from(
          new Set(menuAndPowers.reduce((a, b) => [...a, ...b.powers], []))
        ),
      });
      if (!res4 || res4.status !== 200) {
        return res4;
      }
      const powers = res4.data.filter((item) => item.conditions === 1);
      this.setUserInfo({
        ...userinfo,
        roles,
        menus,
        powers,
      });
      return;
    },
  }),
};
