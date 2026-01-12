import { useSelector } from "react-redux";
import { stateStyles } from "./deviceStateStyles";

export default function DeviceList() {
  const devices = useSelector((state) =>
    Object.values(state.devices.byId)
  );

  if (devices.length === 0) {
    return (
      <div className="text-gray-400 text-center mt-10">
        No devices connected
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        Devices
      </h2>

      <div className="space-y-2">
        {devices.map((device) => (
          <div
            key={device.deviceId}
            className="border rounded p-4 flex justify-between"
          >
            <span className="font-mono">
              {device.deviceId}
            </span>

            <span
              className={
                stateStyles[device.state] || "text-white"
              }
            >
              {device.state}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
