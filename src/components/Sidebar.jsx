export default function Sidebar() {
  return (
   <aside className="w-60 bg-slate-800 text-slate-200 h-screen p-6 border-r border-slate-700">

      <h1 className="text-xl font-bold mb-8 tracking-wide">
  OpsDash
</h1>


      <nav className="space-y-4 text-sm">
        <div className="text-slate-400 uppercase">Dashboards</div>
        <div className="hover:text-white cursor-pointer">
          Open Alerts
        </div>
        <div className="hover:text-white cursor-pointer">
          Event History
        </div>

        <div className="mt-6 text-slate-400 uppercase">Settings</div>
        <div className="hover:text-white cursor-pointer">
          System
        </div>
        <div className="hover:text-white cursor-pointer">
          Account
        </div>
      </nav>
    </aside>
  );
}
