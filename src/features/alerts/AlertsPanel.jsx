import { useSelector, useDispatch } from "react-redux";
import { DEVICE_STATES } from "../../types/deviceStates";
import { acknowledgeAlert } from "./alertsSlice";

export default function AlertsPanel() {
  const dispatch = useDispatch();

  const devices = useSelector((state) =>
    Object.values(state.devices.byId)
  );

  const acknowledged = useSelector(
    (state) => state.alerts.acknowledged
  );

  const alerts = devices.filter(
    (d) =>
      (d.state === DEVICE_STATES.FAULT ||
        d.state === DEVICE_STATES.OFFLINE) &&
      !acknowledged[d.deviceId]
  );

  return (
    <div className="bg-slate-800 rounded-lg p-4 h-full">
      <h2 className="text-lg font-semibold text-red-400 mb-4">
        Active Alerts
      </h2>

      {alerts.length === 0 ? (
        <div className="text-slate-400 text-sm">
          No active alerts
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead className="text-slate-400 border-b border-slate-700">
            <tr>
              <th className="text-left py-2">Status</th>
              <th className="text-left">Device</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>

          <tbody>
  {alerts.map((device, idx) => (
    <tr
      key={device.deviceId}
      className={`
        ${idx % 2 === 0 ? "bg-red-900/20" : "bg-red-900/30"}
        border-b border-red-700
      `}
    >
      <td className="py-2 px-2">
        <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
          {device.state}
        </span>
      </td>

      <td className="font-mono px-2">
        {device.deviceId}
      </td>

      <td className="text-right px-2">
        <button
          onClick={() => dispatch(acknowledgeAlert(device.deviceId))}
          className="text-xs px-3 py-1 bg-red-700 hover:bg-red-600 rounded transition"
        >
          Acknowledge
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      )}
    </div>
  );
}
