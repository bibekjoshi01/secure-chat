import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { alertSelector } from "./Redux/selector";
import { closeAlert } from "./Redux/alertSlice";

const Alert = ({ openAlert, data }) => {
  const { success, error, info } = useSelector(alertSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      toast.success(data || "Success", {
        position: "top-center",
        duration: 4000,
        style: {
          position: "relative",
          fontSize: "15px",
          width: "max-content",
        },
      });
    } else if (error) {
      toast.error(data || "Failed", {
        position: "top-center",
        duration: 4000,
        style: {
          position: "relative",
          fontSize: "15px",
        },
      });
    } else if (info) {
      toast.success(data || "Info", {
        position: "top-center",
        duration: 4000,
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          fontSize: "20px",
        },
      });
    }

    setTimeout(() => {
      dispatch(closeAlert());
    }, 5200);
  }, [openAlert, data, dispatch, error, info, success]);

  return <>{openAlert && <Toaster />}</>;
};

export default Alert;
