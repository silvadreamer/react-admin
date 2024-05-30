import { baseUrl } from "../config/index.js";
import axios from "axios";

import Mock from "mockjs";
import mock from "../../mock/functions.jsx";

Mock.mock(/\/api.*/, (options) => {
  const res = mock(options);
  return res;
});

axios.defaults.baseURL = baseUrl;
axios.defaults.withCredentials = false;

axios.interceptors.response.use((response) => {
  return response.data;
});

export default axios;
