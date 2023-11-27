import React, { useEffect } from "react";
import { alertSelector } from "@/components/Alert/Redux/selector";
import { useSelector } from "react-redux";
import Alert from "@/components/Alert";

const DisableRightClick = ({ children }) => {
  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return <>{children}</>;
};

const Layout = ({ children }) => {
  const { open, message } = useSelector(alertSelector);

  return (
    <>
      <DisableRightClick>
        {open && <Alert openAlert={open} data={message} />}
        <main>{children}</main>
      </DisableRightClick>
    </>
  );
};

export default Layout;
