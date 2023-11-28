import React from "react";
import ChatDashboard from "@/components/ChatDashboard";
import { useRouter } from "next/router";
import PageNotFound from "@/components/PageNotFound";

function RoomId() {
  const router = useRouter();
  const { id } = router.query;

  if (id?.length < 10) {
    return <PageNotFound />;
  } else {
    return (
      <>
        <ChatDashboard roomId={id}/>
      </>
    );
  }
}

export default RoomId;
