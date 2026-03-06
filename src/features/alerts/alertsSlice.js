import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  acknowledged: {},
};

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    acknowledgeAlert(state, action) {
      const deviceId = action.payload;
      state.acknowledged[deviceId] = true;
    },

    resetAcknowledgement(state, action) {
      const deviceId = action.payload;
      delete state.acknowledged[deviceId];
    },
  },
});

export const { acknowledgeAlert, resetAcknowledgement } = alertsSlice.actions;

export default alertsSlice.reducer;
