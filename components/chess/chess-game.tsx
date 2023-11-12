"use client";

import { ChessSocketProvider } from "../providers/chess-socket-provider";
import { ChessBoard } from "./chess-board";

export const ChessGame = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col justify-center items-center gap-4 w-full">
        <ChessSocketProvider>
          <ChessBoard />
        </ChessSocketProvider>
      </div>
    </div>
  );
};
