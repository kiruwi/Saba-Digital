import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

// Layout component that includes both Navbar and Sidebar for all pages
const Layout = ({ children, currentTheme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} currentTheme={currentTheme} toggleTheme={toggleTheme} />
      <Navbar toggle={toggle} isOpen={isOpen} currentTheme={currentTheme} toggleTheme={toggleTheme} />
      {children}
    </>
  );
};

export default Layout;
