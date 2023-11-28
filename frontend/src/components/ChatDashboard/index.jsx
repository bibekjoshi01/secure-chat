import Time from "./time";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMicrophone } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import groupIcon from "../../assets/male.png";
import { TbDotsVertical } from "react-icons/tb";
import styles from "./ChatDashboard.module.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { roomSelector } from "./Redux/selector";
import { roomProfile } from "./Redux/thunk";

const ChatDashboard = ({ roomId }) => {
  const dispatch = useDispatch();
  const { roomInfo } = useSelector(roomSelector);

  useEffect(() => {
    dispatch(roomProfile(roomId));
  }, [roomInfo, roomId]);

  const [msg, setMsg] = useState("");
  const handleChange = (e) => {
    setMsg(e.target.value);
  };

  const ChatHeader = ({ styles }) => (
    <div className={styles.header}>
      <div className={styles.groupInfo}>
        <Image src={groupIcon} alt="groupIcon" className={styles.groupIcon} />
        <span>{roomInfo?.name}</span>
      </div>
      <div className={styles.options}>
        <TbDotsVertical className={styles.icon} />
      </div>
    </div>
  );

  const messagesData = [
    { text: "Hi", type: "incoming", id: 1 },
    { text: "Hello there!", type: "outgoing", id: 2 },
    { text: "How are you?", type: "incoming", id: 3 },
    { text: "I'm good, thank you!", type: "outgoing", id: 4 },
    { text: "I'm good, thank you!", type: "outgoing", id: 4 },
  ];

  const Message = ({ message, styles }) => (
    <div className={`${styles.msgBox} ${styles[`${message.type}Msg`]}`}>
      {message.text} <Time />
    </div>
  );

  const MessageArea = ({ styles }) => (
    <div className={styles?.msgArea}>
      <div className={styles?.messages}>
        {messagesData.map((message) => (
          <Message key={message.id} message={message} styles={styles} />
        ))}
      </div>
    </div>
  );

  const MessageForm = ({ styles }) => (
    <form className={styles.form} autoComplete="off">
      <div className={styles.row}>
        <BsEmojiSmile className={styles.icon} />
        <FaPlus className={styles.icon} />
        <textarea
          name="inputMsg"
          className={styles.inputMsg}
          placeholder="Type a message..."
          autoFocus
          value={msg}
          onChange={handleChange}
        />
        <FaMicrophone className={styles.icon} />
      </div>
    </form>
  );

  return (
    <div className={styles.main}>
      <ChatHeader styles={styles} />
      <MessageArea styles={styles} />
      <MessageForm styles={styles} />
    </div>
  );
};

export default ChatDashboard;
