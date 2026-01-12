import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  byId: {},
};

const devicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    deviceUpsert(state, action) {
      const device = action.payload;
      state.byId[device.deviceId] = device;
    },

    deviceStateChanged(state, action) {
      const { deviceId, nextState } = action.payload;
      if (!state.byId[deviceId]) return;
      state.byId[deviceId].state = nextState;
    },
  },
});

export const { deviceUpsert, deviceStateChanged } =
  devicesSlice.actions;

export default devicesSlice.reducer;
