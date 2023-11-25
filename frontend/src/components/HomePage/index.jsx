import React from "react";
import styles from "./Home.module.scss";
import Account from "../Account";
import RoomCreateSuccess from "../RoomCreateSuccess";

function index() {
  return (
    <section className={styles.main}>
      <div className={styles.content}></div>
      <div className={styles.forms}>
        <Account />
        {/* <RoomCreateSuccess /> */}
      </div>
    </section>
  );
}

export default index;
