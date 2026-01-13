import { io } from "socket.io-client";
import { deviceUpsert, deviceStateChanged } from "../features/devices/devicesSlice";

let socket = null;

export const initWebSocket = (store) => {
  socket = io("http://localhost:3000", {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    setTimeout(() => {
  store.dispatch({
    type: "devices/deviceUpsert",
    payload: {
      deviceId: "TEST-FAULT",
      state: "FAULT",
    },
  });
}, 1000);

setTimeout(() => {
  store.dispatch({
    type: "devices/deviceUpsert",
    payload: {
      deviceId: "TEST-OFFLINE",
      state: "OFFLINE",
    },
  });
}, 2000);

setTimeout(() => {
  store.dispatch({
    type: "devices/deviceUpsert",
    payload: {
      deviceId: "TEST-ACTIVE",
      state: "ACTIVE",
    },
  });
}, 3000);

  });

  socket.on("device:update", (payload) => {
    // payload example:
    // { deviceId, state, ... }

    store.dispatch(deviceUpsert(payload));

    if (payload.nextState) {
      store.dispatch(
        deviceStateChanged({
          deviceId: payload.deviceId,
          nextState: payload.nextState,
        })
      );
    }
  });

  socket.on("disconnect", () => {
    console.warn("WebSocket disconnected");
  });
};
