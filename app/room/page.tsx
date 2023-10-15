"use client";

import "@livekit/components-styles";
import { LiveKitRoom } from "@livekit/components-react";
import { useEffect, useState } from "react";
import { MyVideoConference } from "@/components/MyVideoConference";

export default function Page() {
  // TODO: get user input for room and name
  const room = "quickstart-room";
  const name = "quickstart-user" + Math.random().toString();
  const [token, setToken] = useState("");

  useEffect(() => {
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
      video={true}
      audio={true}
      token={token}
      connectOptions={{ autoSubscribe: false }}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      data-lk-theme="default"
    >
      <MyVideoConference />
    </LiveKitRoom>
  );
}
