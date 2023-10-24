"use client";

import { AiChessBoard } from "./ai-chess-board";
import { AiChessPanel } from "./ai-chess-panel";

export const AiChessGame = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col justify-center items-center gap-4 w-full">
        <AiChessBoard />
        <AiChessPanel />
      </div>
    </div>
  );
};

//  min-[420px]:scale-125 min-[520px]:scale-150 sm:scale-175 md:scale-200 lg:scale-200 max-h-[90%] max-w-[90%]
