import Sidebar from "./components/Sidebar";
import KpiBar from "./components/KpiBar";
import DeviceList from "./features/devices/DeviceList";
import DeviceDetail from "./features/devices/DeviceDetail";

import AlertsPanel from "./features/alerts/AlertsPanel";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6 space-y-6">
          <KpiBar />

          <div className="grid grid-cols-12 gap-6">
            <section className="col-span-5">
              <DeviceList />
            </section>

            <section className="col-span-4">
  <DeviceDetail />
</section>


            <section className="col-span-3">
              <AlertsPanel />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
