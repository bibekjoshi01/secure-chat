import React from "react";
import styles from "./CreateChat.module.scss";

function index({ setCreatingRoom }) {
  return (
    <>
      <form className={styles.createRoomForm}>
        <label htmlFor="newRoomName">Enter Room Name:</label>
        <input type="text" id="newRoomName" name="newRoomName" />

        <label htmlFor="newPassword">Create Password:</label>
        <input type="password" id="newPassword" name="newPassword" />

        <label htmlFor="maxMembs">Maximum Allowed Memebers</label>
        <input type="number" id="maxMembs" name="maxMembs" />

        <button type="submit">Create Room</button>
        <p className={styles.remainder}>
          By registering, you agree to Discord's <a href="#" className={styles.link}>Terms of Service </a> and{" "}
          <a href="#" className={styles.link}>Privacy Policy.</a>
        </p>
        <hr className={styles.divider} />
        <a className={styles.joinChat} href="#button" onClick={() => setCreatingRoom(false)}>
          Join Chat Room
        </a>
      </form>
    </>
  );
}

export default index;
