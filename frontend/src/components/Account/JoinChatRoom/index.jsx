import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./JoinChat.module.scss";
import { login } from "../Redux/thunk";
import { useDispatch } from "react-redux";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { useRouter } from "next/router";
import { successAlert } from "@/components/Alert/Redux/alertSlice";

const validationSchema = Yup.object({
  // roomCode: Yup.string()
  //   .matches(/^[0-9]{3}$/, "Room code must be exactly 12 digits")
  //   .required("Room code is required"),
  password: Yup.string().required("Password is required"),
});

function index({ setActiveForm }) {
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [inputType, setInputType] = useState("password");
  const router = useRouter();

  const togglePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  const formik = useFormik({
    initialValues: {
      roomCode: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        login({
          roomCode: values.roomCode,
          password: values.password,
        })
      )
        .unwrap()
        .then((response) => {
          if (response?.message) {
            dispatch(successAlert(response?.message));
          } else {
            dispatch(successAlert("Logged In Successfully"));
            router.push("/chat");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={styles.joinRoomForm}>
        <div className={styles.formGroup}>
          <label htmlFor="roomCode">Room Code:</label>
          <input
            type="text"
            id="roomCode"
            name="roomCode"
            value={formik.values.roomCode}
            autoComplete="on"
            inputMode="numeric"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.roomCode && formik.errors.roomCode ? (
            <div className={styles.error}>{formik.errors.roomCode}</div>
          ) : null}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <div className={styles.inputGroup}>
            <input
              type={inputType}
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {passwordVisible ? (
              <ImEye className={styles.icon} onClick={togglePasswordVisible} />
            ) : (
              <ImEyeBlocked
                className={styles.icon}
                onClick={togglePasswordVisible}
              />
            )}
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className={styles.error}>{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit" className={styles.submitBtn}>
          Join Room
        </button>
        <hr className={styles.divider} />
        <a
          href="#button"
          className={styles.createRoom}
          onClick={() => setActiveForm("create")}
        >
          Create New Room
        </a>
      </form>
    </>
  );
}

export default index;
