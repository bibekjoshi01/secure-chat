import React from "react";
import styles from "./CreateSuccess.module.scss";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { authSelector } from "@/components/Account/Redux/selector";
import { CloseRoomCreateSuccess } from "../Account/Redux/authSlice";

function index() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { createSuccessModal } = useSelector(authSelector);

  if (!createSuccessModal) {
    return null;
  }

  const handleCloseSuccessModal = () => {
    dispatch(CloseRoomCreateSuccess());
    router.push("/");
  };

  const joinRoom = () => {
    dispatch(CloseRoomCreateSuccess());
  };

  const { roomName, roomCode, pinCode, maxMembers } = createSuccessModal;

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h1 className={styles.heading}>Your Room Created Successfully!</h1>
        </div>

        <div className={styles.close}>
          <FaTimes
            className={styles.closeIcon}
            onClick={handleCloseSuccessModal}
          />
        </div>

        <div className={styles.content}>
          <h2 className={styles.heading2}>Room Code</h2>
          <p className={styles.roomNo}>{roomCode}</p>
          <h2 className={styles.heading2}>Room Reset Pin</h2>
          <p className={styles.roomNo}>{pinCode}</p>
        </div>

        <div className={styles.footer}>
          <p className={styles.remainder}>
            Please note down room code and reset code for further purpose.
            <span>*</span>
          </p>
          <a onClick={joinRoom} className={styles.joinRoom}>
            Enter Room
          </a>
        </div>
      </div>
    </section>
  );
}

export default index;
