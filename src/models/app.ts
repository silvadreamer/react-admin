import axios from "@/util/axios"; 
import { message } from "antd";
import { Dispatch, RootState } from "@/store";
import {
  Menu,
  Role,
  Power,
  MenuAndPower,
  UserInfo,
  AppState,
  Res,
} from "./index.type";

const defaultState: AppState = {
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
    reducerUserInfo(state: AppState, payload: UserInfo) {
      return {
        ...state,
        userinfo: payload,
        powersCode: payload.powers.map((item) => item.code),
      };
    },
    reducerLogout(state: AppState) {
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

  effects: (dispatch: Dispatch) => ({
    async onLogin(params: { username: string; password: string }) {
      try {
        const res: Res = await axios.post("/api/login", params);
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

    async setUserInfo(params: UserInfo) {
      dispatch.app.reducerUserInfo(params);
      return "success";
    },

    async updateUserInfo(payload: null, rootState: RootState): Promise<any> {
      const userinfo: UserInfo = rootState.app.userinfo;

      const res2: Res | undefined = await dispatch.sys.getRoleById({
        id: userinfo.roles.map((item) => item.id),
      });
      if (!res2 || res2.status !== 200) {
        return res2;
      }

      const roles: Role[] = res2.data.filter(
        (item: Role) => item.conditions === 1
      );

      const menuAndPowers = roles.reduce(
        (a, b) => [...a, ...b.menuAndPowers],
        [] as MenuAndPower[]
      );
      const res3: Res | undefined = await dispatch.sys.getMenusById({
        id: Array.from(new Set(menuAndPowers.map((item) => item.menuId))),
      });
      if (!res3 || res3.status !== 200) {
        return res3;
      }
      const menus: Menu[] = res3.data.filter(
        (item: Menu) => item.conditions === 1
      );

      const res4: Res | undefined = await dispatch.sys.getPowerById({
        id: Array.from(
          new Set(
            menuAndPowers.reduce((a, b) => [...a, ...b.powers], [] as number[])
          )
        ),
      });
      if (!res4 || res4.status !== 200) {
        return res4;
      }
      const powers: Power[] = res4.data.filter(
        (item: Power) => item.conditions === 1
      );
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
