import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import WebDashCopms from "./WebDashComps";
import WebSidebar from "./WebSidebar";
import WebHeader from "./WebHeader";

const WebDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="home-page w-screen h-screen relative overflow-hidden">
        <div className="flex">
          <div className="hidden lg:flex lg:w-[20%] relative">
            <WebSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          </div>
          <div className="w-full lg:w-[80%]">
            <WebHeader setSidebarOpen={setSidebarOpen} />
            <div className="pt-26 mx-6 overflow-y-scroll h-[100vh] hide-scrollbar">
              <WebDashCopms />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WebDashboard;
