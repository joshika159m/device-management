import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  byId: {},
  selectedId: null,
  filter: "ALL",
};

const devicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    deviceUpsert(state, action) {
      const device = action.payload;

      if (!state.byId[device.deviceId]) {
        state.byId[device.deviceId] = {
          ...device,
          history: [],
        };
      } else {
        state.byId[device.deviceId] = {
          ...state.byId[device.deviceId],
          ...device,
        };
      }
    },

    deviceStateChanged(state, action) {
      const { deviceId, nextState, reason } = action.payload;

      const device = state.byId[deviceId];
      if (!device) return;

      const prevState = device.state;

      device.state = nextState;

      device.history.push({
        from: prevState,
        to: nextState,
        reason: reason || "N/A",
        timestamp: Date.now(),
      });
    },

    selectDevice(state, action) {
      state.selectedId = action.payload;
    },

    setFilter(state, action) {
      state.filter = action.payload;
    },

    clearSelectedDevice(state) {
      state.selectedId = null;
    },
  },
});

export const {
  deviceUpsert,
  deviceStateChanged,
  selectDevice,
  setFilter,
  clearSelectedDevice,
} = devicesSlice.actions;

export default devicesSlice.reducer;
