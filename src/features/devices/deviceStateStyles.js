import { DEVICE_STATES } from "../../types/deviceStates";

export const stateStyles = {
  [DEVICE_STATES.ACTIVE]: "text-green-400",
  [DEVICE_STATES.WARNING]: "text-yellow-400",
  [DEVICE_STATES.FAULT]: "text-red-500",
  [DEVICE_STATES.OFFLINE]: "text-gray-500",
  [DEVICE_STATES.INITIALIZING]: "text-blue-400",
};
