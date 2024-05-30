import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Router from "./router";

import "normalize.css";
import "@/assets/styles/default.css";
import "@/assets/styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Router />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
