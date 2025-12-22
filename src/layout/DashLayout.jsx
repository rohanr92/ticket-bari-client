import React from 'react';
import { Outlet } from "react-router";
import Sidebar from '../Components/Backend/Sidebar/Sidebar';
import Container from '../Components/Container/Container';
// import Sidebar from "../Components/Dashboard/Sidebar";

const DashLayout = () => {
  return (
   
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="navbar bg-base-100 lg:hidden">
          <div className="flex-none">
            <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
              ☰
            </label>
          </div>
          <div className="flex-1 font-bold">Dashboard</div>
        </div>

        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <Sidebar />
      </div>
    </div>
   
  );
};

export default DashLayout;
