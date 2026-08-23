import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function StoreLayout() {
    const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50 flex">
      
      <Sidebar open={open} setOpen={setOpen} />

      <main className="flex-1 min-w-0 md:ml-64">
        <Outlet />
      </main>

    </div>
  );
}