import { io } from "socket.io-client";
import { deviceUpsert, deviceStateChanged } from "../features/devices/devicesSlice";

let socket = null;

export const initWebSocket = (store) => {
  socket = io("http://localhost:3000", {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("WebSocket connected:", socket.id);
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
