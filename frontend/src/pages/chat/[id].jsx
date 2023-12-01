import React, { useEffect, useState } from "react";
import ChatDashboard from "@/components/ChatDashboard";
import { useRouter } from "next/router";
import PageNotFound from "@/components/PageNotFound";
import { useDispatch } from "react-redux";
import { roomProfile } from "@/components/ChatDashboard/Redux/thunk";

function RoomId() {
  const dispatch = useDispatch();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id != undefined) {
      dispatch(roomProfile(id));
    }
  }, [id]);

  if (id?.length < 10) {
    return <PageNotFound />;
  } else {
    return (
      <>
        <ChatDashboard roomId={id} />
      </>
    );
  }
}

export default RoomId;
