import React, { useState } from "react";
import styles from "./CreateChat.module.scss";
import * as Yup from "yup";
import { useFormik } from "formik";
import { register } from "../Redux/thunk";
import { useDispatch } from "react-redux";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { successAlert, errorAlert } from "@/components/Alert/Redux/alertSlice";
import { OpenRoomCreateSuccess } from "../Redux/authSlice";

const validationSchema = Yup.object({
  roomName: Yup.string()
    .required("Room Name is required")
    .max(50, "Room Name must be at most 50 characters"),

  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,16}$/,
      "Password must contain at least one digit, one uppercase letter, and one special symbol. It should be between 5 and 16 characters long."
    ),

  maxMembers: Yup.number()
    .required("Max Members is required")
    .integer("Max Members must be an integer")
    .min(1, "Minimum value for Max Members is 1")
    .max(20, "Maximum value for Max Members is 20"),
});

function index({ setActiveForm }) {
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [inputType, setInputType] = useState("password");

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
      roomName: "",
      password: "",
      maxMembers: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        register({
          name: values.roomName,
          password: values.password,
          maxMembers: values.maxMembers,
        })
      )
        .unwrap()
        .then((response) => {
          if (response?.message) {
            dispatch(successAlert(response?.message));
            dispatch(OpenRoomCreateSuccess(response?.data));
          }
        })
        .catch((error) => {
          dispatch(errorAlert(error?.message));
        });
    },
  });

  return (
    <>
      <form
        action="#"
        onSubmit={formik.handleSubmit}
        className={styles.createRoomForm}
      >
        <div className={styles.formGroup}>
          <label htmlFor="newRoomName">Enter Room Name:</label>
          <input
            type="text"
            id="roomName"
            name="roomName"
            value={formik.values.roomName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.roomName && formik.errors.roomName ? (
            <div className={styles.error}>{formik.errors.roomName}</div>
          ) : null}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="newPassword">Create Password:</label>
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
        <div className={styles.formGroup}>
          <label htmlFor="maxMembers">Maximum Allowed Memebers</label>
          <input
            type="number"
            id="maxMembers"
            name="maxMembers"
            value={formik.values.maxMembers}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.maxMembers && formik.errors.maxMembers ? (
            <div className={styles.error}>{formik.errors.maxMembers}</div>
          ) : null}
        </div>

        <button type="submit" className={styles.submitBtn}>
          Create Room
        </button>

        <p className={styles.remainder}>
          By registering, you agree to Discord's{" "}
          <a href="#" className={styles.link}>
            Terms of Service{" "}
          </a>{" "}
          and{" "}
          <a href="#" className={styles.link}>
            Privacy Policy.
          </a>
        </p>

        <hr className={styles.divider} />
        <a className={styles.joinRoom} onClick={() => setActiveForm("join")}>
          Join Chat Room
        </a>
      </form>
    </>
  );
}

export default index;
