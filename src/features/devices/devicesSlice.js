import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  byId: {},
  selectedId: null,   // 🔴 for device detail panel
  filter: "ALL",      // 🔴 for KPI-based filtering
};

const devicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    // 1️⃣ Insert or update device (ingestion / heartbeat)
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

    // 2️⃣ Device FSM state transition
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

    // 3️⃣ Select device (click → show details)
    selectDevice(state, action) {
      state.selectedId = action.payload;
    },

    // 4️⃣ Set device filter (KPI click)
    setFilter(state, action) {
      state.filter = action.payload;
    },

    // 5️⃣ Optional: clear selection (nice UX)
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
