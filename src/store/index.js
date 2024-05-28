import { init } from "@rematch/core";

import app from "@/models/app";
import sys from "@/models/sys";

const rootModel = { app, sys };
const store = init({
  models: rootModel,
});

export default store;
