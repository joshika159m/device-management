import { useSelector } from "react-redux";
import { stateStyles } from "./deviceStateStyles";

export default function DeviceDetail() {
  const selectedId = useSelector((state) => state.devices.selectedId);

  const device = useSelector(
    (state) => selectedId && state.devices.byId[selectedId],
  );

  const acknowledged = useSelector((state) => state.alerts.acknowledged);

  if (!device) {
    return (
      <div className="bg-slate-800 rounded-lg p-6 text-slate-400 h-full">
        Select a device to view details
      </div>
    );
  }

  const isAcknowledged = acknowledged[device.deviceId];

  return (
    <div className="bg-slate-800 rounded-lg p-6 h-full">
      <h2 className="text-lg font-semibold mb-2 font-mono">
        {device.deviceId}
      </h2>

      <div className="mb-4 flex items-center gap-2">
        <span
          className={`text-xs font-semibold px-2 py-1 rounded ${stateStyles[device.state]}`}
        >
          {device.state}
        </span>

        {isAcknowledged && (
          <span className="text-xs bg-green-600 px-2 py-1 rounded">
            ✔ Alert Acknowledged
          </span>
        )}
      </div>

      <h3 className="text-sm text-slate-400 mb-2">State Transition Timeline</h3>

      <ul className="text-sm space-y-1">
        {device.history?.length === 0 && (
          <li className="text-slate-500 text-xs">No state changes recorded</li>
        )}

        {device.history
          ?.slice()
          .reverse()
          .map((h, i) => (
            <li key={i} className="font-mono">
              {new Date(h.timestamp).toLocaleTimeString()} — {h.from} → {h.to}
            </li>
          ))}
      </ul>
    </div>
  );
}
