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

import { MonopolyRoom } from "@/components/monopoly/monopoly-room";

const MONOPOLY_MODE_KEYS: {
  [key: string]: string
} = {
  "classic": "Classic",
  "monopol": "Monopol",
  "rundown": "Run-Down",
}


function getMonopolyMode(gn: string) {
  if(gn.match(/monopoly(\-(\w)+)?/g)) {
    const splitGN = gn.split("-")
    if(splitGN.length < 2) {
      return {
        isMonopoly: true,
        modeKey: "Classic"
      }
    }
    else{
      return {
        isMonopoly: true,
        modeKey: MONOPOLY_MODE_KEYS[splitGN[1]]
      }
    }
  } else {
    return {
      isMonopoly: false,
      modeKey: ""
    }
  }
}


const OnlineRoom = (props: any) => {
  const router = useRouter();
  const params = useParams();
  const gameName = params.gameName;
  const roomId = params.roomId;
  const user = useSession();
  const userEmail = user.data?.user?.email;
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("")

  const dispatch = useDispatch<AppDispatch>();

  // userEmail이 없는 상태로 들어가면 상대방이 Disconnected 된다.
  // 구체적인 매커니즘은 모르겠다.
  useEffect(() => {
    if(userEmail === undefined) {
      return
    } else if (userEmail === null) {
      return;
    }
    const room = `${gameName}:${roomId}`;
    const name = user.data?.user?.name;
    
    if(name !== undefined && name !== null) {
      setUsername(name);
    }

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

  if (token === "") {
    return <div>Getting token...</div>;
  }

  return (gameName === "chess") ? (
    
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
  ) : (gameName === "monopoly") ? (
    <LiveKitRoom
      video={false}
      audio={false}
      token={token}
      connectOptions={{ autoSubscribe: false }}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      data-lk-theme="default"
    >
      <MonopolyRoom
        username={username}
      />
    </LiveKitRoom>
  ) : (
    <>
      NOT IMPLEMENTED YET
    </>
  );
};

export default OnlineRoom;
