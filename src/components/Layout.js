import React from "react";
import NavBar from "./Nav";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
};

export default Layout;
