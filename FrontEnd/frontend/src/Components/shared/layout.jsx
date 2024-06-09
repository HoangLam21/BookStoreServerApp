import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./navBar";
import Footer from "./footer";

export default function Layout() {
  const [isDetailInfoBookVisible, setIsDetailInfoBookVisible] = useState(false);

  const toggleDetailInfoBook = () => {
    setIsDetailInfoBookVisible(!isDetailInfoBookVisible);
  };

  return (
    <div className="relative">
      <div className="overflow-auto">
        <NavBar className="bg-sky-100" style={{ zIndex: 100 }} />
        <div>{<Outlet context={{ toggleDetailInfoBook }} />}</div>
        <Footer className="bg-sky-100" style={{ zIndex: 100 }} />
      </div>
    </div>
  );
}
