import React from "react";
import { useState } from "react";
import styles from "./Account.module.scss";
import CreateChatRoom from "./CreateChatRoom";
import JoinChatRoom from "./JoinChatRoom";

function index() {
  const [activeForm, setActiveForm] = useState("join");

  return (
    <section className={styles.main}>
      <div className={styles.formContainer}>
        <p className={styles.heading}>Welcome to SecureChat!</p>
        <p className={styles.desc}>Your Gateway to Secure Conversations</p>

        <div>
          {activeForm === "create" ? (
            // Display Create New Room form
            <CreateChatRoom setActiveForm={setActiveForm} />
          ) : (
            // Display Join Chat Room form
            <JoinChatRoom setActiveForm={setActiveForm} />
          )}
        </div>
      </div>
    </section>
  );
}

export default index;
