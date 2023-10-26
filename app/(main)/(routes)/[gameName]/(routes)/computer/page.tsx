"use client";

import { AiChessGame } from "@/components/chess/ai-chess-game";
import { GameRoomHeader } from "@/components/game-room/game-room-header";
import { reset } from "@/redux/features/chess-slice";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface gameRoomsProps {
  params: {
    gameName: string;
  };
}

const AiGame = ({ params }: gameRoomsProps) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="header bg-white dark:bg-[#313338]">
        <GameRoomHeader gameName={params.gameName} />
      </div>
      <div className="game bg-white dark:bg-[#313338] flex flex-col flex-grow justify-center items-center">
        {params.gameName === "chess" && <AiChessGame />}
      </div>
    </>
  );
};

export default AiGame;
