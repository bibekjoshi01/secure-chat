import React from "react";
import styles from "./CreateSuccess.module.scss";

function index() {
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h1 className={styles.heading}>Your Room Created Successfully!</h1>
        </div>

        <div className={styles.content}>
          <h2 className={styles.heading2}>Room Code</h2>
          <p className={styles.roomNo}>567 654 123 789</p>
          <h2 className={styles.heading2}>Room Reset Pin</h2>
          <p className={styles.roomNo}>024576</p>
        </div>

        <div className={styles.footer}>
          <p className={styles.remainder}>
            Please note down room code and reset code for futher purpose.
            <span>*</span>
          </p>
          <a href="#" className={styles.joinRoom}>
            Enter Room
          </a>
        </div>
      </div>
    </section>
  );
}

export default index;
