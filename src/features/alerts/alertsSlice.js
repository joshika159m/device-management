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
  },
});

export const { acknowledgeAlert } = alertsSlice.actions;
export default alertsSlice.reducer;
