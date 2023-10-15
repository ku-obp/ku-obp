"use client";

import { ChessBoard } from "./chess-board";
import { ChessPanel } from "./chess-panel";

export const ChessGame = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 min-[420px]:scale-125 min-[520px]:scale-150 sm:scale-175 md:scale-200 lg:scale-200 xl:scale-200 max-h-[90%] max-w-[90%]">
      <ChessBoard />
      <ChessPanel />
    </div>
    // <div className="flex justify-center items-center bg-chessboard-black">
    //
    // </div>
  );
};
