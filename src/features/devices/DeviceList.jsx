import { useSelector, useDispatch } from "react-redux";
import { stateStyles } from "./deviceStateStyles";
import { selectDevice } from "./devicesSlice";

export default function DeviceList() {
  const dispatch = useDispatch();

  const { byId, filter } = useSelector((state) => state.devices);

  const devices = Object.values(byId).filter((d) => {
    if (filter === "ALL") return true;
    return d.state === filter;
  });

  if (devices.length === 0) {
    return (
      <div className="bg-slate-800 rounded-lg p-6 text-slate-400 text-center">
        No devices found
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg p-4 shadow">
      <h2 className="text-lg font-semibold mb-4">Devices</h2>
<div className="flex justify-between items-center mb-2">
  <h2 className="text-lg font-semibold">Devices</h2>

  {filter !== "ALL" && (
    <button
      onClick={() => dispatch(setFilter("ALL"))}
      className="text-xs text-slate-400 hover:text-white"
    >
      Clear Filter
    </button>
  )}
</div>

      <table className="w-full text-sm">
        <thead className="text-slate-400 border-b border-slate-700 text-xs uppercase tracking-wide">
          <tr>
            <th className="text-left py-2 px-2">Device</th>
            <th className="text-left px-2">State</th>
          </tr>
        </thead>

        <tbody>
          {devices.map((device, idx) => (
            <tr
              key={device.deviceId}
              onClick={() => dispatch(selectDevice(device.deviceId))}
              className={`
                ${idx % 2 === 0 ? "bg-slate-800" : "bg-slate-700/40"}
                hover:bg-slate-700/70
                border-b border-slate-700
                cursor-pointer
                transition
              `}
            >
              <td className="font-mono py-2 px-2">
                {device.deviceId}
              </td>
              <td className="px-2">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${stateStyles[device.state]}`}
                >
                  {device.state}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
