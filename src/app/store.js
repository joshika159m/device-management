import { configureStore } from "@reduxjs/toolkit";
import devicesReducer from "../features/devices/devicesSlice";

export const store = configureStore({
  reducer: {
    devices: devicesReducer,
  },
});
