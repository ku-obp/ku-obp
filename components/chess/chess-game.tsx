"use client";

import { ChessBoard } from "./chess-board";
import { ChessPanel } from "./chess-panel";

export const ChessGame = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-chessboard-black">
      <ChessBoard />
    </div>
  );
};
