import React from "react";
import styles from "./JoinChat.module.scss";

function index({ handleCreateRoomClick }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Your form submission logic here
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.joinRoomForm}>
        <label htmlFor="username">Room Code:</label>
        <input type="text" id="username" name="username" />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />

        <button type="submit">Join Room</button>
        <hr className={styles.divider} />
        <a href="#button" onClick={handleCreateRoomClick}>
          Create New Room
        </a>
      </form>
    </>
  );
}

export default index;
