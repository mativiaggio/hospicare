import React from "react";
import MenuOptions from "./menu-options";

const AdminSidebar = async () => {
  return (
    <>
      <MenuOptions defaultOpen={true} />

      <MenuOptions />
    </>
  );
};

export default AdminSidebar;
