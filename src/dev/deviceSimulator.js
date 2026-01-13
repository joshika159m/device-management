import { deviceUpsert, deviceStateChanged } from "../features/devices/devicesSlice";
import { DEVICE_STATES } from "../types/deviceStates";

const states = [
  DEVICE_STATES.ACTIVE,
  DEVICE_STATES.WARNING,
  DEVICE_STATES.FAULT,
  DEVICE_STATES.OFFLINE,
];

function randomState() {
  return states[Math.floor(Math.random() * states.length)];
}

export function startDeviceSimulator(store) {
  const deviceIds = Array.from({ length: 250}, (_, i) => `SIM-${i + 1}`);

  deviceIds.forEach((id) => {
    store.dispatch(
      deviceUpsert({
        deviceId: id,
        state: DEVICE_STATES.INITIALIZING,
      })
    );
  });

  setInterval(() => {
    const deviceId =
      deviceIds[Math.floor(Math.random() * deviceIds.length)];

    const nextState = randomState();

    store.dispatch(
      deviceStateChanged({
        deviceId,
        nextState,
        reason: "SIMULATED_EVENT",
      })
    );
  }, 2000);
}
