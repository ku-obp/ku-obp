"use client";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@/redux/store";
import { openModal as createRoomOpenModal } from "@/redux/features/create-room-modal-slice";
import { openModal } from "@/redux/features/modal-slice";

import { Button } from "@/components/ui/button";
import { makeUpper } from "@/lib/utils";
import { MobileToggle } from "@/components/mobile-toggle";
import { GameRoomHeader } from "@/components/game-room/game-room-header";

function getGameName(gn: string | string[]) {
  if(typeof gn === "string") {
    return gn
  } else {
    return gn[0]
  }
}

const GameServer = (props: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const gameName = params.gameName;
  const user = useSession();
  const hostEmail = user.data?.user?.email ?? null;

  return (
    <div className="h-full w-full flex flex-col gap-8 justify-center items-center">
      {/* <MobileToggle gameName={gameName} /> */}
      <p className="text-3xl lg:text-5xl font-bold text-rose-600">
        {gameName === "two-worlds"
          ? "두개의 세상 온라인"
          : gameName === "chess"
          ? "체스 온라인"
          : `Welcome to ${makeUpper(props.params.gameName)} Online!`}
      </p>
      <Button
        onClick={() =>
          dispatch(
            createRoomOpenModal({
              type: "createRoom",
              data: { gameName: getGameName(gameName), hostEmail: (hostEmail === null) ? "" : hostEmail},
            })
          )
        }
        variant={"warning"}
        size={"lg"}
      >
        새 게임
      </Button>
    </div>
  );
};

export default GameServer;
