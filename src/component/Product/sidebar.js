import React from "react";
import ProductByCategory from "./ProductByCategory";

function Sidebar() {
  const sidebarStyle = {
    width: "300px",
    position: "fixed",
    top: "0",
    left: "0",
    bottom: "0",
    background: "#f0f0f0",
    padding: "20px",
    overflowY: "scroll",
  };

  return (
    <div style={sidebarStyle}>
      <ProductByCategory />
    </div>
  );
}

export default Sidebar;
