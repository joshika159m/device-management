import { useSelector, useDispatch } from "react-redux";
import { DEVICE_STATES } from "../types/deviceStates";
import { setFilter } from "../features/devices/devicesSlice";

export default function KpiBar() {
  const dispatch = useDispatch();

  const devices = useSelector((state) =>
    Object.values(state.devices.byId)
  );

  const all = devices.length;
  const active = devices.filter(
    (d) => d.state === DEVICE_STATES.ACTIVE
  ).length;
  const critical = devices.filter(
    (d) => d.state === DEVICE_STATES.FAULT
  ).length;
  const warning = devices.filter(
    (d) => d.state === DEVICE_STATES.WARNING
  ).length;
  const down = devices.filter(
    (d) => d.state === DEVICE_STATES.OFFLINE
  ).length;

  return (
    <div className="flex items-center gap-5">
      <Kpi
        label="ALL"
        value={all}
        color="bg-slate-700"
        onClick={() => dispatch(setFilter("ALL"))}
      />
      <Kpi
        label="ACTIVE"
        value={active}
        color="bg-green-600"
        onClick={() => dispatch(setFilter("ACTIVE"))}
      />
      <Kpi
        label="CRITICAL"
        value={critical}
        color="bg-red-600"
        onClick={() => dispatch(setFilter("FAULT"))}
      />
      <Kpi
        label="WARNING"
        value={warning}
        color="bg-amber-500 text-black"
        onClick={() => dispatch(setFilter("WARNING"))}
      />
      <Kpi
        label="DOWN"
        value={down}
        color="bg-slate-500"
        onClick={() => dispatch(setFilter("OFFLINE"))}
      />
    </div>
  );
}

function Kpi({ label, value, color, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`${color} px-25 py-5 rounded-md text-white cursor-pointer hover:opacity-90 transition`}
    >
      <div className="text-[10px] uppercase tracking-wide leading-none">
        {label}
      </div>
      <div className="text-lg font-bold leading-tight">
        {value}
      </div>
    </div>
  );
}
