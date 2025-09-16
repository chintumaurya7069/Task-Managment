import React, { useState } from "react";
import Sidemenu from "../layout/Sidemenu";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const AdminLayout = () => {
  const [toggle, setToggle] = useState(true);
  const [isHovered, setIsHovered] = useState(true);
  const [isFixed, setIsFixed] = useState(false);

  return (
    <div
      className={`bg-white h-screen flex flex-col transition-all duration-300 ease-in-out`}
    >
      <div><Header/></div>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidemenu
          setToggle={setToggle}
          setIsHovered={setIsHovered}
          setIsFixed={setIsFixed}
          className={`fixed top-0 left-0 h-full bg-gray-900 text-gray-100 transition-width duration-300 ease-in-out ${
            toggle ? "w-64" : isFixed ? "w-16" : "w-20"
          }`}
        />

        {/* Main content */}
        <main
          className="flex-1 flex flex-col overflow-y-auto mt-[50px] "
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="container mx-auto p-5 h-screen mb-5 border border-gray-300 rounded-2xl shadow">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
