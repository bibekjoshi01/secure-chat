import React from "react";
import styles from "./Home.module.scss";
import Account from "../Account";
import RoomCreateSuccess from "../RoomCreateSuccess";

function index() {
  return (
    <section className={styles.main}>
      <div className={styles.container}>
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
        {/* <RoomCreateSuccess /> */}
      </div>
    </section>
  );
}

export default index;
