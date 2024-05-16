/** 对axios做一些配置 **/

import { baseUrl } from "../config";
import axios from "axios";

import Mock from "mockjs";
// @ts-ignore
import mock from "../../mock/app-data.js";
Mock.mock(/\/api.*/, (options: any) => {
  const res = mock(options);
  return res;
});

axios.defaults.baseURL = baseUrl;
axios.defaults.withCredentials = false;
axios.interceptors.response.use((response) => {

  return response.data;
});

export default axios;
