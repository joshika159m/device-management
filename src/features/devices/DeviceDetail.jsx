import { useSelector } from "react-redux";
import { stateStyles } from "./deviceStateStyles";

export default function DeviceDetail() {
  const selectedId = useSelector(
    (state) => state.devices.selectedId
  );

  const device = useSelector(
    (state) => selectedId && state.devices.byId[selectedId]
  );

  if (!device) {
    return (
      <div className="bg-slate-800 rounded-lg p-6 text-slate-400 h-full">
        Select a device to view details
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg p-6 h-full">
      <h2 className="text-lg font-semibold mb-2 font-mono">
        {device.deviceId}
      </h2>

      <div className="mb-4">
        <span
          className={`text-xs font-semibold px-2 py-1 rounded ${stateStyles[device.state]}`}
        >
          {device.state}
        </span>
      </div>

      <h3 className="text-sm text-slate-400 mb-2">
        State Transition Timeline
      </h3>

      <ul className="text-sm space-y-1">
        {device.history?.map((h, i) => (
          <li key={i} className="font-mono">
            {new Date(h.timestamp).toLocaleTimeString()} — {h.from} → {h.to}
          </li>
        ))}
      </ul>
    </div>
  );
}
