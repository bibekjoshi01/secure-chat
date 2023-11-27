import React from "react";
import styles from "./Home.module.scss";
import { useSelector } from "react-redux";
import Account from "../Account";
import RoomCreateSuccess from "../RoomCreateSuccess";
import { authSelector } from "@/components/Account/Redux/selector";

function index() {
  const { createSuccessModal } = useSelector(authSelector);

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        {createSuccessModal ? (
          <RoomCreateSuccess />
        ) : (
          <>
            <div className={styles.content}>
              <h1>SecureChat</h1>
              <p>
                Connect confidently with friends while ensuring your privacy and
                security.
              </p>
            </div>
            <div className={styles.forms}>
              <Account />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default index;
