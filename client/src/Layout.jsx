import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function Layout() {
  return (
    <div className="mx-auto overflow-hidden">
      <Header />
      <Outlet />
    </div>
  );
}

// sm:px-4 px-2 flex flex-col min-h-screen sm:max-w-6xl max-w-md
