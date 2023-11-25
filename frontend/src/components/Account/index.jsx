import React from "react";
import { useState } from "react";
import styles from "./Account.module.scss";
import CreateChatRoom from "./CreateChatRoom";
import JoinChatRoom from "./JoinChatRoom";

function index() {
  const [isCreatingRoom, setCreatingRoom] = useState(false);

  const handleCreateRoomClick = () => {
    setCreatingRoom(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your form submission logic here
  };

  return (
    <section className={styles.main}>
      <div className={styles.formContainer}>
        <p className={styles.heading}>Welcome to SecureChat!</p>
        <p className={styles.desc}>Your Gateway to Secure Conversations</p>

        <div>
          {isCreatingRoom ? (
            // Display Create New Room form
            <CreateChatRoom setCreatingRoom={setCreatingRoom} />
          ) : (
            // Display Join Chat Room form
            <JoinChatRoom handleCreateRoomClick={handleCreateRoomClick} />
          )}
        </div>
      </div>
    </section>
  );
}

export default index;
