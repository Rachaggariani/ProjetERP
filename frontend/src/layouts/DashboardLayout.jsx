import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer";
import Sidebar from "../Shared/SideBar";
import Navbar from "../Shared/NavBar"
function DashboardLayout() {

  return (
    <div>
    <Navbar/>
    <div className="main-container" id="container">
      
      <Sidebar/>
      <div id="content" className="main-content">
      <div className="layout-px-spacing">
    
      <Outlet />
      </div>
      
     <Footer />
      </div>
    </div>
    </div>
  );
}

export default DashboardLayout;
