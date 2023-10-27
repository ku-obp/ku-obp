"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

import { makeUpper } from "@/lib/utils";

import "@livekit/components-styles";
import { LiveKitRoom } from "@livekit/components-react";
import { ChessRoom } from "@/components/chess/chess-room";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { convertStatus } from "@/redux/features/chess-slice";

const OnlineRoom = (props: any) => {
  const router = useRouter();
  const params = useParams();
  const gameName = params.gameName;
  const roomId = params.roomId;
  const user = useSession();
  const userEmail = user.data?.user?.email;
  const [token, setToken] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  // userEmail이 없는 상태로 들어가면 상대방이 Disconnected 된다.
  // 구체적인 매커니즘은 모르겠다.
  useEffect(() => {
    if (!userEmail) {
      return;
    }
    const room = `${gameName}:${roomId}`;
    const name = user.data?.user?.name;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail]);

  useEffect(() => {
    if (!userEmail) {
      return;
    }

    (async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/game/${gameName}/room/enter`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gameName, userEmail, roomId }),
          }
        );
        const data = await response.json();

        // console.log(data);
        dispatch(
          convertStatus({ status: data.roomStatus, myColor: data.myColor })
        );
        console.log(data);
        if (data.status === "failed") {
          router.push(`/${gameName}`);
          alert(data.me);
        }
      } catch (error) {
        console.log(error);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail]);

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
};

export default OnlineRoom;
