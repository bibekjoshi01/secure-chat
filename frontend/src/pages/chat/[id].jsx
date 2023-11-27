import React from "react";
import ChatDashboard from "@/components/ChatDashboard";
import { useRouter } from "next/router";

function RoomId() {
  const router = useRouter();
  const { id } = router.query;
  
  if (id?.length < 10) {
    return null;
  } else {
    return (
      <>
        <ChatDashboard />
      </>
    );
  }
}

export default RoomId;
