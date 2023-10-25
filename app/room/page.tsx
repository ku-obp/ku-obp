"use client";

import "@livekit/components-styles";
import {
  LiveKitRoom,
  ParticipantLoop,
  ParticipantName,
  useParticipants,
} from "@livekit/components-react";
import { useEffect, useState } from "react";
import { ChessRoom } from "@/components/chess-room";

export default function Page() {
  // TODO: get user input for room and name
  const [token, setToken] = useState("");

  useEffect(() => {
    const room = "quickstart-room";
    const name = "quickstart-user" + Math.random().toString();
    (async () => {
      try {
        const resp = await fetch(
          `/api/get-participant-token?room=${room}&username=${name}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  if (token === "") {
    return <div>Getting token...</div>;
  }

  return (
    <LiveKitRoom
      video={false}
      audio={false}
      token={token}
      connectOptions={{ autoSubscribe: false }}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      data-lk-theme="default"
    >
      <ChessRoom />
    </LiveKitRoom>
  );
}
