"use client";

import { ChessBoard } from "./ChessBoard";
import { ChessPanel } from "./ChessPanel";

export const ChessGame = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-chessboard-black">
      <ChessBoard />
      <ChessPanel />
    </div>
  );
};
